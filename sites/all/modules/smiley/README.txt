
CONTENTS OF THIS FILE
---------------------

* Overview
* Features
* Requirements
* Installation
* Known problems
* Version history
* Future plans
* Similar projects
* Credits

OVERVIEW
--------

This module aims to provide an API for adding graphical smileys to Drupal "long
text" fields (e.g.: node bodies, comments) through a text filter.

The smiley_kobolok module aims to provide a basic set of smileys and serve as an
example of how to implement the Smiley API.

FEATURES
--------

* Provides a "Convert smileys to images" text filter which replaces specific
  text with a graphical smiley.
* Supports replacing text with <img> tags or <span>-tags-with-background-images.
* Provides a hook to allow other module developers to define their own smileys.

REQUIREMENTS
------------

None, besides Drupal 7!

INSTALLATION
------------

1. Download and install the smiley project.

   Install as usual, see https://drupal.org/node/895232 for further information.

2. Add the smiley filter to a text format.

   Go to Administration -> Configuration -> Content authoring -> Text formats.

   You will see one or more text formats listed, typically Filtered HTML, Full
   HTML and Plain text. Click the "configure" link in the Operations column next
   to the text format you want to enable smileys in.

   You will see the text format configuration screen. Under "Enabled filters",
   check "Convert smileys to images". In the Filter processing order section,
   ensure "Convert smileys to images" is placed below "Limit allowed HTML tags".
   Otherwise, your smileys may not show up.

KNOWN PROBLEMS
--------------

The smiley_wysiwyg module needs to be ported from smiley-1.x to smiley-2.x.

VERSION HISTORY
---------------

The 1.x branch provides a text filter which replaces text smileys with <img>
tags in long text fields. The mappings between text smileys and images is stored
in a database table. Smileys can be added by putting them into special
filesystem directories.

The 2.x branch is a full rewrite. Like the 1.x branch, it provides an text
filter to replace smileys, but it can replace them with either <img> tags or
<span>-tags-with-background-images. Both approaches use the theme layer,
allowing other modules and themes to control the output. Smiley-image mappings
can be defined by implementing hook_smiley_replacements() in a custom module and
stored by caches.

FUTURE PLANS
------------

It would be useful to display the list of available smileys as a long filter
tip.

It would be good to bring back integration with wysiwyg. Since Drupal 8 will
have CKEditor installed by default, integration with CKEditor will probably get
done first, but feel free to contribute patches for your favourite editor!

SIMILAR PROJECTS
----------------

We're not aware of any modules similar to this one.

CREDITS
-------

This module was originally written and maintained up to Drupal's 4.7 release by
unconed (Steven Wittens).

Gurpartap Singh maintained the module until Drupal 6's release.

fizk (Yonas Yanfa) and mparker17 currently maintain the module.

The kolobok smileys were contributed by Mantsurov Ivan, aka Aiwan
(http://www.en.kolobok.us).
