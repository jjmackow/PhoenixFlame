<?php

/**
 * @file
 * Implement Wysiwyg module hooks.
 */

/**
 * Implements hook_wysiwyg_module_plugin().
 */
function amazon_wysiwyg_amazon_wysiwyg_plugin() {
  if (!path_is_admin(current_path())) {
    return;
  }

  $form = array();

  // Modify the form.
  $form['#prefix'] = '<div class="amazon-wysiwyg-popup">' . '<h2>Amazon Wysiwyg</h2>';
  $form['#suffix'] = '</div>';
  $form['asin'] = array(
    '#type' => 'textfield',
    '#name' => 'asin',
    '#title' => 'ASIN',
    '#size' => 13,
    '#weight' => 97,
    '#description' => t('Then Amazon ASIN code.'),
  );

  // Populate locale data.
  $amazon_data = amazon_data_cache();
  $locales = $amazon_data['locales'];
  $countries = array();
  foreach ($locales as $locale => $item) {
    if (variable_get('amazon_locale_'. $locale .'_associate_id', '')) {
      $countries[$locale] = $item['name'];
    }
  }
  $form['locale'] = array(
    '#type' => 'select',
    '#name' => 'locale',
    '#title' => 'Country',
    '#weight' => 98,
    '#options' => $countries,
    '#value' => variable_get('amazon_default_locale', 'US'),
    '#description' => t('Select the country code.'),
  );

  $form['style'] = array(
    '#type' => 'select',
    '#name' => 'style',
    '#title' => 'Style',
    '#weight' => 99,
    '#options' => array(),
    '#value' => variable_get('amazon_wysiwyg_default_style', 'buy_now_wide'),
    '#description' => t('How to display the widget.'),
  );
  // Populate options from theme registry.
  foreach (array_keys(theme_get_registry()) as $item) {
    preg_match('/^amazon_item__(.*)/', $item, $matches);
    if (isset($matches[1])) {
      $style = $matches[1];
      $style_name = ucfirst(str_replace('_', ' ', $style));
      $form['style']['#options'][$style] = $style_name;
    }
  }
  array_multisort($form['style']['#options']);

  $form['actions'] = array('#weight' => 100);

  $form['actions']['preview'] = array(
    '#type' => 'button',
    '#value' => t('Preview'),
    '#name' => 'preview',
    '#attributes' => array(
      'class' => array('preview'),
      'onclick' => 'return (false);',
    ),
    '#weight' => 100,
  );

  $form['actions']['widget-preview'] = array(
    '#markup' => '<div class="amazon-widget-preview"></div>',
    '#weight' => 110,
  );

  $form['actions']['insert'] = array(
    '#type' => 'button',
    '#value' => t('Insert'),
    '#name' => 'insert',
    '#attributes' => array(
      'class' => array('insert'),
      'onclick' => 'return (false);',
    ),
    '#prefix' => '<div class="action">',
    '#weight' => 120,
  );
  $form['actions']['cancel'] = array(
    '#type' => 'button',
    '#value' => t('Cancel'),
    '#name' => 'cancel',
    '#attributes' => array(
      'class' => array('cancel'),
      'onclick' => 'return (false);',
    ),
    '#suffix' => '</div>',
    '#weight' => 130,
  );

  $markup = drupal_render($form);

  $plugins['amazon_wysiwyg'] = array(
    'title' => t('Amazon Wysiwyg'),
    'vendor url' => 'http://drupal.org/project/amazon_wysiwyg',
    'icon title' => t('Amazon widget'),
    'css path' => drupal_get_path('module', 'amazon_wysiwyg'),
    'css file' => 'amazon_wysiwyg.css',
    'settings' => array(
      'form_markup' => $markup,
      'default_locale' => variable_get('amazon_default_locale', 'US'),
      'icon_markup' => '<img class="amazon-wysiwyg-img" title="Amazon Widget" ' .
        'src="/' . drupal_get_path('module', 'amazon_wysiwyg') .
        '/plugins/amazon_wysiwyg/images/amazon_wysiwyg.png' . '" ' .
        'alt="" title="Amazon Widget" />',
      'placeholder_markup' => array(
        'prefix' => '<!--amazon-widget',
        'suffix' => '-->',
      ),
    ),
  );

  return $plugins;
}
