<?php
/**
 * @file
 * Displays an image smiley.
 *
 * Available variables:
 * - $image_path: The path to the image.
 * - $replaced_text: The text that was replaced.
 * - $classes: A string of classes to be applied to the image.
 * - $classes_array: An array of classes that were serialized into the classes
 *   variable.
 *
 * @see template_preprocess_smiley()
 *
 * @ingroup themeable
 */
?>
<img src="<?php print $image_path; ?>" class="<?php print $classes; ?>" style="vertical-align: middle;" />
