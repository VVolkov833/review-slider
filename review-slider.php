<?php
/**
 * Plugin Name:       Gutenberg Review Slider
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Version:           1.0.0
 * Author:            Vadim Volkov
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       vv
 *
 * @package           vv
 */

add_action( 'init', function() {
	register_block_type( __DIR__ . '/build' );
});

add_action( 'plugins_loaded', function() {
    load_plugin_textdomain( 'vv', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
});

/*
add_action( 'wp_footer', function() {
    error_log( __( 'Items per row', 'vv' ) );
});

add_action( 'admin_notices', function() {
    error_log( '<div class="notice notice-success"><p>' . __( 'Slider Settings', 'vv' ) . '</p></div>' );
});
*/