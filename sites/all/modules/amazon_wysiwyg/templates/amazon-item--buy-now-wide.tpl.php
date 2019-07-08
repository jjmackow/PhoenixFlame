<?php

/**
 * @file
 *
 * Theme the 'amazon-item' 'buy now' style.
 */
$options = array(
  'html' => TRUE,
  'attributes' => array(
    'rel' => 'nofollow',
  ),
);
if (variable_get('amazon_wysiwyg_link_new_window')) {
  $options['attributes']['target'] = '_blank';
}
?>
<div class="<?php print $classes; ?> buy-now wide">
  <span class="image"><?php (!empty($mediumimage)) ? print $mediumimage : ''; ?></span>
  <h3 class="title"><?php print l($title, $detailpageurl, $options); ?></h3>
  <div class="row">
    <?php $options['attributes']['class'][] = 'buy-now-button'; ?>
    <span class="price"><?php (!empty($price)) ? print $price : ''; ?></span>
    <span class="button"><?php print l(t('Buy now'), $detailpageurl, $options); ?></span>
    <span class="logo"><?php print l('<img src="/' . $logo_src . '" class="amazon-logo">', $detailpageurl, $options); ?></span>
  </div>
</div>
