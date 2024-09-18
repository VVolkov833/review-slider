<?php
/**
 * Plugin Name:       Block Development Examples - Settings Sidebar 82c525
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       block-development-examples
 *
 * @package           block-development-examples
 */

add_action( 'init', function() {
	register_block_type( __DIR__ . '/build' );
});

add_action( 'plugins_loaded', function() {
    load_plugin_textdomain( 'block-development-examples', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
});

/*
add_action( 'wp_footer', function() {
    error_log( __( 'Items per row', 'block-development-examples' ) );
});

add_action( 'admin_notices', function() {
    error_log( '<div class="notice notice-success"><p>' . __( 'Slider Settings', 'block-development-examples' ) . '</p></div>' );
});
*/