<?php
/**
 * Auth REST API - /wp-json/valkyrie/v1/register|login|validate
 *
 * Simple HMAC-signed token auth for the headless React storefront (not
 * WordPress cookie auth - the SPA can't rely on cookies across the API
 * boundary the same way a theme would). Tokens are signed with the site's
 * own AUTH_KEY, so no secret needs managing separately from wp-config.php.
 *
 * Logic unchanged from the pre-rewrite valkyrie-router.php - only moved
 * into its own file as part of splitting the plugin into aera-style
 * includes/ modules.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class VROUTER_Auth {

	public static function init() {
		// Registered on rest_api_init (fires during WP's init hook, after
		// plugins_loaded). Explicit priority 10 so it fires after WC
		// registers its own routes.
		add_action( 'rest_api_init', [ __CLASS__, 'register_routes' ], 10 );
	}

	public static function register_routes() {
		register_rest_route( 'valkyrie/v1', '/register', [
			'methods'             => 'POST',
			'callback'            => [ __CLASS__, 'register' ],
			'permission_callback' => '__return_true',
			'args'                => [
				'email'    => [ 'required' => true, 'type' => 'string', 'sanitize_callback' => 'sanitize_email' ],
				'password' => [ 'required' => true, 'type' => 'string' ],
				'username' => [ 'required' => false, 'type' => 'string', 'sanitize_callback' => 'sanitize_user' ],
			],
		] );

		register_rest_route( 'valkyrie/v1', '/login', [
			'methods'             => 'POST',
			'callback'            => [ __CLASS__, 'login' ],
			'permission_callback' => '__return_true',
			'args'                => [
				'email'    => [ 'required' => true, 'type' => 'string', 'sanitize_callback' => 'sanitize_email' ],
				'password' => [ 'required' => true, 'type' => 'string' ],
			],
		] );

		register_rest_route( 'valkyrie/v1', '/validate', [
			'methods'             => 'POST',
			'callback'            => [ __CLASS__, 'validate' ],
			'permission_callback' => '__return_true',
			'args'                => [
				'token' => [ 'required' => true, 'type' => 'string' ],
			],
		] );
	}

	/** Generate a signed token for a given user ID. Format: base64(user_id.'|'.expires).'.'.hmac */
	public static function make_token( int $user_id ): string {
		$expires = time() + ( 30 * DAY_IN_SECONDS ); // 30-day token
		$payload = base64_encode( $user_id . '|' . $expires );
		$secret  = defined( 'AUTH_KEY' ) ? AUTH_KEY : wp_salt( 'auth' );
		$sig     = hash_hmac( 'sha256', $payload, $secret );
		return $payload . '.' . $sig;
	}

	/** Verify a token. Returns user_id on success, 0 on failure. */
	public static function verify_token( string $token ): int {
		$parts = explode( '.', $token, 2 );
		if ( count( $parts ) !== 2 ) {
			return 0;
		}

		[ $payload, $sig ] = $parts;
		$secret   = defined( 'AUTH_KEY' ) ? AUTH_KEY : wp_salt( 'auth' );
		$expected = hash_hmac( 'sha256', $payload, $secret );

		if ( ! hash_equals( $expected, $sig ) ) {
			return 0;
		}

		$decoded = base64_decode( $payload );
		[ $user_id, $expires ] = explode( '|', $decoded, 2 );

		if ( time() > (int) $expires ) {
			return 0;
		}

		return (int) $user_id;
	}

	public static function register( WP_REST_Request $req ): WP_REST_Response {
		$email    = $req->get_param( 'email' );
		$password = $req->get_param( 'password' );
		$username = $req->get_param( 'username' ) ?: sanitize_user( strstr( $email, '@', true ) );

		if ( ! is_email( $email ) ) {
			return new WP_REST_Response( [ 'error' => 'Invalid email address.' ], 400 );
		}
		if ( strlen( $password ) < 8 ) {
			return new WP_REST_Response( [ 'error' => 'Password must be at least 8 characters.' ], 400 );
		}
		if ( email_exists( $email ) ) {
			return new WP_REST_Response( [ 'error' => 'An account with that email already exists.' ], 409 );
		}

		// Make username unique if taken
		$base = $username;
		$i    = 1;
		while ( username_exists( $username ) ) {
			$username = $base . $i++;
		}

		$user_id = wp_create_user( $username, $password, $email );

		if ( is_wp_error( $user_id ) ) {
			return new WP_REST_Response( [ 'error' => $user_id->get_error_message() ], 500 );
		}

		$user = new WP_User( $user_id );
		$user->set_role( 'subscriber' );

		$token = self::make_token( $user_id );

		return new WP_REST_Response( [
			'token'    => $token,
			'user_id'  => $user_id,
			'email'    => $email,
			'username' => $username,
			'message'  => 'Account created successfully.',
		], 201 );
	}

	public static function login( WP_REST_Request $req ): WP_REST_Response {
		$email    = $req->get_param( 'email' );
		$password = $req->get_param( 'password' );

		// Accept login by email - find the username first
		$user = get_user_by( 'email', $email );

		if ( ! $user ) {
			return new WP_REST_Response( [ 'error' => 'No account found with that email.' ], 401 );
		}

		$result = wp_authenticate( $user->user_login, $password );

		if ( is_wp_error( $result ) ) {
			return new WP_REST_Response( [ 'error' => 'Incorrect password.' ], 401 );
		}

		$token = self::make_token( $result->ID );

		return new WP_REST_Response( [
			'token'    => $token,
			'user_id'  => $result->ID,
			'email'    => $result->user_email,
			'username' => $result->user_login,
			'message'  => 'Login successful.',
		], 200 );
	}

	public static function validate( WP_REST_Request $req ): WP_REST_Response {
		$token   = $req->get_param( 'token' );
		$user_id = self::verify_token( $token );

		if ( ! $user_id ) {
			return new WP_REST_Response( [ 'valid' => false ], 401 );
		}

		$user = get_userdata( $user_id );
		if ( ! $user ) {
			return new WP_REST_Response( [ 'valid' => false ], 401 );
		}

		return new WP_REST_Response( [
			'valid'    => true,
			'user_id'  => $user_id,
			'email'    => $user->user_email,
			'username' => $user->user_login,
		], 200 );
	}
}
