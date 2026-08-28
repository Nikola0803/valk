<?php
/**
 * Product Tabs (COA + additional-info) CSV-derived import, and the one-off
 * bulk product-creator tools used when a new product batch lands. Split out
 * of the router file itself so the deploy/serving mechanism (uploader +
 * spa-router) stays focused - these are WooCommerce data-entry helpers, not
 * part of "serve the frontend."
 *
 * Logic unchanged from the pre-rewrite valkyrie-router.php.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class VROUTER_Product_Tools {

	public static function init() {
		add_action( 'admin_menu', [ __CLASS__, 'add_menu' ] );
		add_filter( 'woocommerce_rest_prepare_product_object', [ __CLASS__, 'expose_meta' ], 10, 2 );
	}

	public static function add_menu() {
		add_submenu_page(
			'valkyrie-router',
			'Valkyrie Product Tools',
			'Product Tools',
			'manage_options',
			'valkyrie-product-tools',
			[ __CLASS__, 'render' ]
		);
	}

	/**
	 * Expose _valkyrie_coa_images and _valkyrie_additional_info (+ COA PDF
	 * meta) in the WooCommerce REST API response so the React app can read
	 * them.
	 */
	public static function expose_meta( $response, $object ) {
		$id            = $object->get_id();
		$coa           = get_post_meta( $id, '_valkyrie_coa_images', true );
		$info          = get_post_meta( $id, '_valkyrie_additional_info', true );
		$purity_pdf    = get_post_meta( $id, '_valkyrie_coa_purity_pdf', true );
		$endotoxin_pdf = get_post_meta( $id, '_valkyrie_coa_endotoxin_pdf', true );

		$data = $response->get_data();
		$meta = $data['meta_data'] ?? [];

		if ( $coa ) {
			$meta[] = [ 'key' => '_valkyrie_coa_images', 'value' => $coa ];
		}
		if ( $info ) {
			$meta[] = [ 'key' => '_valkyrie_additional_info', 'value' => $info ];
		}
		if ( $purity_pdf ) {
			$meta[] = [ 'key' => '_valkyrie_coa_purity_pdf', 'value' => $purity_pdf ];
		}
		if ( $endotoxin_pdf ) {
			$meta[] = [ 'key' => '_valkyrie_coa_endotoxin_pdf', 'value' => $endotoxin_pdf ];
		}

		$data['meta_data'] = $meta;
		$response->set_data( $data );
		return $response;
	}

	public static function render() {
		$import_results = null;
		if ( isset( $_POST['vrouter_import_tabs'] ) && check_admin_referer( 'vrouter_import_tabs' ) ) {
			$import_results = self::run_tab_import();
		}

		$create_ghrp_igf_results = null;
		if ( isset( $_POST['vrouter_create_ghrp_igf'] ) && check_admin_referer( 'vrouter_create_ghrp_igf' ) ) {
			$create_ghrp_igf_results = self::create_ghrp_igf();
		}

		$create_ss31_cjc_results = null;
		if ( isset( $_POST['vrouter_create_ss31_cjc'] ) && check_admin_referer( 'vrouter_create_ss31_cjc' ) ) {
			$create_ss31_cjc_results = self::create_ss31_cjc();
		}

		$create_glp2_kpv_results = null;
		if ( isset( $_POST['vrouter_create_glp2_kpv'] ) && check_admin_referer( 'vrouter_create_glp2_kpv' ) ) {
			$create_glp2_kpv_results = self::create_glp2_kpv();
		}
		?>
		<div class="wrap">
			<h1>Valkyrie Product Tools</h1>

			<div style="background:#fff;border:1px solid #e0e0e0;padding:24px;max-width:640px;margin:20px 0 0;border-radius:4px;">
				<h2 style="margin-top:0;">Product Tabs — CSV Import</h2>
				<p style="font-size:13px;color:#555;margin:0 0 16px;">
					Writes COA images and Additional Information into WooCommerce product meta for all products.
					Run this once after first install, or again any time the CSV data changes.
				</p>

				<?php self::render_results( $import_results ); ?>

				<form method="post">
					<?php wp_nonce_field( 'vrouter_import_tabs' ); ?>
					<input type="hidden" name="vrouter_import_tabs" value="1">
					<button type="submit" class="button button-primary" style="font-size:14px;height:38px;padding:0 20px;">
						▶ Run Product Tabs Import
					</button>
				</form>
			</div>

			<div style="background:#fff;border:1px solid #e0e0e0;padding:24px;max-width:640px;margin:20px 0 0;border-radius:4px;">
				<h2 style="margin-top:0;">🆕 Create New Products <span style="font-size:13px;font-weight:400;color:#888;">(GHRP-6 &amp; IGF-1 LR3)</span></h2>
				<p style="font-size:13px;color:#555;margin:0 0 16px;">Creates GHRP-6 (10mg, $60) and IGF-1 LR3 (1mg, $95), skipping any that already exist by slug. Copy the returned product IDs into <code>get_tab_data()</code> afterward.</p>
				<?php self::render_results( $create_ghrp_igf_results ); ?>
				<form method="post">
					<?php wp_nonce_field( 'vrouter_create_ghrp_igf' ); ?>
					<input type="hidden" name="vrouter_create_ghrp_igf" value="1">
					<button type="submit" class="button button-primary" style="font-size:14px;height:38px;padding:0 20px;background:#0ea5e9;border-color:#0284c7;">
						🚀 Create GHRP-6 &amp; IGF-1 LR3
					</button>
				</form>
			</div>

			<div style="background:#fff;border:1px solid #e0e0e0;padding:24px;max-width:640px;margin:20px 0 0;border-radius:4px;">
				<h2 style="margin-top:0;">🆕 Create New Products <span style="font-size:13px;font-weight:400;color:#888;">(SS-31 &amp; CJC-1295+Ipamorelin 20MG)</span></h2>
				<p style="font-size:13px;color:#555;margin:0 0 16px;">Creates SS-31 (50mg, $185) and CJC-1295+Ipamorelin (20mg, $150), skipping any that already exist by slug/SKU.</p>
				<?php self::render_results( $create_ss31_cjc_results ); ?>
				<form method="post">
					<?php wp_nonce_field( 'vrouter_create_ss31_cjc' ); ?>
					<input type="hidden" name="vrouter_create_ss31_cjc" value="1">
					<button type="submit" class="button button-primary" style="font-size:14px;height:38px;padding:0 20px;background:#0ea5e9;border-color:#0284c7;">
						🚀 Create SS-31 &amp; CJC-1295+Ipamorelin 20MG
					</button>
				</form>
			</div>

			<div style="background:#fff;border:1px solid #e0e0e0;padding:24px;max-width:640px;margin:20px 0 0;border-radius:4px;">
				<h2 style="margin-top:0;">🆕 Create New Products <span style="font-size:13px;font-weight:400;color:#888;">(GLP-2 (TZ) 10MG &amp; KPV 10MG)</span></h2>
				<p style="font-size:13px;color:#555;margin:0 0 16px;">Creates GLP-2 (TZ) 10mg ($85, size-variant sibling of the 30mg product) and KPV 10mg ($75), skipping any that already exist by slug/SKU.</p>
				<?php self::render_results( $create_glp2_kpv_results ); ?>
				<form method="post">
					<?php wp_nonce_field( 'vrouter_create_glp2_kpv' ); ?>
					<input type="hidden" name="vrouter_create_glp2_kpv" value="1">
					<button type="submit" class="button button-primary" style="font-size:14px;height:38px;padding:0 20px;background:#0ea5e9;border-color:#0284c7;">
						🚀 Create GLP-2 (TZ) 10MG &amp; KPV 10MG
					</button>
				</form>
			</div>
		</div>
		<?php
	}

	private static function render_results( ?array $results ) {
		if ( $results === null ) {
			return;
		}
		?>
		<div style="background:#f0fdf4;border:1px solid #bbf7d0;padding:16px;border-radius:4px;margin-bottom:16px;">
			<p style="font-weight:700;color:#166534;margin:0 0 10px;">Done!</p>
			<?php foreach ( $results as $r ) :
				$color = $r['ok'] ? '#15803d' : '#b45309'; ?>
				<div style="font-family:monospace;font-size:12px;color:<?php echo esc_attr( $color ); ?>;margin-bottom:3px;">
					<?php echo $r['ok'] ? '✅' : '⚠️'; ?> <?php echo esc_html( $r['msg'] ); ?>
				</div>
			<?php endforeach; ?>
		</div>
		<?php
	}

	/**
	 * All products from product_tabs_full_content.csv. Key = WooCommerce
	 * product ID (small integers 0-14 are placeholders for not-yet-created
	 * products - see the bulk creators below).
	 */
	public static function get_tab_data(): array {
		return apply_filters( 'vrouter_product_tab_data', [] );
	}

	/** Run the import - writes _valkyrie_coa_images and _valkyrie_additional_info into WP post meta for each product. */
	public static function run_tab_import(): array {
		$results = [];
		foreach ( self::get_tab_data() as $product_id => $data ) {
			if ( $product_id < 100 ) {
				$results[] = [ 'ok' => false, 'msg' => "Skipped placeholder ID {$product_id} ({$data['name']}) — run Bulk Create first, then update IDs." ];
				continue;
			}
			$post = get_post( $product_id );
			if ( ! $post || $post->post_type !== 'product' ) {
				$results[] = [ 'ok' => false, 'msg' => "ID {$product_id} ({$data['name']}) — not found, skipped." ];
				continue;
			}
			update_post_meta( $product_id, '_valkyrie_coa_images', wp_json_encode( $data['coa'] ) );
			update_post_meta( $product_id, '_valkyrie_additional_info', $data['info'] );
			$n         = count( $data['coa'] );
			$results[] = [ 'ok' => true, 'msg' => "ID {$product_id} ({$data['name']}) — {$n} COA image(s) + additional info saved." ];
		}
		return $results;
	}

	/** Sideload a remote image and set it as the product's featured image. Silently skips if unreachable or already attached. */
	private static function sideload_product_image( int $product_id, string $image_url, string $alt ): void {
		if ( ! $image_url ) {
			return;
		}
		$existing_thumb = get_post_thumbnail_id( $product_id );
		if ( $existing_thumb ) {
			return;
		}

		$tmp = download_url( $image_url );
		if ( is_wp_error( $tmp ) ) {
			return;
		}

		$file_array = [
			'name'     => sanitize_file_name( basename( $image_url ) ),
			'tmp_name' => $tmp,
		];

		$attachment_id = media_handle_sideload( $file_array, $product_id, $alt );
		@unlink( $tmp );

		if ( ! is_wp_error( $attachment_id ) ) {
			set_post_thumbnail( $product_id, $attachment_id );
			update_post_meta( $attachment_id, '_wp_attachment_image_alt', sanitize_text_field( $alt ) );
		}
	}

	/** Shared create-if-missing logic for the bulk product-creator tools below. */
	private static function create_products( array $products ): array {
		if ( ! function_exists( 'wc_get_product' ) ) {
			return [ [ 'ok' => false, 'msg' => 'WooCommerce is not active. Cannot create products.' ] ];
		}

		require_once ABSPATH . 'wp-admin/includes/media.php';
		require_once ABSPATH . 'wp-admin/includes/file.php';
		require_once ABSPATH . 'wp-admin/includes/image.php';

		$results = [];

		foreach ( $products as $slug => $data ) {
			$existing_id = wc_get_product_id_by_sku( $data['sku'] );
			if ( ! $existing_id ) {
				$existing_posts = get_posts( [
					'name'        => $slug,
					'post_type'   => 'product',
					'post_status' => [ 'publish', 'draft', 'pending', 'private' ],
					'numberposts' => 1,
					'fields'      => 'ids',
				] );
				if ( ! empty( $existing_posts ) ) {
					$existing_id = $existing_posts[0];
				}
			}
			if ( $existing_id ) {
				$results[] = [ 'ok' => false, 'msg' => "ID {$existing_id} ({$data['name']}) — already exists, skipped." ];
				continue;
			}

			$product = new WC_Product_Simple();
			$product->set_name( $data['name'] );
			$product->set_slug( $slug );
			$product->set_status( 'publish' );
			$product->set_catalog_visibility( 'visible' );
			$product->set_description( $data['description'] );
			$product->set_short_description( $data['short_description'] );
			$product->set_regular_price( $data['price'] );
			$product->set_price( $data['price'] );
			$product->set_sku( $data['sku'] );
			$product->set_stock_status( 'instock' );
			$product->set_manage_stock( false );
			$product->set_sold_individually( false );

			$cat = get_term_by( 'name', 'Peptides', 'product_cat' );
			if ( $cat ) {
				$product->set_category_ids( [ $cat->term_id ] );
			}

			$product_id = $product->save();

			if ( is_wp_error( $product_id ) || ! $product_id ) {
				$results[] = [ 'ok' => false, 'msg' => "FAILED to create {$data['name']}: " . ( is_wp_error( $product_id ) ? $product_id->get_error_message() : 'unknown error' ) ];
				continue;
			}

			if ( ! empty( $data['coa_purity_pdf'] ) ) {
				update_post_meta( $product_id, '_valkyrie_coa_purity_pdf', $data['coa_purity_pdf'] );
			}
			if ( ! empty( $data['coa_endotoxin_pdf'] ) ) {
				update_post_meta( $product_id, '_valkyrie_coa_endotoxin_pdf', $data['coa_endotoxin_pdf'] );
			}

			if ( ! empty( $data['image_url'] ) ) {
				self::sideload_product_image( $product_id, $data['image_url'], $data['name'] );
			}

			$results[] = [ 'ok' => true, 'msg' => "ID {$product_id} — Created: {$data['name']} (slug: {$slug}) @ \${$data['price']}" ];
		}

		return $results;
	}

	/** Creates GHRP-6 and IGF-1 LR3 as new WooCommerce products. Idempotent - skips any slug that already exists. */
	public static function create_ghrp_igf(): array {
		return self::create_products( apply_filters( 'vrouter_ghrp_igf_products', [] ) );
	}

	/** Creates SS-31 (50mg) and CJC-1295+Ipamorelin (20mg) as new WooCommerce products. Idempotent - skips any slug/SKU that already exists. */
	public static function create_ss31_cjc(): array {
		return self::create_products( apply_filters( 'vrouter_ss31_cjc_products', [] ) );
	}

	/** Creates GLP-2 (TZ) 10MG and KPV 10MG as new WooCommerce products. Idempotent - skips any slug/SKU that already exists. */
	public static function create_glp2_kpv(): array {
		return self::create_products( apply_filters( 'vrouter_glp2_kpv_products', [] ) );
	}
}
