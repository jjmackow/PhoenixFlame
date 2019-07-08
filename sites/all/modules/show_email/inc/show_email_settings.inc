<?php

/**
 * @file
 * Basically show the user's registered email address.
 */

/**
 * Return form of the settings.
 */
function show_email_settings() {
  $form['show_email_settings'] = array(
    '#type' => 'vertical_tabs',
  );

  $form['show_email_settings_status'] = array(
    '#type' => 'fieldset',
    '#title' => t('Status'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
    '#group' => 'show_email_settings',
  );

  $form['show_email_settings_status']['show_email_enabled'] = array(
    '#title' => t('Enabled'),
    '#type' => 'checkbox',
    '#default_value' => variable_get('show_email_enabled', 1),
    '#required' => FALSE,
    '#description' => t('If enabled the email address will show in the user page profile'),
  );

  $form['show_email_settings_option'] = array(
    '#type' => 'fieldset',
    '#title' => t('Options'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
    '#group' => 'show_email_settings',
  );

  $form['show_email_settings_option']['show_email_weight'] = array(
    '#title' => t('Weight'),
    '#type' => 'textfield',
    '#default_value' => variable_get('show_email_weight', 1),
    '#required' => FALSE,
    '#description' => t('Please use number in order to display the field weight'),
  );

  $label_option = array(
    'inline' => t('Inline'),
    'above' => t('Above'),
    'hidden' => t('Hidden'),
  );

  $form['show_email_settings_option']['show_email_label_display'] = array(
    '#title' => t('Label Display'),
    '#type' => 'select',
    '#options' => $label_option,
    '#default_value' => variable_get('show_email_label_display', 'inline'),
    '#required' => FALSE,
    '#description' => t('Please use number in order to display the field weight'),
  );

  return system_settings_form($form);

}
