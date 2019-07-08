<?php

/**
 * @file
 * Provide an fractionslider style plugin for Views.
 */

/**
 * Implements hook_views_plugin().
 */
function views_fractionslider_views_plugins() {
  return array(
    'style' => array(
      'views_fractionslider' => array(
        'title' => t('Views Fractionslider'),
        'theme' => 'views_view_fractionslider',
        'help' => t('Display a JQuery Fractionslider with the results. The first field will be used as the header and trigger.'),
        'handler' => 'ViewsFractionsliderStylePlugin',
        'uses row plugin' => TRUE,
        'uses row class' => TRUE,
        'uses options' => TRUE,
        'uses fields' => TRUE,
        'type' => 'normal',
      ),
    ),
  );
}
