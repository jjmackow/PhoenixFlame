<?php

/**
 * @file
 * Extension of the Views Plugin Style for Leaflet Map.
 *
 * Adapted from the GeoField Map views module and the OpenLayers Views module.
 *
 * @todo offset settings such as the map height etc, this will have to be defined in
 * the map definition.
 */
class leaflet_views_data_plugin_style extends leaflet_views_plugin_style {

  /**
   * Renders view
   */
  function render() {
    if (!empty($this->view->live_preview)) {
      return t('No preview available');
    }

    $data = array();

    if ($this->options['data_source']) {
      $this->render_fields($this->view->result);
      foreach ($this->view->result as $id => $result) {
        $geofield = $this->get_field_value($id, $this->options['data_source']);

        if (!empty($geofield)) {
          $points = leaflet_process_geofield($geofield);

          // Render the entity with the selected view mode
          if ($this->options['description_field'] === '#rendered_entity' && is_object($result)) {
            $entities = entity_load($this->entity_type, array($result->{$this->entity_info['entity keys']['id']}));

            $build = entity_view(
              $this->entity_type,
              $entities,
              $this->options['view_mode']
            );

            $description = drupal_render($build);
          }

          // Normal rendering via fields
          elseif ($this->options['description_field']) {
            $description = $this->rendered_fields[$id][$this->options['description_field']];
          }

          // Attach pop-ups if we have a description field
          if (isset($description)) {
            foreach ($points as &$point) {
              $point['popup'] = $description;
            }
          }

          // Attach also titles, they might be used later on
          if ($this->options['name_field']) {
            foreach ($points as &$point) {
              $point['label'] = $this->rendered_fields[$id][$this->options['name_field']];
            }
          }

          // Let modules modify the points data.
          drupal_alter('leaflet_views_alter_points_data', $result, $points);

          $data = array_merge($data, $points);

          if (!empty($this->options['icon']) && $this->options['icon']['iconUrl']) {
            foreach ($data as $key => $feature) {
              $data[$key]['icon'] = $this->options['icon'];
            }
          }
        }
      }

      // Fetch the map, we might use settings from the map definition.
      $map = leaflet_map_get_info($this->options['map']);

      // Allow map definitions to provide a default icon, we need to add this immediately here
      if (isset($map['icon']['iconUrl'])) {
        foreach ($data as $key => $feature) {
          $data[$key]['icon'] = $map['icon'];
        }
      }
    }

    return $data;
  }
}
