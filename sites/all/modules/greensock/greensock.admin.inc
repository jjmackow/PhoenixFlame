<?php

/**
 * @file
 * Administration forms for the GreenSock API module.
 */

/**
 * Form constructor for GreenSock API settings form.
 */
function greensock_settings($form, &$form_state) {
  $library = libraries_detect('greensock');
  if ($library['installed']) {
    $form['greensock_js'] = array(
      '#type' => 'radios',
      '#title' => t('Greensock JS Library'),
      '#description' => t('Choose the GreenSock JS Libraries to load, the minified version is recommended for production site.'),
      '#default_value' => variable_get('greensock_js', 'minified'),
      '#options' => array(
        'minified' => t('Minified'),
        'uncompressed' => t('Uncompressed'),
      ),
    );
    $form['greensock_js_core'] = array(
      '#type' => 'fieldset',
      '#title' => t('GreenSock JS Core Files'),
      '#description' => t('Select the GreenSock JS Core files to load.'),
      '#collapsible' => TRUE,
      '#tree' => TRUE,
    );
    $files_path = $library['library path'] . '/' . $library['path'] . '/uncompressed';
    $gsap_core = array();
    $files = file_scan_directory($files_path, '/\.js$/', array('recurse' => FALSE, 'key' => 'name'));
    foreach ($files as $object) {
      $gsap_core[] = $object->name;
    }
    $default_values = variable_get('greensock_js_core');
    $form['greensock_js_core']['files'] = array(
      '#title' => t('GreenSock JS Core files'),
      '#type' => 'checkboxes',
      '#description' => t('Select the GreenSock JS Core files to load.'),
      '#options' => drupal_map_assoc($gsap_core),
      '#default_value' => (!empty($default_values)) ? $default_values['files'] : '',
    );

    return system_settings_form($form);
  }
  else {
    drupal_set_message($library['error message'], 'error');
  }
}