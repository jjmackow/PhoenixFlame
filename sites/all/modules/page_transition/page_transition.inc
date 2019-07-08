<?php
/**
 * @file
 * Page Transition inc.
 */

/**
 * Passing php values to Drupal js.
 */
function page_transition_load_js() {
  $result = db_select('page_transition', 'p')
    ->fields('p', array('machine_name', 'settings'))
    ->condition('status', 1, '=')
    ->execute();
  while($record = $result->fetchAssoc()) {
    $machine_name = $record['machine_name'];
    $settings = unserialize($record['settings']);
    $transitions[] = $settings;
  }
  if(isset($transitions)) {
    drupal_add_js(array(
      'page_transition' => filter_xss(json_encode($transitions, JSON_NUMERIC_CHECK), array('img')),
      ), 'setting'
    );
  }
}
