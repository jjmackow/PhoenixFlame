<?php
/**
 * @file
 * The primary PHP file for this theme.
 */
function kevsosassy_bugfix_custom_theme(){
    if('system/ajax' === current_path()){
       if(isset($_POST['ajax_page_state']['theme'])){
           $themes = list_themes();
           if(isset($themes[$_POST['ajax_page_state']['theme']]) && !empty($themes[$_POST['ajax_page_state']['theme']]->status)){
               return $_POST['ajax_page_state']['theme'];
           }
       }
    }
    return variable_get('theme_default', 'bartik');    
}

function kevsosassy_theme() {
  $items = array();
	
  $items['user_login'] = array(
    'render element' => 'form',
    'path' => drupal_get_path('theme', 'kevsosassy') . '/templates',
    'template' => 'user-login',
    'preprocess functions' => array(
       'kevsosassy_preprocess_user_login'
    ),
  );
  $items['user_register_form'] = array(
    'render element' => 'form',
    'path' => drupal_get_path('theme', 'kevsosassy') . '/templates',
    'template' => 'user-register-form',
    'preprocess functions' => array(
      'kevsosassy_preprocess_user_register_form'
    ),
  );
  $items['user_pass'] = array(
    'render element' => 'form',
    'path' => drupal_get_path('theme', 'kevsosassy') . '/templates',
    'template' => 'user-pass',
    'preprocess functions' => array(
      'kevsosassy_preprocess_user_pass'
    ),
  );
  return $items;
}

function kevsosassy_preprocess_user_login(&$vars) {
  $vars['intro_text'] = t('Please provide the follow:');
}

function kevsosassy_preprocess_user_register_form(&$vars) {
  $vars['intro_text'] = t('This is my super awesome reg form');
}

function kevsosassy_preprocess_user_pass(&$vars) {
  $vars['intro_text'] = t('This is my super awesome request new password form');
}
function kevsosassy_form_required_marker($variables) {
  // This is also used in the installer, pre-database setup.
  $t = get_t();
  $attributes = array(
    'class' => 'form-required',
    'title' => $t('This field is required.'),
  );
  return '<span' . drupal_attributes($attributes) . '></span>';
  }