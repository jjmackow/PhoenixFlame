<?php

/**
 * @file
 * RSS XSL hook_views implementations.
 */

/**
 * Implements hook_views_post_render().
 */
function rss_xsl_views_post_render(&$view, &$output, &$cache) {

  // Add XSL entry to any views output from RSS plugin.
  if ('rss' == $view->plugin_name) {
    $output = str_replace(
      '<rss ',
      '<?xml-stylesheet type="text/xsl" href="/rss.xsl" ?>' . "\n" . '<rss ',
      $output
    );

    // Content Type 'application/rss+xml; charset=utf-8' causes XSL stylesheets
    // to be ignored, reducing to text/xml.
    if (!$view->live_preview) {
      drupal_add_http_header('Content-Type', 'text/xml; charset=utf-8');
    }
  }
}
