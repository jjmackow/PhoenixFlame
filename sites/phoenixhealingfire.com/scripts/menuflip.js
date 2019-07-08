<!--//--><![CDATA[//><!--
$(document).ready(function() {
  //init scrollmagic
  var controller = new ScrollMagic.Controller();
  var pinMenuScene = new ScrollMagic.Scene({
    triggerElement: '.resMenu',
    triggerHook: 0
  })
  .setPin('.resMenu')
  .setClassToggle(".resMenu", 'fade_in')
  .addTo(controller);
  

  var pinLogoScene = new ScrollMagic.Scene({
    triggerElement: '.logo_and_menu',
    triggerHook: 0
  })
  .setPin('.logo_and_menu')
  .setClassToggle(".logo_and_menu", 'scrolled')
  .addTo(controller);
  
  var pinLogoScene = new ScrollMagic.Scene({
    triggerElement: '.logo_and_menu',
    triggerHook: 0
  })
  .setPin('.logo_and_menu')
  .setClassToggle(".front #site-name", 'scrolled')
  .addTo(controller);
  
 
  
  var rollupforkit = new ScrollMagic.Scene({
    triggerElement: '#block-views-slide-display-block',
    triggerHook: .2
  })
  .setPin('.forkit')
  .setClassToggle(".forkit", 'rollup')
  .addTo(controller);
  


  
  
  
 
  var ourScene = new ScrollMagic.Scene({      
    triggerElement: "#block-views-slide-display-block",
    triggerHook: .10, //0 is the top and 1 is the bottom;
    
    reverse: false  //default
  })
   .setTween(
    TweenMax.from("#block-views-slide-display-block",1, {y: '2%', x: '0%', ease:Power0.ease})
  )
  .setClassToggle("#block-views-slide-display-block", 'fade_in')
  .addTo(controller);
  
  
  
  
  //loop through each .plx-fmt  
  $('.fancyitem-wrapper').each(function(){
    //build scene
    console.log(this);
    var ourScene = new ScrollMagic.Scene({      
      triggerElement: this,
      triggerHook: .80, //0 is the top and 1 is the bottom;
      duration: '95%',
      reverse: true  //default
    })
     .setTween(
      TweenMax.from(this.children[0],1, {y: '0%', x: '0%', ease:Power0.ease})
    )     
    .setClassToggle(this.children[0], 'fade_in')
    .addTo(controller);
    
    var targetElement = $(this).find('h2');
    var ourScene2 = new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: .70, //0 is the top and 1 is the bottom;
      duration: '90%',
      reverse: true  //default
    })
     .setTween(
      TweenMax.from(targetElement[0],1, {y: '-60%', x: '-50%', ease:Power0.ease})
    )     

    .setClassToggle(targetElement[0], 'fade_in')
    .addTo(controller);       
  })  
})

;
(function ($) {
  'use strict';
  var content  = $('.main-container').smoothState({
        // onStart runs as soon as link has been activated
        onStart : {
          
          // Set the duration of our animation
          duration: 250,
          
          // Alterations to the page
          render: function () {

            // Quickly toggles a class and restarts css animations
            content.toggleAnimationClass('is-exiting');
          }
        }
      }).data('smoothState'); // makes public methods available
})(jQuery);
//--
