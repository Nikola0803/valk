<?php
/**
 * Plugin Name: Valkyrie Frontend Router
 * Plugin URI:  https://valkyriepeptides.com
 * Description: Serves the built React/Vite storefront as this site's actual front-end. Run `npm run build`, zip the contents of dist/, upload it under "Valkyrie Frontend" in wp-admin, and flip on "SPA takeover" - toggle the whole frontend on/off without touching files by hand. Rebuilt on the same upload/toggle/router skeleton as the Aera Frontend Loader plugin.
 * Version:     2.0.0
 * Author:      Valkyrie Research LLC
 * Text Domain: valkyrie-router
 * Requires WP: 6.0
 * Requires PHP: 8.0
 */

defined( 'ABSPATH' ) || exit;

define( 'VROUTER_VERSION', '2.0.0' );
define( 'VROUTER_PLUGIN_FILE', __FILE__ );
define( 'VROUTER_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'VROUTER_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'VROUTER_DIST_DIR', VROUTER_PLUGIN_DIR . 'dist/' );
define( 'VROUTER_DIST_URL', VROUTER_PLUGIN_URL . 'dist/' );

function vrouter_require_includes() {
	$includes = [
		'includes/class-uploader.php',
		'includes/class-spa-router.php',
		'includes/class-auth.php',
		'includes/class-product-tools.php',
		// Valkyrie Peptides' own product-tab content, wired in purely via
		// filters exposed by class-product-tools.php - delete this line (and
		// the file it loads) to run the router without that site-specific
		// data. See includes/valkyrie-product-data.php for details.
		'includes/valkyrie-product-data.php',
	];
	foreach ( $includes as $file ) {
		$path = VROUTER_PLUGIN_DIR . $file;
		if ( file_exists( $path ) ) {
			require_once $path;
		}
	}
}
vrouter_require_includes();

function vrouter_init_plugin() {
	VROUTER_Uploader::init();
	VROUTER_SPA_Router::init();
	VROUTER_Auth::init();
	VROUTER_Product_Tools::init();
}
add_action( 'plugins_loaded', 'vrouter_init_plugin', 1 );

function vrouter_activate() {
	if ( ! file_exists( VROUTER_DIST_DIR ) ) {
		wp_mkdir_p( VROUTER_DIST_DIR );
	}
	// Deliberately does NOT enable SPA takeover on activation - stays off
	// until an admin uploads a real build and flips it on, so installing
	// (or updating) this plugin can never immediately break the live site.
	// Also flushes rewrite rules so /wp-json/valkyrie/v1/* resolves.
	flush_rewrite_rules();
}
register_activation_hook( __FILE__, 'vrouter_activate' );

function vrouter_deactivate() {
	flush_rewrite_rules();
}
register_deactivation_hook( __FILE__, 'vrouter_deactivate' );
