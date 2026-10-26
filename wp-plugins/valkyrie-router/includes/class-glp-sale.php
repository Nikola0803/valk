<?php
/**
 * Admin on/off switch + schedule + discount override for the React app's
 * GLP sale (GLP-1/2/3 + Cagrilinitide line - see src/lib/sale.ts in the
 * frontend repo). The sale's start/end dates and discount percent are
 * baked into the frontend build by default (GLP_SALE_START/END/
 * GLP_SALE_DISCOUNT_PERCENT), which means changing any of them needs a
 * full rebuild + redeploy. This stores a runtime override as WP options
 * and exposes it over a public, read-only REST route the frontend fetches
 * on load - so the whole sale (on/off, when it starts/ends, and the
 * percent) can be managed from wp-admin with no rebuild needed.
 *
 * Modes:
 *   auto - respect the start/end date fields below (falls back to the
 *          frontend's own GLP_SALE_START/GLP_SALE_END if those are left
 *          blank)
 *   on   - force the sale live regardless of any dates
 *   off  - force the sale hidden regardless of any dates
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class VROUTER_Glp_Sale {

	const OPTION_MODE    = 'vrouter_glp_sale_mode';
	const OPTION_PERCENT = 'vrouter_glp_sale_percent';
	const OPTION_START   = 'vrouter_glp_sale_start';
	const OPTION_END     = 'vrouter_glp_sale_end';

	public static function init() {
		add_action( 'admin_menu', [ __CLASS__, 'add_menu' ] );
		add_action( 'admin_post_vrouter_save_glp_sale', [ __CLASS__, 'handle_save' ] );
		add_action( 'rest_api_init', [ __CLASS__, 'register_routes' ] );
	}

	public static function add_menu() {
		add_submenu_page(
			'valkyrie-router',
			'GLP Sale',
			'GLP Sale',
			'manage_options',
			'valkyrie-glp-sale',
			[ __CLASS__, 'render' ]
		);
	}

	private static function get_mode() {
		$mode = get_option( self::OPTION_MODE, 'auto' );
		return in_array( $mode, [ 'auto', 'on', 'off' ], true ) ? $mode : 'auto';
	}

	private static function get_percent() {
		$percent = (int) get_option( self::OPTION_PERCENT, 35 );
		return ( $percent > 0 && $percent <= 100 ) ? $percent : 35;
	}

	/** Stored as "YYYY-MM-DDTHH:MM" (datetime-local's own format, treated as UTC) or '' if unset. */
	private static function get_start() {
		return (string) get_option( self::OPTION_START, '' );
	}

	private static function get_end() {
		return (string) get_option( self::OPTION_END, '' );
	}

	private static function sanitize_datetime( $raw ) {
		$raw = sanitize_text_field( wp_unslash( $raw ) );
		// Expect exactly what <input type="datetime-local"> sends: YYYY-MM-DDTHH:MM
		if ( $raw === '' || preg_match( '/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/', $raw ) ) {
			return $raw;
		}
		return '';
	}

	public static function render() {
		$mode    = self::get_mode();
		$percent = self::get_percent();
		$start   = self::get_start();
		$end     = self::get_end();
		?>
		<div class="wrap">
			<h1>GLP Sale</h1>
			<p class="description">Controls the GLP-1/2/3 + Cagrilinitide sale banner/countdown/discount
				on the storefront - no rebuild or redeploy needed for anything on this page.</p>

			<?php if ( isset( $_GET['saved'] ) ) : ?>
				<div class="notice notice-success is-dismissible"><p>Saved. The storefront picks this up the next time a page loads (no cache to clear).</p></div>
			<?php endif; ?>

			<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
				<input type="hidden" name="action" value="vrouter_save_glp_sale" />
				<?php wp_nonce_field( 'vrouter_save_glp_sale' ); ?>

				<table class="form-table">
					<tr>
						<th scope="row">Sale status</th>
						<td>
							<label><input type="radio" name="mode" value="auto" <?php checked( $mode, 'auto' ); ?> /> Auto (follow the start/end dates below)</label><br/>
							<label><input type="radio" name="mode" value="on" <?php checked( $mode, 'on' ); ?> /> Force ON (always show the sale, ignores the dates)</label><br/>
							<label><input type="radio" name="mode" value="off" <?php checked( $mode, 'off' ); ?> /> Force OFF (always hide the sale, ignores the dates)</label>
						</td>
					</tr>
					<tr>
						<th scope="row">Starts</th>
						<td>
							<input type="datetime-local" name="start" value="<?php echo esc_attr( $start ); ?>" />
							<p class="description">When "Auto" is selected, the countdown shows "Starts in" before this time and switches to the live sale once it passes. Leave blank to use the date built into the frontend code instead. <strong>Time is UTC</strong> - e.g. for midnight Mountain Time (MDT, UTC-6), enter 06:00.</p>
						</td>
					</tr>
					<tr>
						<th scope="row">Ends</th>
						<td>
							<input type="datetime-local" name="end" value="<?php echo esc_attr( $end ); ?>" />
							<p class="description">When "Auto" is selected, the sale (and its "Ends in" countdown) disappears once this time passes. Leave blank to use the date built into the frontend code instead. <strong>Time is UTC.</strong></p>
						</td>
					</tr>
					<tr>
						<th scope="row">Discount percent</th>
						<td>
							<input type="number" name="percent" min="1" max="100" value="<?php echo esc_attr( $percent ); ?>" style="width:80px;" />%
							<p class="description">Auto-applied off each GLP/Cagrilinitide product's regular price while the sale is showing - no need to set a WooCommerce sale price per product.</p>
						</td>
					</tr>
				</table>
				<?php submit_button( 'Save' ); ?>
			</form>
		</div>
		<?php
	}

	public static function handle_save() {
		if ( ! current_user_can( 'manage_options' ) || ! check_admin_referer( 'vrouter_save_glp_sale' ) ) {
			wp_die( 'Not allowed.' );
		}

		$mode = isset( $_POST['mode'] ) ? sanitize_key( wp_unslash( $_POST['mode'] ) ) : 'auto';
		$mode = in_array( $mode, [ 'auto', 'on', 'off' ], true ) ? $mode : 'auto';

		$percent = isset( $_POST['percent'] ) ? (int) $_POST['percent'] : 35;
		$percent = max( 1, min( 100, $percent ) );

		$start = isset( $_POST['start'] ) ? self::sanitize_datetime( $_POST['start'] ) : '';
		$end   = isset( $_POST['end'] ) ? self::sanitize_datetime( $_POST['end'] ) : '';

		update_option( self::OPTION_MODE, $mode );
		update_option( self::OPTION_PERCENT, $percent );
		update_option( self::OPTION_START, $start );
		update_option( self::OPTION_END, $end );

		wp_safe_redirect( add_query_arg( [ 'page' => 'valkyrie-glp-sale', 'saved' => '1' ], admin_url( 'admin.php' ) ) );
		exit;
	}

	public static function register_routes() {
		register_rest_route( 'valkyrie/v1', '/glp-sale', [
			'methods'             => 'GET',
			'callback'            => [ __CLASS__, 'get_config' ],
			'permission_callback' => '__return_true',
		] );
	}

	public static function get_config() {
		$start = self::get_start();
		$end   = self::get_end();
		return [
			'mode'    => self::get_mode(),
			'percent' => self::get_percent(),
			// ISO 8601 UTC, or null when left blank (frontend falls back to its own built-in date).
			'start'   => $start !== '' ? $start . ':00Z' : null,
			'end'     => $end !== '' ? $end . ':00Z' : null,
		];
	}

	/**
	 * Authoritative "is the sale live right now" check, used by the coupon-
	 * lock/alt-payment-lock enforcement below - NOT the same as the
	 * frontend's isGlpSaleLive(), which also falls back to the
	 * GLP_SALE_START/END dates baked into the React build when "auto" has no
	 * dates set here. This server-side check has no access to those
	 * frontend-only constants, so "auto" with blank dates is treated as NOT
	 * active for enforcement purposes - set explicit Start/End dates on the
	 * GLP Sale admin page (or Force ON) for the server-side lock to engage.
	 */
	public static function is_active(): bool {
		$mode = self::get_mode();
		if ( $mode === 'on' ) {
			return true;
		}
		if ( $mode === 'off' ) {
			return false;
		}
		$start = self::get_start();
		$end   = self::get_end();
		if ( $start === '' || $end === '' ) {
			return false;
		}
		$now        = time();
		$start_time = strtotime( $start . ':00Z' );
		$end_time   = strtotime( $end . ':00Z' );
		return $start_time !== false && $end_time !== false && $now >= $start_time && $now < $end_time;
	}

	const SLUG_PREFIXES = [ 'glp-1', 'glp-2', 'glp-3', 'cagril' ];

	/** Mirrors isGlpSaleSlug() in src/lib/sale.ts - GLP-1/2/3 + Cagrilinitide, any dose/size. */
	public static function product_qualifies( ?WC_Product $product ): bool {
		if ( ! $product ) {
			return false;
		}
		$slug = strtolower( (string) get_post_field( 'post_name', $product->get_id() ) );
		foreach ( self::SLUG_PREFIXES as $prefix ) {
			if ( str_starts_with( $slug, $prefix ) ) {
				return true;
			}
		}
		return false;
	}
}
