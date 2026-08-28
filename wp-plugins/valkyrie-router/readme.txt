=== Valkyrie Frontend Router ===
Contributors: valkyrieresearch
Requires at least: 6.0
Requires PHP: 8.0
Version: 2.0.0
License: GPLv2 or later

Serves the built React/Vite storefront as this WordPress site's actual
front-end - no separate hosting, no iframe, same domain. Toggle it on or
off from wp-admin without touching files by hand.

== Description ==

This plugin's one job is to take a `npm run build` output from the
Valkyrie React app and serve it at this site's root domain, so
`https://yoursite.com/shop`, `/products/bpc-157-10mg`, etc. all render the
real app instead of a 404 or a separate WordPress theme page.

It's rebuilt on the same upload/toggle/router skeleton as the Aera
Frontend Loader plugin - a zip-upload admin page, a real static-file
router, and an explicit on/off "SPA takeover" switch - so deploying a new
build (or turning the whole frontend off to fall back to WordPress) never
requires FTP/cPanel file access again.

It's deliberately separate from the CMS/forms/product-order/auth plugins
that provide the actual data and endpoints behind the storefront - this
plugin only cares about *serving the built frontend* (plus the handful of
Valkyrie-specific pieces that only make sense living next to the router:
the legacy `/product/:slug` redirect, GA4/GTM head injection, the
`/wp-json/valkyrie/v1` auth endpoints, and the COA/product-tab admin
tools). Use it with or without those other plugins.

== How it works ==

1. Run `npm run build` in the React app.
2. Zip the *contents* of the resulting `dist/` folder (not the folder
   itself - `index.html` must be at the root of the zip) and upload it
   under **Valkyrie Frontend** in the admin sidebar.
3. The plugin extracts it into its own `dist/` folder. No path rewriting
   happens - a stock `npm run build` output (default Vite base "/")
   already references everything as root-absolute paths, and the router
   serves any real file in `dist/` directly at that same path, so it just
   works with zero special Vite configuration.
4. Flip on "SPA takeover." From then on, every front-end request that
   isn't `/wp-admin`, `/wp-json` (REST API - WooCommerce + Valkyrie
   endpoints), `/wp-login.php`, `/wp-register.php`, `/wp-cron.php`,
   `/xmlrpc.php`, `/wp-content`, `/wp-includes`, `/feed`, a sitemap,
   `/robots.txt`, or `?wc-ajax=` is answered with the app's `index.html`
   (GA4/GTM tags injected server-side), and React Router takes it from
   there.

Takeover is off by default and stays off until you explicitly turn it on
- installing or updating this plugin can never immediately break an
existing site.

**Important:** always run a fresh `npm run build` immediately before
zipping and uploading. Re-uploading an old/stale `dist/` folder will
silently serve outdated content - there's no way for the plugin to detect
that the zip you're uploading is stale.

== Legacy URL redirect ==

`/product/:slug` (the pre-headless WordPress permalink shape) 301-redirects
to `/products/:slug`, preserving any query string. This runs regardless of
whether SPA takeover is on, so old inbound links/bookmarks keep working
even while the router is temporarily off.

== Reserved paths ==

If you need WordPress to keep serving something else at the root (e.g. a
`/blog` handled by a different system), add it via the
`vrouter_reserved_prefixes` filter:

    add_filter('vrouter_reserved_prefixes', function ($prefixes) {
        $prefixes[] = '/legacy-blog';
        return $prefixes;
    });

== Analytics / verification tags ==

Set these in wp-config.php - no rebuild required to change them:

    define('VROUTER_GA4_ID', 'G-XXXXXXXXXX');
    define('VROUTER_GTM_ID', 'GTM-XXXXXXX');
    define('VROUTER_SITE_VERIFICATION', '...');

== Auth endpoints ==

`/wp-json/valkyrie/v1/register`, `/login`, `/validate` - simple HMAC-signed
token auth for the headless SPA, signed with the site's own `AUTH_KEY`.
Unchanged from the pre-rewrite version of this plugin.

== Product tools ==

**Valkyrie Frontend → Product Tools** carries the COA/tab-content CSV
import and the one-off bulk product-creator tools (GHRP-6/IGF-1 LR3,
SS-31/CJC-1295+Ipamorelin, GLP-2 (TZ)/KPV). The tools themselves
(`class-product-tools.php`) are generic - the actual Valkyrie product data
lives in `includes/valkyrie-product-data.php`, wired in purely through the
`vrouter_product_tab_data` / `vrouter_ghrp_igf_products` /
`vrouter_ss31_cjc_products` / `vrouter_glp2_kpv_products` filters. Delete
that one file (and its require line in `valkyrie-router.php`) to run the
router on a different product catalog without carrying Valkyrie's data
along.

== Updating the build ==

Re-upload a new zip any time - it replaces the old build immediately with
no need to toggle takeover off and back on.

== Where this plugin came from ==

Rebuilt from the original `valkyrie-router.php` (v1.1.0, which required
manually FTPing `dist/` files into the plugin's `app/` folder) onto the
same upload/toggle/router skeleton as the Aera Frontend Loader plugin, so
deploys work the same way across both: `npm run build`, zip, upload,
toggle.
