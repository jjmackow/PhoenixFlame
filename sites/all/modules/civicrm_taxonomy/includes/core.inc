<?php

/**
 * @file
 * Core functionality for the CiviCRM Taxonomy Groups module.
 */

/**
 *
 */
function civicrm_taxonomy_get($vid, $tid = NULL, $reset = FALSE) {
  static $index = array();

  if (isset($index[$vid][$tid]) && !$reset) {
    return $index[$vid][$tid];
  }

  $query = db_select('civicrm_taxonomy_groups', 'ctg');
  $query->fields('ctg', array('vid', 'tid', 'gid'))
    ->condition('ctg.vid', $vid)
    ->condition('ctg.tid', $tid);

  $row = $query->execute()->fetchAssoc();

  $index[$vid][$tid] = $row;

  return $row;
}

/**
 * Create or update a CiviCRM Taxonomy group.
 *
 * @param string $name
 *   The name of the group.
 *
 * @param string description
 *   The description of the group.
 *
 * @param int $parent_id
 *
 * @param int $group_id
 *
 * @return
 *   Returns the new/updated group ID.
 *
 * @see civicrm_taxonomy_link_write()
 */
function civicrm_taxonomy_group_write($name, $description, $parent_id = NULL, $group_id = NULL) {
  if (!civicrm_initialize()) return;

  module_load_include('php', 'civicrm', '/../api/v2/Group');

  $settings = variable_get('civicrm_taxonomy_settings', array());

  // TODO: Check if the group name doesn't already exist.

  $description = strip_tags($description);
  $description = trim($description);

  $params = array(
    'name' => $name,
    'title' => $name,
    'description' => $description,
    'is_active' => 1,
    'visibility' => 'Public Pages',
    'group_type' => array('2' => 1),
  );
  if ($group_id) {
    $params['id'] = $group_id;
  }
  if ($parent_id) {
    $params['parents'] = $parent_id;
  }

  $result = &civicrm_group_add($params);

  if (civicrm_error($result)) {
    drupal_set_message($result['error_message'], 'error');
  }
  else {
    return $result['result'];
  }
}

/**
 * Deletes a CiviCRM Taxonomy group. Wrapper for the CiviCRM API.
 *
 * @param int $group_id
 *   The ID of the group.
 *
 * @return
 *   Returns TRUE if successful. If not, returns an error from CiviCRM.
 */
function civicrm_taxonomy_group_delete($group_id) {
  if (!civicrm_initialize()) {
    return;
  }

  require_once(drupal_get_path('module', 'civicrm') . '/../api/v2/Group.php');

  $params = array('id' => $group_id);
  $result = &civicrm_group_delete($params);

  if (civicrm_error($result)) {
    drupal_set_message($result['error_message'], 'error');
  }
  else {
    return TRUE;
  }
}

/**
 * Create or update a CiviCRM Taxonomy group.
 *
 * @param object $term
 *   A taxonomy term object.
 * 
 * @param int $option_value
 *   Whether an option value needs to be created. Defaults to FALSE.
 *
 * @see civicrm_taxonomy_term_insert()
 */
function civicrm_taxonomy_link_write($term, $option_value = FALSE) {
  if (is_array($term)) {
    $term = (object) $term;
  }
  $link = civicrm_taxonomy_get($term->vid, $term->tid);
  $gid = NULL;
  if ($link['gid']) {
    $gid = $link['gid'];
  }

  $parent = isset($term->parents) ? array_pop($term->parents) : NULL;
  $parent_link = civicrm_taxonomy_get($term->vid, $parent);
  $pid = $parent_link['gid'];

  $description = (isset($term->description)) ? $term->description : NULL;
  $group = civicrm_taxonomy_group_write($term->name, $description, $pid, $gid);

  if (!$group) {
    drupal_set_message('There was an error; A CiviCRM Group could not be created for '. $term->name .'.', 'error');
    return FALSE;
  }

  if (!isset($link['gid'])) {
    $record = array('tid' => $term->tid, 'vid' => $term->vid, 'gid' => $group->id);
    drupal_write_record('civicrm_taxonomy_groups', $record);
  }
  
  if ($option_value) {
    if ($ovid = civicrm_taxonomy_get_ovid($term->tid)) {
      // Update the existing value.
      civicrm_taxonomy_option_value_write($term, NULL, $ovid);
    }
    else {
      // Create the option value.
      civicrm_taxonomy_option_value_write($term);
    }
  }

  return TRUE;
}

/**
 * Remove a CiviCRM Taxonomy group.
 *
 * @param int $vid
 *   A taxonomy vocabulary ID.
 *
 * @param int $tid
 *   A taxonomy term ID.
 *
 * @param bool $purge_group
 *   Whether the entire group should be removed.
 * 
 * @param bool $option_value
 *   Whether we should try to remove an option value.
 */
function civicrm_taxonomy_link_delete($vid, $tid, $purge_group = FALSE, $option_value = FALSE) {
  $settings = variable_get('civicrm_taxonomy_settings', array());
  $link = civicrm_taxonomy_get($vid, $tid);

  if ($purge_group) {
    // Delete the group.
    civicrm_taxonomy_group_delete($link['gid']);
  }

  // Delete the record from the civicrm_taxonomy_groups table.
  db_query("DELETE FROM {civicrm_taxonomy_groups} WHERE vid = :vid AND tid = :tid", array(':vid' => $vid, ':tid' => $tid));
  
  if ($option_value) {
    // Delete any option values.
    if ($ovid = civicrm_taxonomy_get_ovid($tid)) {
      civicrm_taxonomy_option_value_delete($ovid, $tid);
    }
  }
}

/**
 * Find the option group ID for a taxonomy vocabulary.
 * 
 * @param int $vid
 *   The vocabulary ID.
 * 
 * @return int|bool
 *   Returns the option group ID, if found, otherwise returns FALSE.
 * 
 * @see civicrm_taxonomy_disable()
 */
function civicrm_taxonomy_get_ogid($vid) {
  $result = db_query("SELECT ogid FROM {civicrm_taxonomy_option_groups} WHERE vid = :vid", array(':vid' => $vid))->fetchField();
  return $result ? $result : NULL;
}

/**
 * Find the option value ID for a taxonomy term.
 * 
 * @param int $tid
 *   The vocabulary ID.
 * 
 * @return int|bool
 *   Returns the option value ID, if found, otherwise returns FALSE.
 * 
 * @see civicrm_taxonomy_get_ovids()
 * @see civicrm_taxonomy_disable()
 */
function civicrm_taxonomy_get_ovid($tid) {
  $result = db_query("SELECT ovid FROM {civicrm_taxonomy_option_values} WHERE tid = :tid", array(':tid' => $tid))->fetchField();
  return $result ? $result : NULL;
}

/**
 * Find the option value ID for a taxonomy term.
 * 
 * @param array $tids
 *   An array of tids.
 * 
 * @return array|bool
 * 
 * @see civicrm_taxonomy_disable()
 */
function civicrm_taxonomy_get_ovids($tids = array()) {
  $result = array();
  foreach ($tids as $tid) {
    if ($ovid = civicrm_taxonomy_get_ovid($tid)) {
      // Add the ovid into the result array.
      $result[] = $ovid;
    }
  }
  
  // Either return the result array or NULL.
  return !empty($result) ? $result : NULL;
}   

/**
 * Create an option group.
 * 
 * @param object $vocabulary
 *   The taxonomy vocabulary object.
 * 
 * @see civicrm_taxonomy_enable()
 */
function civicrm_taxonomy_option_group_write($vocabulary) {
  // Create an empty option group and store the data in the
  // civicrm_taxonomy_option_groups table.
  if (!civicrm_initialize()) return;
  
  $name = $vocabulary->name;
  $description = ($vocabulary->description) ? $vocabulary->description : NULL;
  
  // Include the required CiviCRM files.
  module_load_include('php', 'civicrm', '/../api/v3/utils');
  module_load_include('php', 'civicrm', '/../api/v3/OptionGroup');

  // Build the params array.
  $params = array(
    'version' => 3,
    'name' => strtolower(str_replace(' ', '_', $name)),
    'title' => $name,
    'description' => $description,
    'is_active' => 1,
  );

  // Create the option group.
  if ($result = civicrm_api3_option_group_create($params)) {
    // Store the value in the civicrm_taxonomy_option_groups table.
    $record = (object) array(
      'vid' => $vocabulary->vid,
      'ogid' => $result['id'],
    );
    drupal_write_record('civicrm_taxonomy_option_groups', $record);
    
    // Return the option group ID.
    return $result['id'];
  }
}

/**
 * Delete a option group.
 * 
 * @param int $vid
 *   A taxonomy vocabulary ID.
 */
function civicrm_taxonomy_option_group_delete($vid) {
  if (!civicrm_initialize()) return;
  
  $name = $vocabulary->name;
  $description = ($vocabulary->description) ? $vocabulary->description : NULL;
  
  // Find the option group ID.
  $ogid = civicrm_taxonomy_get_ogid($vid);
  
  // As there is no API function to delete an option group, load the 
  // OptionGroup.php file directly and use the del method.
  require_once 'CRM/Core/BAO/OptionGroup.php';
  CRM_Core_BAO_OptionGroup::del($ogid);
  
  // Delete the record from the civicrm_taxonomy_option_groups table.
  db_delete('civicrm_taxonomy_option_groups')
    ->condition('vid', $vid)
    ->condition('ogid', $ogid)
    ->execute();
}
    
/**
 * Create/update an option value.
 * 
 * @param object $term
 *   The taxonomy term object.
 * 
 * @param int $ogid (optional)
 *   The option group ID, if known. Defaults to NULL.
 * 
 * @param int $ovid (optional)
 *   The option value ID. Defaults to NULL. Used when updating an existing
 *   option value.
 */
function civicrm_taxonomy_option_value_write($term, $ogid = NULL, $ovid = NULL) {
  // Create an option value.
  if (!civicrm_initialize()) return;
  
  require_once 'api/v3/utils.php';
  require_once 'api/v3/OptionValue.php';
  
  if (!$ogid) {
    $ogid = civicrm_taxonomy_get_ogid($term->vid);
  }
  
  $params = array(
    'version' => 3,
    'option_group_id' => $ogid,
    'label' => $term->name,
    'value' => strtolower(str_replace(' ', '_', $term->name)),
    'name' => strtolower(str_replace(' ', '_', $term->name)),
    'weight' => $term->weight,
    'is_active' => 1,
  );
  
  if ($ovid) {
    $params['id'] = $ovid;
  }
  
  if (!$ovid) {
    if ($result = civicrm_api3_option_value_create($params)) {
      // Write the reference into the civicrm_taxonomy_option_value table.
      $record = array(
        'tid' => $term->tid,
        'vid' => $term->vid,
        'ovid' => $result['id'],
      );      
      drupal_write_record('civicrm_taxonomy_option_values', $record);
    }
  }
}

/**
 * Delete an option value.
 * 
 * @param int $ovid
 *   The option value ID.
 * 
 * @param int $tid
 *   The taxonomy term ID.
 */
function civicrm_taxonomy_option_value_delete($ovid, $tid) {
  if (!civicrm_initialize()) return;
  
  module_load_include('php', 'civicrm', '/../api/v3/utils');
  module_load_include('php', 'civicrm', '/../api/v3/OptionValue');
  
  $params = array(
    'version' => 3,
    'id' => $ovid,
  );
  
  // Delete the option value.
  if ($result = civicrm_api3_option_value_delete($params)) {
    // Delete the record from the civicrm_taxonomy_option_values table.
    db_delete('civicrm_taxonomy_option_values')
      ->condition('ovid', $ovid)
      ->condition('tid', $tid)
      ->execute();
  }
}
  