<?php

/**
 * @file
 * RSS XSL theme implementations.
 */

/**
 * Theme function rss_xsl_xsl returns a completed XSL stylesheet.
 */
function theme_rss_xsl_xsl($variables) {
  $output = array(
    'header' => array(
      '#theme' => 'rss_xsl_xsl_header',
    ),
    'body' => array(
      '#markup' => $variables['html'],
    ),
    'footer' => array(
      '#theme' => 'rss_xsl_xsl_footer',
    ),
  );
  return drupal_render($output);
}
