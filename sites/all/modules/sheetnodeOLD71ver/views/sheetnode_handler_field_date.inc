<?php
/**
 * @file
 * Views handler for sheetnode dates.
 */

class sheetnode_handler_field_date extends views_handler_field {
  function render($values) {
    module_load_include('inc', 'sheetnode', 'socialcalc');
    $value = $values->{$this->field_alias};
    return socialcalc_import_date($value);
  }
}
