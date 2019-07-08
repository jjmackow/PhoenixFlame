<?php

/**
 * @file
 * skrollr.admin.inc
 *
 * Admin configuration form and submittion handling for Skrollr module 
 * 
 */


function skrollr_admin_form($form, &$form_state) {
  $libraries = libraries_get_libraries();

  if (!isset($libraries['skrollr'])) {
    drupal_set_message(t('The Skrollr library directory is not found'), 'error');
  }

  $heading = '';
  if (isset($libraries['skrollr'])) {
    $heading .= '<div class="messages status">Skrollr libraries directory found</div>';
  }

  $heading .= '<p>Place your skrollr javascript files into a directory named "skrollr" in your sites/all/libraries directory.</p>'; 

  $form['heading'] = array(
    '#type' => 'markup',
    '#markup' => $heading,
  );

  $form['enable_skrollr'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable Skrollr Library'), 
    '#default_value' => variable_get('enable_skrollr', FALSE),
  );

  $form['skrollr_filename'] = array(
    '#type' => 'textfield',
    '#title' => 'Skrollr library filename',
    '#size' => 60,
    '#maxlength' => 60,
    '#description' => 'Enter the filename of the <a href="https://github.com/Prinzhorn/skrollr">skrollr library</a> javascript file',
    '#default_value' => variable_get('skrollr_filename', 'skrollr.min.js'),
  );

  //skrollr stylesheets
  $form['enable_skrollr_stylesheets'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable Skrollr Stylesheets Library'), 
    '#default_value' => variable_get('enable_skrollr_stylesheets', FALSE),
  );

  $form['skrollr_stylesheets_filename'] = array(
    '#type' => 'textfield',
    '#title' => 'Skrollr stylesheets library filename',
    '#size' => 60,
    '#maxlength' => 60,
    '#description' => 'Enter the filename of the <a href="https://github.com/Prinzhorn/skrollr-stylesheets">skrollr stylesheets library</a> javascript file',
    '#default_value' => variable_get('skrollr_stylesheets_filename', 'skrollr.stylesheets.min.js'),
  );

  //skrollr menu
  $form['enable_skrollr_menu'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable Skrollr Menu Library'), 
    '#default_value' => variable_get('enable_skrollr_menu', FALSE),
  );

  $form['skrollr_menu_filename'] = array(
    '#type' => 'textfield',
    '#title' => 'Skrollr menu library filename',
    '#size' => 60,
    '#maxlength' => 60,
    '#description' => 'Enter the filename of the <a href="https://github.com/Prinzhorn/skrollr-menu">skrollr menu library</a> javascript file',
    '#default_value' => variable_get('skrollr_menu_filename', 'skrollr.menu.min.js'),
  );

  //skrollr ie
  $form['enable_skrollr_ie'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable Skrollr IE Library (helps for Internet Explorer 8 and below)'), 
    '#description' => t('skrollr plugin that adds some missing features to IE < 9'),
    '#default_value' => variable_get('enable_skrollr_ie', FALSE),
  );

  $form['skrollr_ie_filename'] = array(
    '#type' => 'textfield',
    '#title' => 'Skrollr IE library filename',
    '#size' => 60,
    '#maxlength' => 60,
    '#description' => 'Enter the filename of the <a href="https://github.com/Prinzhorn/skrollr-ie">skrollr IE library</a> javascript file',
    '#default_value' => variable_get('skrollr_ie_filename', 'skrollr.ie.min.js'),
  );

  $form['options_heading'] = array(
    '#type' => 'markup',
    '#markup' => '<h2>Skrollr init() options</h2>',
  );

  $form['skrollr_smooth_scrolling'] = array(
    '#type' => 'checkbox',
    '#title' => t('smoothScrolling'), 
    '#description' => t('Smooth scrolling smoothens your animations. When you scroll down 50 pixel the animations will transition instead of jumping to the new position.'),
    '#default_value' => variable_get('skrollr_smooth_scrolling', TRUE),
  );

  $form['skrollr_smooth_scrolling_duration'] = array(
    '#type' => 'textfield',
    '#title' => 'smoothScollingDuration',
    '#size' => 10,
    '#maxlength' => 10,
    '#description' => 'The number of milliseconds the animations run after the scroll position changed the last time.',
    '#default_value' => variable_get('skrollr_smooth_scrolling_duration', 200),
  );

  $form['skrollr_scale'] = array(
    '#type' => 'textfield',
    '#title' => 'scale',
    '#size' => 10,
    '#maxlength' => 10,
    '#description' => t('<p>Default is 1. Smaller numbers such as .8 speed up the animation, Larger numbers such as 1.2 slow it down.</p><p>By default skrollr uses the largest key frame and makes document height + viewport height this high, thus the max possible scroll top offset. If your animation runs too fast or too slow, just adjust the scale value.</p><p> scale only affects keyframes in absolute mode.</p><p>When forceHeight is set to false, scale is ignored. scale affects constants as well. scale does only affect key frames in absolute mode, e.g. data-500 but not data-top.</p>'),
    '#default_value' => variable_get('skrollr_scale', 1),
  );

  $form['skrollr_constants'] = array(
    '#type' => 'textarea',
    '#title' => 'constants',
    '#rows' => 10,
    '#columns' => 40,
    '#description' => t('<p>Example:</p><pre>{myconst: 300, myconst2:600}</pre>'),
    '#default_value' => variable_get('skrollr_constants', ''),
  );

  $form['skrollr_force_height'] = array(
    '#type' => 'checkbox',
    '#title' => t('forceHeight'), 
    '#description' => t("<p>true: Make sure the document is high enough that all key frames fit inside.</p><p>Example: You use data-1000, but the content only makes the document 500px high. skrollr will ensure that you can scroll down the whole 1000px.</p><p>Or if you use relative mode, e.g. data-top-bottom, skrollr will make sure the bottom of the element can actually reach the top of the viewport.</p><p>false: Don't manipulate the document and just keep the natural scrollbar.</p>"),
    '#default_value' => variable_get('skrollr_force_height', TRUE),
  );

  $form['skrollr_mobile_check'] = array(
    '#type' => 'textarea',
    '#title' => 'mobileCheck',
    '#rows' => 10,
    '#columns' => 40,
    '#description' => t('<p>Example:</p><pre>function() {
return (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera);
}</pre>'),
    '#default_value' => variable_get('skrollr_mobile_check', ''),
  );

  $form['skrollr_mobile_deceleration'] = array(
    '#type' => 'textfield',
    '#title' => 'mobileDeceleration',
    '#size' => 10,
    '#maxlength' => 10,
    '#description' => t('The amount of deceleration for momentum scrolling on mobile devices. This options tells skrollr how fast or slow you want the scrolling to stop after the user lifted his finger.<br/>Set it to 1 to disable momentum scrolling.'),
    '#default_value' => variable_get('mobile_deceleration', .004),
  );

  $empty = array();
  $form['skrollr_edge_strategy'] = array(
    '#type' => 'select',
    '#title' => t('edgeStrategy'),
    '#description' => "<p>This option specifies how to handle animations when the scroll position is outside the range on the keyframes (i.e. before the first or after the last keyframe).</p><p>One of three options are possible</p><p>set (default): When before/after the first/last keyframe, apply the styles of the first/last keyframe to the element.</p><p>ease: Same as set, but the values will be transformed using the given easing function.</p><p>reset: When before/after the first/last keyframe, apply the styles which the element had before skrollr did anything. This means resetting the class attribute as well as removing all styles which have been applied to the style property. This means the element won't have any skrollable-* CSS classes.</p>",
    '#options' => array('set' => 'set',
                        'ease' => 'ease',
                        'reset' => 'reset', 
                        ),
    '#default_value' => variable_get('skrollr_edge_strategy', 'set'),
  );

  $form['skrollr_edge_strategy_ease_function'] = array(
    '#type' => 'textarea',
    '#title' => 'skrollr_edge_strategy_ease_function', 
    '#rows' => 10,
    '#columns' => 40,
    '#description' => t('<p>Example:</p><pre>function(p) {
return 0.5;
}</pre>'),
    '#default_value' => variable_get('skrollr_edge_strategy_ease_function', ''),
  );

  $form['skrollr_before_render'] = array(
    '#type' => 'textarea',
    '#title' => 'beforerender',
    '#rows' => 10,
    '#columns' => 40,
    '#description' => t("<p>A listener function getting called each time right before we render everything. The function will be passed an object with the following properties:</p><pre>
{
    curTop: 10, //the current scroll top offset
    lastTop: 0, //the top value of last time
    maxTop: 100, //the max value you can scroll to. curTop/maxTop will give you the current progress.
    direction: 'down' //either up or down
}</pre><p>Returning false will prevent rendering.</p>"),
    '#default_value' => variable_get('skrollr_before_render', ''),
   );

  $form['skrollr_render'] = array(
    '#type' => 'textarea',
    '#title' => 'render',
    '#rows' => 10,
    '#columns' => 40,
    '#description' => t('<p>A listener function getting called right after we finished rendering everything. The function will be passed the same parameters as beforerender.</p><p>Example:</p><pre>
function(data) {
  //Log the current scroll position.
  console.log(data.curTop);
}</pre>'),
    '#default_value' => variable_get('skrollr_render', ''),
  );

  $form['skrollr_easing'] = array(
    '#type' => 'textarea',
    '#title' => 'easing',
    '#rows' => 10,
    '#columns' => 40,
    '#description' => t('<p>Example:</p><pre>
sin: function(p) {
return (Math.sin(p * Math.PI * 2 - Math.PI/2) + 1) / 2;
},
cos: function(p) {
return (Math.cos(p * Math.PI * 2 - Math.PI/2) + 1) / 2;
}</pre>'),
    '#default_value' => variable_get('skrollr_easing', ''),
  );

  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save settings'),
  );
  return $form;

} //end skrollr_admin_form


function skrollr_admin_form_submit($form, &$form_state) {

  variable_set('enable_skrollr', $form_state['values']['enable_skrollr']);
  variable_set('skrollr_filename', $form_state['values']['skrollr_filename']);
  variable_set('enable_skrollr_stylesheets', $form_state['values']['enable_skrollr_stylesheets']);
  variable_set('skrollr_stylesheets_filename', $form_state['values']['skrollr_stylesheets_filename']);
  variable_set('enable_skrollr_menu', $form_state['values']['enable_skrollr_menu']);
  variable_set('skrollr_menu_filename', $form_state['values']['skrollr_menu_filename']);
  variable_set('enable_skrollr_ie', $form_state['values']['enable_skrollr_ie']);
  variable_set('skrollr_ie_filename', $form_state['values']['skrollr_ie_filename']);
  variable_set('skrollr_smooth_scrolling', $form_state['values']['skrollr_smooth_scrolling']);
  variable_set('skrollr_smooth_scrolling_duration', $form_state['values']['skrollr_smooth_scrolling_duration']);
  variable_set('skrollr_scale', $form_state['values']['skrollr_scale']);
  variable_set('skrollr_constants', $form_state['values']['skrollr_constants']);
  variable_set('skrollr_force_height', $form_state['values']['skrollr_force_height']);
  variable_set('skrollr_mobile_check', $form_state['values']['skrollr_mobile_check']);
  variable_set('skrollr_mobile_deceleration', $form_state['values']['skrollr_mobile_deceleration']);
  variable_set('skrollr_edge_strategy', $form_state['values']['skrollr_edge_strategy']);
  variable_set('skrollr_edge_strategy_ease_function', $form_state['values']['skrollr_edge_strategy_ease_function']);
  variable_set('skrollr_easing', $form_state['values']['skrollr_easing']);
  variable_set('skrollr_render', $form_state['values']['skrollr_render']);
  variable_set('skrollr_before_render', $form_state['values']['skrollr_before_render']);
  drupal_set_message(t('The Skrollr settings have been saved.'));
} //end skrollr_admin_form_submit

