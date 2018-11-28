<?php
/*
Plugin Name: JMA Dynamic Block Type test
Description: Establish structure and process for dynamic block types
Version: 1.0
Author: John Antonacci
License:
https://wisdomplugin.com/build-gutenberg-block-plugin/
*/

function jmadblock_enqueue_block_editor_assets()
{
    // Scripts.
    wp_enqueue_script(
        'jmadblock-block', // Handle.
        plugin_dir_url(__FILE__) . 'block/block.js', // File.
        array( 'wp-blocks', 'wp-i18n', 'wp-element' ), // Dependencies.
        filemtime(plugin_dir_path(__FILE__) . 'block/block.js') // filemtime — Gets file modification time.
    );

    // Styles.
    wp_enqueue_style(
        'jmadblock-block-editor', // Handle.
        plugin_dir_url(__FILE__) . 'assets/css/editor.css', // File.
        array( 'wp-edit-blocks' ), // Dependency.
        filemtime(plugin_dir_path(__FILE__) . 'assets/css/editor.css') // filemtime — Gets file modification time.
    );
}
add_action('enqueue_block_editor_assets', 'jmadblock_enqueue_block_editor_assets');

/**
 * Enqueue the block's assets for the frontend.
 *
 * @since 1.0.0
 */
function jmadblock_enqueue_block_assets()
{
    wp_enqueue_style(
        'jmadblock-frontend', // Handle.
        plugin_dir_url(__FILE__) . 'assets/css/style.css', // File.
        array( 'wp-blocks' ), // Dependency.
        filemtime(plugin_dir_path(__FILE__) . 'assets/css/style.css') // filemtime — Gets file modification time.
    );
}
add_action('enqueue_block_assets', 'jmadblock_enqueue_block_assets');
