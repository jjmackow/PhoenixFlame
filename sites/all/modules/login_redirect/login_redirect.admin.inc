<?php

/**
 * @file
 * Administration Settings page.
 */

/**
 * Generates a configuration form.
 */
function login_redirect_settings_form() {
  $form['login_redirect_parameter_name'] = array(
    '#type' => 'textfield',
    '#title' => t('Parameter Name'),
    '#default_value' => variable_get('login_redirect_parameter_name', 'destination'),
    '#description' => t('Enter user defined query parameter name same as we have q in drupal core. For example if the parameter name is set to "destination", then you would visit user/login?destination=(redirect destination).'),
    '#required' => true,
    '#element_validate' => array('element_validate_non_numeric')
  );

  return system_settings_form($form);
}

/**
 * Validate parameter name.
 */
function element_validate_non_numeric($element, &$form_state) {
  $value = $element['#value'];
  if (!ctype_alpha($value)) {
    form_error($element, t('The parameter name must consists of only alphabetical letters.'));
  }
}
