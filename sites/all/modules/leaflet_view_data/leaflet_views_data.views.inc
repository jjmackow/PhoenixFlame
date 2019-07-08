<?php

/**
 * @file
 * Leaflet maps data views integration.
 */

/**
 * Define leaflet views style.
 *
 * Implements hook_views_plugins().
 */
function leaflet_views_data_views_plugins() {
  $plugins = array(
    'module' => 'leaflet_views_data',

    'display' => array(
      'leaflet_data' => array(
        'title' => t('Leaflet Data Overlay'),
        'help' => t('Data layer for Leaflet maps.'),
        'handler' => 'leaflet_views_data_plugin_display_leaflet_data',
        'path' => drupal_get_path('module', 'leaflet_views_data'),
        'uses hook menu' => FALSE,
        'use ajax' => FALSE,
        'use pager' => FALSE,
        'accept attachments' => FALSE,
        'admin' => t('Leaflet Data Overlay'),
      ),
    ),

    'style' => array(
      'leaflet_data' => array(
        'title' => t('Leaflet Data Overlay'),
        'help' => t('Displays a View as a Leaflet Data overlay.'),
        'path' => drupal_get_path('module', 'leaflet_views_data'),
        'handler' => 'leaflet_views_data_plugin_style',
        'theme' => 'leaflet-map',
        'uses fields' => TRUE,
        'uses row plugin' => TRUE,
        'uses options' => TRUE,
        'uses grouping' => FALSE,
        'type' => 'leaflet',
        'even empty' => TRUE,
      ),
    ),
  );

  return $plugins;
}

