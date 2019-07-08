<?php
/**
 * @file
 * Page Transition admin configurations.
 */

/**
 * Page Transition settings.
 */
function page_transition_manage($form, &$form_state) {
  $header = array(
   t('Name'),
   t('Machine Name'),
   t('Settings'),
   t('Enabled'),
   t('Manage'),
  );
  $rows = array();
  $result = db_select('page_transition', 'p')
    ->extend('PagerDefault')
    ->limit(10)
    ->fields('p', array('name', 'machine_name', 'status', 'settings'))
    ->execute();
    while($record = $result->fetchAssoc()) {
       $rows[$record['machine_name']][] = filter_xss($record['name']);
       $rows[$record['machine_name']][] = filter_xss($record['machine_name']);
       $settings = unserialize($record['settings']);
       $rows[$record['machine_name']][] = htmlentities(json_encode($settings));
       $rows[$record['machine_name']][] = ($record['status'] == 1) ? t('Yes') : t('No');
       $rows[$record['machine_name']]['actions'] = l(t('Edit'), 'admin/config/page_transition/manage/edit/' . $record['machine_name']);
       if($record['status'] == 1) {
         $rows[$record['machine_name']]['actions'] .= ' | ' . l(t('Disable'), 'admin/config/page_transition/manage/status/disable/' . $record['machine_name']);
       }
       else {
         $rows[$record['machine_name']]['actions'] .= ' | ' . l(t('Enable'), 'admin/config/page_transition/manage/status/enable/' . $record['machine_name']);
       }
       $rows[$record['machine_name']]['actions'] .= ' | ' . l(t('Delete'), 'admin/config/page_transition/manage/delete/' . $record['machine_name']);
    }
  $attributes = array();
  $form['transitions'] = array(
    '#theme' => 'table',
    '#header' => $header,
    '#rows' => $rows,
    '#empty' => t('No items available'), 
  );
  $form['pager'] = array(
    '#theme' => 'pager'
  );
  return $form;
}

/**
 * Add/Edit Transition callback.
 */
function page_transition_add($form, &$form_state) {
  $tranistion = array();
  $action = t('Save');
  if(arg(4) == 'edit') {
    // Fetch value for edit.
    $machine_name = arg(5);
    $tranistion = db_select('page_transition', 'p')
    ->fields('p')
    ->condition('machine_name', $machine_name,'=')
    ->execute()
    ->fetchAssoc();
    $tranistion['settings'] = unserialize($tranistion['settings']);
    $action = t('Update');
  }
  
  $transitions = array(
    'FADE' => array(
      'fade-in' => t('Fade In'),
      'fade-out' => t('Fade Out'),
    ),
    'FADE UP' => array(
      'fade-in-up-sm' => t('Fade In Up SM'),
      'fade-in-up' => t('Fade In Up'),
      'fade-in-up-lg' => t('Fade In Up LG'),
      'fade-out-up-sm' => t('Fade Out Up SM'),
      'fade-out-up' => t('Fade Out Up'),
      'fade-out-up-lg' => t('Fade Out Up LG'),
    ),
    'FADE DOWN' => array(
      'fade-in-down-sm' => t('Fade In Down SM'),
      'fade-in-down' => t('Fade In Down'),
      'fade-in-down-lg' => t('Fade In Down LG'),
      'fade-out-down-sm' => t('Fade Out Down SM'),
      'fade-out-down' => t('Fade Out Down'),
      'fade-out-down-lg' => t('Fade Out Down LG'),
    ),
    'FADE LEFT' => array(
      'fade-in-left-sm' => t('Fade In Left SM'),
      'fade-in-left' => t('Fade In Left'),
      'fade-in-left-lg' => t('Fade In Left LG'),
      'fade-out-left-sm' => t('Fade Out Left SM'),
      'fade-out-left' => t('Fade Out Left'),
      'fade-out-left-lg' => t('Fade Out Left LG'),
    ),
    'FADE RIGHT' => array(
      'fade-in-right-sm' => t('Fade In Right SM'),
      'fade-in-right' => t('Fade In Right'),
      'fade-in-right-lg' => t('Fade In Right LG'),
      'fade-out-right-sm' => t('Fade Out Right SM'),
      'fade-out-right' => t('Fade Out Right'),
      'fade-out-right-lg' => t('Fade Out Right LG'),
    ),
    'ROTATE' => array(
      'rotate-in-sm' => t('Rotate In SM'),
      'rotate-in' => t('Rotate In'),
      'rotate-in-lg' => t('Rotate In LG'),
      'rotate-out-sm' => t('Rotate Out SM'),
      'rotate-out' => t('Rotate Out'),
      'rotate-out-lg' => t('Rotate Out LG'),
    ),
    'FLIP X' => array(
      'flip-in-x-fr' => t('Flip In X FR'),
      'flip-in-x' => t('Flip In X'),
      'flip-in-x-nr' => t('Flip In X NR'),
      'flip-out-x-fr' => t('Flip Out X FR'),
      'flip-out-x' => t('Flip Out X'),
      'flip-out-x-nr' => t('Flip Out X NR'),
    ),
    'FLIP Y' => array(
      'flip-in-y-fr' => t('Flip In Y FR'),
      'flip-in-y' => t('Flip In Y'),
      'flip-in-y-nr' => t('Flip In Y NR'),
      'flip-out-y-fr' => t('Flip Out Y FR'),
      'flip-out-y' => t('Flip Out Y'),
      'flip-out-y-nr' => t('Flip Out Y NR'),
    ),
    'ZOOM' => array(
      'zoom-in-sm' => t('Zoom In SM'),
      'zoom-in' => t('Zoom In'),
      'zoom-in-lg' => t('Zoom In LG'),
      'zoom-out-sm' => t('Zoom Out SM'),
      'zoom-out' => t('Zoom Out'),
      'zoom-out-lg' => t('Zoom Out LG'),
    ),
    'OVERLAY OPTION' => array(
      'overlay-slide-in-top' => t('Overlay Slide In Top'),
      'overlay-slide-out-top' => t('Overlay Slide Out Top'), 
      'overlay-slide-in-bottom' => t('Overlay Slide In Bottom'),
      'overlay-slide-out-bottom' => t('Overlay Slide Out Bottom'),
      'overlay-slide-in-left' => t('Overlay Slide In Left'),
      'overlay-slide-out-left' => t('Overlay Slide Out Left'),
      'overlay-slide-in-right' => t('Overlay Slide In Right'),
      'overlay-slide-out-right' => t('Overlay Slide Out Right'),
     ),
  );
  $form['name'] = array(
    '#type' => 'textfield',
    '#title' => t('Name'),
    '#default_value' => isset($tranistion['name']) ? $tranistion['name'] : '',
    '#required' => TRUE,
  );
  if(arg(4) == 'edit') {
  $form['machine_name'] = array(
    '#type' => 'hidden',
    '#default_value' => isset($tranistion['machine_name']) ? $tranistion['machine_name'] : '',
  );
  }
  else {
  $form['machine_name'] = array(
    '#type' => 'machine_name',
    '#required' => TRUE,
    '#machine_name' => array(
      'exists' => 'transition_name_exists',
      'source' => array('name'),
      'label' => t('Machine Name'),
      'replace_pattern' => '[^a-z0-9-]+',
      'replace' => '-',
    ),
  );
  }
  $form['transition_element'] = array(
    '#type' => 'textfield',
    '#title' => t('Transition Element'),
    '#description' => 'Page element which you need to add transition.',
    '#default_value' => isset($tranistion['settings']['transition_element']) ? $tranistion['settings']['transition_element'] : '',
    '#required' => TRUE,
  );
  $form['inClass'] = array(
    '#type' => 'select',
    '#title' => t('Transition In'),
    '#options' => $transitions,
    '#default_value' => isset($tranistion['settings']['inClass']) ? $tranistion['settings']['inClass'] : '',
    '#required' => TRUE,
  );
  $form['outClass'] = array(
    '#type' => 'select',
    '#title' => t('Transition Out'),
    '#options' => $transitions,
    '#default_value' => isset($tranistion['settings']['outClass']) ? $tranistion['settings']['outClass'] : '',
    '#required' => TRUE,
  );
  $form['inDuration'] = array(
    '#type' => 'textfield',
    '#title' => t('In Duration'),
    '#default_value' => isset($tranistion['settings']['inDuration']) ? $tranistion['settings']['inDuration'] : 1500,
    '#required' => TRUE,
  );
  $form['outDuration'] = array(
    '#type' => 'textfield',
    '#title' => t('Out Duration'),
    '#default_value' => isset($tranistion['settings']['outDuration']) ? $tranistion['settings']['outDuration'] : 800,
    '#required' => TRUE,
  );
  $form['linkElement'] = array(
    '#type' => 'textfield',
    '#title' => t('Link Element'),
    '#description' => "e.g. linkElement: 'a:not([target='_blank']):not([href^='#'])'",
    '#default_value' => isset($tranistion['settings']['linkElement']) ? $tranistion['settings']['linkElement'] : '',
    '#required' => TRUE,
  );
  $form['loading'] = array(
    '#type' => 'select',
    '#title' => t('Loading'),
    '#options' => array(true => 'TRUE', false => 'FALSE'),
    '#default_value' => isset($tranistion['settings']['loading']) ? $tranistion['settings']['loading'] : '',
    '#required' => TRUE,
  );
  $form['loadingParentElement'] = array(
    '#type' => 'textfield',
    '#title' => t('Loading Parent Element'),
    '#default_value' => isset($tranistion['settings']['loadingParentElement']) ? $tranistion['settings']['loadingParentElement'] : 'body',
    '#required' => TRUE,
  );
  $form['loadingClass'] = array(
    '#type' => 'textfield',
    '#title' => t('Loading Class'),
    '#default_value' => isset($tranistion['settings']['loadingClass']) ? $tranistion['settings']['loadingClass'] : 'animsition-loading',
    '#required' => TRUE,
  );
  $form['page_transition_use_loading_image'] = array(
    '#type' => 'checkbox',
    '#title' => t('Use custom loading animation.'),
    '#default_value' => !empty($tranistion['settings']['loadingInner']),
  );
  $form['loadingInner'] = array(
    '#type' => 'managed_file',
    '#name' => 'author_pane_popup_loading_image',
    '#title' => t('Upload Image'),
    '#description' => t("Here you can upload an image to show while loading page."),
    '#upload_location' => 'public://page_transition',
    '#upload_validators' => array(
      'file_validate_extensions' => array('gif png jpg jpeg'),
    ),
    '#states' => array(
      'visible' => array(
        ':input[name="page_transition_use_loading_image"]' => array('checked' => TRUE),
      ),
      'required' => array(
        ':input[name="page_transition_use_loading_image"]' => array('checked' => TRUE),
      ),
    ),
    '#process' => array('page_transition_use_loading_image_element_process'),
  );
  if (!empty($tranistion['settings']['loadingInner'])) {
    $form['loadingInner']['#field_prefix'] = $tranistion['settings']['loadingInner'];
  }
  
  $form['timeout'] = array(
    '#type' => 'select',
    '#title' => t('Timeout'),
    '#options' => array(1 => 'TRUE', 0 => 'FALSE'),
    '#default_value' => isset($tranistion['settings']['timeout']) ? $tranistion['settings']['timeout'] : 0,
    '#required' => TRUE,
  );
  $form['timeoutCountdown'] = array(
    '#type' => 'textfield',
    '#title' => t('Timeout Countdown'),
    '#default_value' => isset($tranistion['settings']['timeoutCountdown']) ? $tranistion['settings']['timeoutCountdown'] : 5000,
    '#required' => TRUE,
  );
  $form['onLoadEvent'] = array(
    '#type' => 'select',
    '#title' => t('Onload Event'),
    '#options' => array(true => 'TRUE', false => 'FALSE'),
    '#default_value' => isset($tranistion['settings']['onLoadEvent']) ? $tranistion['settings']['onLoadEvent'] : true,
    '#required' => TRUE,
  );
  $form['browser'] = array(
    '#type' => 'hidden',
  );
  $form['overlay'] = array(
    '#type' => 'select',
    '#title' => t('Overlay'),
    '#description' => 'Set as TRUE if you select any transition under OVERLAY OPTION.',
    '#options' => array(1 => 'TRUE', 0 => 'FALSE'),
    '#default_value' => isset($tranistion['settings']['overlay']) ? $tranistion['settings']['overlay'] : 0,
    '#required' => TRUE,
  );
  $form['overlayParentElement'] = array(
    '#type' => 'textfield',
    '#title' => t('Overlay Parent Element'),
    '#default_value' => isset($tranistion['settings']['overlayParentElement']) ? $tranistion['settings']['overlayParentElement'] : 'body',
    '#required' => TRUE,
  );
  $form['loadingInnerDb'] = array(
    '#type' => 'hidden',
    '#value' => !empty($tranistion['settings']['loadingInner']) ? $tranistion['settings']['loadingInner'] : '',
  );
  $form['actions'] = array('#type' => 'actions');
  $form['actions']['submit'] = array(
    '#type' => 'submit',
    '#value' => $action,
  );
  $form['actions']['cancel'] = array(
    '#type' => 'submit',
    '#value' => t('Cancel'),
  );
  return $form;
}

/**
 * Validate Transtion.
 */
function page_transition_add_validate($form, &$form_state) {
   if ($form_state['values']['op'] == 'Cancel') {
     drupal_get_messages('error');  //clears out messages thrown by built in validation
     drupal_goto('admin/config/page_transition/manage');
   }
}
function page_transition_add_submit($form, &$form_state) {
  $transition_values = $form_state['values']; 
  $name = $transition_values['name'];
  $machine_name = $transition_values['machine_name'];
  $transition_values['browser'] = "[ 'animation-duration', '-webkit-animation-duration']";
  $transition_values['overlayClass'] = 'animsition-overlay-slide';
  
  // Upload Image
  $transition_values['loadingInner'] = '';
  if (!empty($form['loadingInner']['#file'])) {
    $form['loadingInner']['#file']->status = FILE_STATUS_PERMANENT;
    file_save($form['loadingInner']['#file']);
    $loadingInner = file_create_url($form['loadingInner']['#file']->uri);
    $loadingInner = array(
      'path' => $form['loadingInner']['#file']->uri,
      'alt' => 'Loading...',
      'title' => 'Loading...',
    );
    $loadingInnerImage = theme('image', $loadingInner);
    $loadingInnerImage = str_replace('"', "'", $loadingInnerImage);
    $transition_values['loadingInner'] = $loadingInnerImage;
  }
  else if($transition_values['page_transition_use_loading_image'] == 1) {
    $transition_values['loadingInner'] = $transition_values['loadingInnerDb'];
  }
  
  //$transition_values['transition'] = 'function(url){ window.location.href = url; }';
  unset($transition_values['name']);
  unset($transition_values['machine_name']);
  unset($transition_values['submit']);
  unset($transition_values['form_build_id']);
  unset($transition_values['form_token']);
  unset($transition_values['page_transition_use_loading_image']);
  unset($transition_values['loadingInnerDb']);
  unset($transition_values['form_id']);
  unset($transition_values['op']);
  unset($transition_values['cancel']);
  if(arg(4) == 'edit') {
    // Update
    db_update('page_transition') // Table name no longer needs {}
      ->fields(array(
        'name' => $name,
        'settings' => serialize($transition_values),
      ))
      ->condition('machine_name', $machine_name, '=')
      ->execute();
    drupal_set_message("Transition has been updated.");
  }
  else {
  // Add New
  db_insert('page_transition')
    ->fields(array(
      'name' => $name,
      'machine_name' => $machine_name,
      'settings' => serialize($transition_values),
    ))->execute();
    drupal_set_message("New transition has been saved.");
  }
  drupal_goto(PAGE_TRANSITION_CONFIG_PAGE_URL . '/manage');
}

/**
 * Callback function to check the transition name exists.
 */
function transition_name_exists($machine_name) {
  $qt_exists = db_query_range('SELECT 1 FROM {page_transition} WHERE machine_name = :name', 0, 1, array(':name' => $machine_name))->fetchField();
  return $qt_exists;
}

/**
 * Delete Transition callback.
 */
function page_transition_delete($form, &$form_state) {
  $form = array();
    $form['machine_name'] = array(
        '#type' => 'value',
        '#value' => arg(5),
    );
    
    return confirm_form(
        $form,
        t('Are you sure you want to delete this item?'),
        PAGE_TRANSITION_CONFIG_PAGE_URL . '/manage',
        t('This action cannot be undone.'),
        t('Delete'),
        t('Cancel')
    );
}

/**
 * Delete Transition submtition callback.
 */
function page_transition_delete_submit($form, &$form_state) {
  if ($form_state['values']['machine_name'] != '') {
    db_delete('page_transition')
      ->condition('machine_name', $form_state['values']['machine_name'])
      ->execute();
  }
  drupal_set_message(t('Page Transition has been deleted.'));
  $form_state['redirect'] = PAGE_TRANSITION_CONFIG_PAGE_URL . '/manage';
}

/**
 * Status update callback.
 */
function page_transition_status_update($action, $machine_name) {
  $status = 0;
  $status_message = t('disabled');
  if($action == 'enable') {
    $status = 1;
    $status_message = t('enabled');
  }
  // Update
  db_update('page_transition')
    ->fields(array(
      'status' => $status,
    ))
    ->condition('machine_name', $machine_name, '=')
    ->execute();
  drupal_set_message(t("Transition has been !status_message.", array('!status_message' => $status_message)));
  drupal_goto(PAGE_TRANSITION_CONFIG_PAGE_URL . '/manage');
}

/**
 * Function to disable default upload and remove button manged_file field.
 */
function page_transition_use_loading_image_element_process($element, &$form_state, $form) {
  $element = file_managed_file_process($element, $form_state, $form);
  $element['upload_button']['#access'] = FALSE;
  $element['remove_button']['#access'] = FALSE;
  return $element;
}