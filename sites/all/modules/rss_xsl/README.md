# RSS XSL

*User friendly appearance of RSS feeds.*

Depending on a users browser configuration, they can be presented with a page
of XML when following links to RSS feeds. This could be considered to be 
un-intuitive to some categories of user. This module transforms the appearance
of RSS feeds into a more intuitive html page without breaking the RSS
specification required for RSS reading software.

By harnessing the markup intended for Drupal's maintenance page functionality,
this module inserts an XSL stylesheet to RSS feeds from both the default /node
url and those generated from Views RSS plugin.

This module relies upon any site to have a maintenance page in working and
presentable state.

## Installation
* Drop the entire link module directory into your 'sites/all/modules' folder
* Enable from the Administration area modules page (admin/build/modules)

## Configuration
Users with the 'Administer RSS XSL module' permission can configure the help
text shown above RSS content.

## Overriding templates
This module allows the following templates to be overridden in a sites theme:
* rss-xsl-xsl-header.tpl.php
* rss-xsl-xsl-body.tpl.php
* rss-xsl-xsl-footer.tpl.php
