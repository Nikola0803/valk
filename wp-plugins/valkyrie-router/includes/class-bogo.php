<?php
/**
 * "Buy 2 Get 1 Free" promo (Peptides category, same-product x3 only) -
 * admin-controlled from wp-admin (Valkyrie Frontend -> BOGO Sale), not a
 * code deploy. Every complete group of 3 units of the SAME qualifying
 * product in an order makes 1 of those 3 free - qty 3 = 1 free, qty 6 = 2
 * free, qty 4 or 5 = still only 1 free (partial groups don't qualify).
 *
 * This is the authoritative, server-side enforcement - independent of
 * anything the client sends or displays. See src/lib/bogo.ts in the
 * frontend repo for the client-side estimate/display side.
 *
 * Only covers the manual-payment order-creation path (POST /wc/v3/orders -
 * see OrderPage.tsx), the only order-creation path this plugin controls.
 * Card payments go through a separate plugin (valkyrie-payments-plugin-
 * main) not in this repo.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class VROUTER_Bogo {

	const OPTION_ENABLED = 'vrouter_bogo_enabled';
	const OPTION_START   = 'vrouter_bogo_start';
	const OPTION_END     = 'vrouter_bogo_end';
	const CATEGORY       = 'Peptides';
	const GROUP_SIZE     = 3; // buy 2, 3rd is free
	const FEE_LABEL      = 'Buy 2 Get 1 Free';

	public static function init() {
		add_action( 'admin_menu', [ __CLASS__, 'add_menu' ] );
		add_action( 'admin_post_vrouter_save_bogo', [ __CLASS__, 'handle_save' ] );
		add_action( 'rest_api_init', [ __CLASS__, 'register_routes' ] );
		add_action( 'woocommerce_rest_insert_shop_order_object', [ __CLASS__, 'apply_order_discount' ], 10, 3 );
	}

	public static function add_menu() {
		add_submenu_page(
			'valkyrie-router',
			'BOGO Sale',
			'BOGO Sale',
			'manage_options',
			'valkyrie-bogo-sale',
			[ __CLASS__, 'render' ]
		);
	}

	private static function get_enabled() {
		return (bool) get_option( self::OPTION_ENABLED, false );
	}

	private static function get_start() {
		return (string) get_option( self::OPTION_START, '' );
	}

	private static function get_end() {
		return (string) get_option( self::OPTION_END, '' );
	}

	private static function sanitize_datetime( $raw ) {
		$raw = sanitize_text_field( wp_unslash( $raw ) );
		if ( $raw === '' || preg_match( '/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/', $raw ) ) {
			return $raw;
		}
		return '';
	}

	/** Requires enabled AND both a start and end date set, same as GLP Sale's own "auto" dates. */
	public static function is_active(): bool {
		if ( ! self::get_enabled() ) {
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

	public static function render() {
		$enabled = self::get_enabled();
		$start   = self::get_start();
		$end     = self::get_end();
		?>
		<div class="wrap">
			<h1>BOGO Sale</h1>
			<p class="description">"Buy 2 Get 1 Free" for every <?php echo esc_html( self::CATEGORY ); ?> product -
				every complete group of 3 units of the same product makes 1 of them free. Runs independently of
				the GLP Sale - no rebuild or redeploy needed for anything on this page.</p>

			<?php if ( isset( $_GET['saved'] ) ) : ?>
				<div class="notice notice-success is-dismissible"><p>Saved. The storefront picks this up the next time a page loads (no cache to clear).</p></div>
			<?php endif; ?>

			<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
				<input type="hidden" name="action" value="vrouter_save_bogo" />
				<?php wp_nonce_field( 'vrouter_save_bogo' ); ?>

				<table class="form-table">
					<tr>
						<th scope="row">Enabled</th>
						<td>
							<label><input type="checkbox" name="enabled" value="1" <?php checked( $enabled ); ?> /> Promo is on</label>
							<p class="description">Must also have both a Starts and Ends date set below to actually go live.</p>
						</td>
					</tr>
					<tr>
						<th scope="row">Starts</th>
						<td>
							<input type="datetime-local" name="start" value="<?php echo esc_attr( $start ); ?>" />
							<p class="description"><strong>Time is UTC</strong> - e.g. for midnight Mountain Time (MDT, UTC-6), enter 06:00.</p>
						</td>
					</tr>
					<tr>
						<th scope="row">Ends</th>
						<td>
							<input type="datetime-local" name="end" value="<?php echo esc_attr( $end ); ?>" />
							<p class="description"><strong>Time is UTC.</strong></p>
						</td>
					</tr>
				</table>
				<?php submit_button( 'Save' ); ?>
			</form>
		</div>
		<?php
	}

	public static function handle_save() {
		if ( ! current_user_can( 'manage_options' ) || ! check_admin_referer( 'vrouter_save_bogo' ) ) {
			wp_die( 'Not allowed.' );
		}

		$enabled = ! empty( $_POST['enabled'] );
		$start   = isset( $_POST['start'] ) ? self::sanitize_datetime( $_POST['start'] ) : '';
		$end     = isset( $_POST['end'] ) ? self::sanitize_datetime( $_POST['end'] ) : '';

		update_option( self::OPTION_ENABLED, $enabled );
		update_option( self::OPTION_START, $start );
		update_option( self::OPTION_END, $end );

		wp_safe_redirect( add_query_arg( [ 'page' => 'valkyrie-bogo-sale', 'saved' => '1' ], admin_url( 'admin.php' ) ) );
		exit;
	}

	public static function register_routes() {
		register_rest_route( 'valkyrie/v1', '/bogo', [
			'methods'             => 'GET',
			'callback'            => [ __CLASS__, 'get_config' ],
			'permission_callback' => '__return_true',
		] );
	}

	public static function get_config() {
		$start = self::get_start();
		$end   = self::get_end();
		return [
			'enabled' => self::get_enabled(),
			'start'   => $start !== '' ? $start . ':00Z' : null,
			'end'     => $end !== '' ? $end . ':00Z' : null,
			'active'  => self::is_active(),
		];
	}

	/** True if $product belongs to the promo's qualifying category. */
	public static function product_qualifies( ?WC_Product $product ): bool {
		if ( ! $product ) {
			return false;
		}
		return has_term( self::CATEGORY, 'product_cat', $product->get_id() );
	}

	/** Raw BOGO free-unit discount this order currently qualifies for (0 if none). */
	public static function calc_order_discount( WC_Order $order ): float {
		$total_discount = 0.0;
		foreach ( $order->get_items( 'line_item' ) as $item ) {
			$product = $item->get_product();
			if ( ! self::product_qualifies( $product ) ) {
				continue;
			}
			$free_units = intdiv( (int) $item->get_quantity(), self::GROUP_SIZE );
			if ( $free_units > 0 ) {
				$total_discount += $free_units * (float) $product->get_price();
			}
		}
		return round( $total_discount, 2 );
	}

	public static function apply_order_discount( $order, $request, $creating ) {
		if ( ! $creating || ! $order instanceof WC_Order || ! self::is_active() ) {
			return;
		}

		$total_discount = self::calc_order_discount( $order );
		if ( $total_discount <= 0 ) {
			return;
		}

		$fee = new WC_Order_Item_Fee();
		$fee->set_name( self::FEE_LABEL );
		$amount = -$total_discount;
		$fee->set_amount( $amount );
		$fee->set_total( $amount );
		$fee->set_tax_class( '' );
		$fee->set_tax_status( 'none' );
		$order->add_item( $fee );
		$order->calculate_totals( false );
		$order->save();
	}
}
