<?php
/**
 * Admin on/off switch + discount override for the React app's GLP sale
 * (GLP-1/2/3 + Cagrilinitide line - see src/lib/sale.ts in the frontend
 * repo). The sale is date-driven by default (GLP_SALE_START/END baked into
 * the frontend build at build time), but that means flipping it on or off
 * needs a full rebuild + redeploy. This stores a runtime override as WP
 * options and exposes it over a public, read-only REST route the frontend
 * fetches on load - so the sale can be toggled from wp-admin with no
 * rebuild needed.
 *
 * Modes:
 *   auto - respect the frontend's own GLP_SALE_START/GLP_SALE_END dates (default)
 *   on   - force the sale live regardless of those dates
 *   off  - force the sale hidden regardless of those dates
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class VROUTER_Glp_Sale {

	const OPTION_MODE    = 'vrouter_glp_sale_mode';
	const OPTION_PERCENT = 'vrouter_glp_sale_percent';

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

	public static function render() {
		$mode    = self::get_mode();
		$percent = self::get_percent();
		?>
		<div class="wrap">
			<h1>GLP Sale</h1>
			<p class="description">Controls the GLP-1/2/3 + Cagrilinitide sale banner/countdown/discount
				on the storefront. The sale's scheduled start/end dates live in the frontend code
				(<code>src/lib/sale.ts</code>) and still need a rebuild to change - this page lets you
				override the on/off state and discount percent instantly, with no rebuild or redeploy.</p>

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
							<label><input type="radio" name="mode" value="auto" <?php checked( $mode, 'auto' ); ?> /> Auto (follow the scheduled start/end dates)</label><br/>
							<label><input type="radio" name="mode" value="on" <?php checked( $mode, 'on' ); ?> /> Force ON (always show the sale)</label><br/>
							<label><input type="radio" name="mode" value="off" <?php checked( $mode, 'off' ); ?> /> Force OFF (always hide the sale)</label>
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

		update_option( self::OPTION_MODE, $mode );
		update_option( self::OPTION_PERCENT, $percent );

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
		return [
			'mode'    => self::get_mode(),
			'percent' => self::get_percent(),
		];
	}
}
