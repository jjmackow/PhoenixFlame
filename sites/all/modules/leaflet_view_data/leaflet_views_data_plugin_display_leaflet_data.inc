<?php

/**
 * @file
 * Display plugin for Leaflet Data
 */

class leaflet_views_data_plugin_display_leaflet_data extends views_plugin_display {
  function uses_breadcrumb() { return FALSE; }
  function get_style_type() { return 'leaflet'; }

  /**
   * Leaflet data features are used directly in the map object.
   */
  function execute() {
    return $this->view->render();
  }

  function preview() {
    return '<pre>' . check_plain($this->view->render()) . '</pre>';
  }

  function render() {
    return $this->view->style_plugin->render($this->view->result);
  }

  function option_definition() {
    $options = parent::option_definition();
    return $options;
  }

  function options_summary(&$categories, &$options) {
    parent::options_summary($categories, $options);
    unset($options['header']);
    unset($options['footer']);
    unset($options['empty']);
    unset($options['exposed_block']);
    unset($options['analyze-theme']);
  }
}