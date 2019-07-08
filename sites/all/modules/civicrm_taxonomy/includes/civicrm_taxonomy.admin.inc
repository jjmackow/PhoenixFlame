<?php

/**
 * @file
 * Administration functions for the CiviCRM Taxonomy module.
 */

/**
 * Form constructor for the settings form.
 *
 * @see civicrm_taxonomy_menu().
 */
function civicrm_taxonomy_settings_form($form, $form_state) {
  $form['civicrm_taxonomy_settings']['#tree'] = TRUE;

  // Add a fieldset to contain a checkbox for each vocabulary.
  $form['civicrm_taxonomy_settings']['vocabularies'] = array(
    '#title' => t('Vocabularies'),
    '#description' => t('Select which vocabularies that should be syncronised with CiviCRM groups.'),
    '#type' => 'fieldset',
    '#tree' => TRUE,
  );

  // Retrieve all vocabularies from the database.
  $vocabularies = taxonomy_get_vocabularies();

  // Get the default values, if any have already been defined.
  $defaults = variable_get('civicrm_taxonomy_settings', array());

  foreach ($vocabularies as $vocabulary) {
    // Add a checkbox.
    $form['civicrm_taxonomy_settings']['vocabularies'][$vocabulary->vid] = array(
      '#title' => check_plain($vocabulary->name),
      '#type' => 'checkbox',
      '#default_value' => isset($defaults['vocabularies'][$vocabulary->vid]) ? $defaults['vocabularies'][$vocabulary->vid] : 0,
    );
  }

  $form['civicrm_taxonomy_settings']['advanced'] = array(
    '#title' => t('Advanced settings'),
    '#type' => 'fieldset',
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );
  $form['civicrm_taxonomy_settings']['advanced']['option_groups'] = array(
    '#title' => t('Create option groups'),
    '#description' => t('Also create option groups and values.'),
    '#type' => 'checkbox',
    '#default_value' => isset($defaults['advanced']['option_groups']) ? $defaults['advanced']['option_groups'] : 0,
  );

  $form['#submit'][] = 'civicrm_taxonomy_settings_form_submit';

  return system_settings_form($form);
}

/**
 * Form submission handler for civicrm_taxonomy_settings_form().
 *
 * @see civicrm_taxonomy_settings_form()
 */
function civicrm_taxonomy_settings_form_submit(&$form, &$form_state) {
  $old_values = variable_get('civicrm_taxonomy_settings');
  $values = $form_state['values']['civicrm_taxonomy_settings'];

  module_load_include('inc', 'civicrm_taxonomy', 'includes/core');

  foreach ($values['vocabularies'] as $vid => $new_value) {
    $old_value = ($old_values) ? $old_values['vocabularies'][$vid] : NULL;

    if (($old_value == 0 || !$old_value) && $new_value == 1) {
      // Vocabulary has been enabled.
      civicrm_taxonomy_enable($vid, $values['advanced']['option_groups']);
    }
    elseif ($old_value == 1 && $new_value == 0) {
      // Vocabulary has been disabled.
      civicrm_taxonomy_disable($vid, $values['advanced']['option_groups']);
      
      if ($values['advanced']['option_groups']) {
        // Delete the option group.
        civicrm_taxonomy_option_group_delete($vid);
      }
    }
  }
}

/**
 * Create or enable a new CiviCRM hierarchy based on a vocabulary.
 * 
 * @param int $vid
 *   The vocabulary ID.
 * 
 * @param int $option_group
 *   Whether option groups need to be created. Defaults to FALSE.
 */
function civicrm_taxonomy_enable($vid, $option_groups = FALSE) {
  module_load_include('inc', 'civicrm_taxonomy', 'includes/core');

  $ctg = civicrm_taxonomy_get($vid);
  $vocabulary = taxonomy_vocabulary_load($vid);
  $name = $vocabulary->name;
  $description = ($vocabulary->description) ? $vocabulary->description : NULL;

  if ($ctg['vid']) {
    $gid = $ctg['gid'];
    civicrm_taxonomy_group_write($name, $description, NULL, $gid);
  }
  else {
    $gid = civicrm_taxonomy_group_write($name, $description, NULL);
    $record = array('vid' => $vid, 'tid' => NULL, 'gid' => $gid->id);
    drupal_write_record('civicrm_taxonomy_groups', $record);
  }

  // For each term in this vocabulary, create a CiviCRM Group if necessary
  civicrm_taxonomy_enable_tree($vid);
  
  // Create an option group, if the setting was selected.
  if ($option_groups) {
    // Create the option group.
    if ($ogid = civicrm_taxonomy_option_group_write($vocabulary)) {
      // Create option values for each existing term.
      if ($terms = taxonomy_get_tree($vocabulary->vid)) {
        foreach ($terms as $term) {
          // Create an option value.
          civicrm_taxonomy_option_value_write($term, $ogid);
        }
      }
    }
  }
}

/**
 * Disable a CiviCRM hierarchy based on a vocabulary.
 */
function civicrm_taxonomy_disable($vid, $option_value = FALSE) {
  // Delete groups.
  $result = db_query("SELECT vid, tid FROM {civicrm_taxonomy_groups} WHERE vid = :vid", array(':vid' => $vid))->fetchAll();
  foreach ($result as $row) {
    civicrm_taxonomy_link_delete($row->vid, $row->tid, TRUE, $option_value);
  }
}

/**
 * Recursive helper function.
 */
function civicrm_taxonomy_enable_tree($vid, $parent = 0) {
  $tree = taxonomy_get_tree($vid, $parent, 1, TRUE);
  $parent_link = civicrm_taxonomy_get($vid, $parent, TRUE);
  $results = array();

  foreach ($tree as $term) {
    civicrm_taxonomy_link_write($term);
    civicrm_taxonomy_enable_tree($vid, $term->tid);
  }
}
