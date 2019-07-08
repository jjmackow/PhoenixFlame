<?php

/**
 * @file
 * Template file views-view-fractionslider.tpl.php.
 */
?>

<div class="slider-wrapper">
  <div class="responisve-container">
    <div class="slider">
      <div class="fs_loader"></div>
      <?php foreach ($rows as $id => $row): ?>
        <div class="slide <?php print $class; ?>"><?php print $row; ?></div>
      <?php endforeach; ?>
    </div>
  </div>
</div>
