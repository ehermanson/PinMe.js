/**
 * @author Eric Hermanson
 */

;(function($) {

  'use strict';

  $.fn.pinMe = function (options) {

    var settings = {
      customElements: null,
      fadeDuration: 700,
      pageUrl: document.URL,
      pinButton: '<div class="button">Pin</div>',
      defaultDescription: "Check this out!",
      popOut: true,
      showOnHover: true,
      ignore: null
    };

    if ( options ) {
      $.extend ( settings, options );
    }

    return this.each(function() {

      // Set the default selector, then add any custom selectors to the list
      var selectors = [
        'img'
      ];

      if (settings.customElements) {
        selectors.push(settings.customElements);
      }

      // Set a default class to ignore, then add any custom classes to ignore
      var ignoreList = '.no-pin';

      if(settings.ignore) {
        ignoreList = ignoreList + ', ' + settings.ignore;
      }

      // Get a list of all the images that match our selectors
      var $images = $(this).find(selectors.join(','));

      // For each one, run the function to add the pin button
      $images.each(function(){
        var $this = $(this);

        // If this image has one of the ignored classes, ignore it and move on.
        if($this.is(ignoreList)) {
          return;
        }

        var pinUrl = settings.pageUrl;
        var pinMedia = $this[0].src;
        var pinDesc = $this.attr('alt') ? $this.attr('alt') : $this.attr('title');
        var pinIsVideo = 'false';
        var pinText;

        if(encodeURI(pinDesc) !== 'undefined' ) {
          pinText = encodeURI(pinDesc);
        } else {
          pinText = settings.defaultDescription;
        }

        var shareUrl = 'http://pinterest.com/pin/create/bookmarklet/?media=' + encodeURI(pinMedia) + '&url=' + encodeURI(pinUrl) + '&is_video=' + encodeURI(pinIsVideo) + '&description=' + encodeURI(pinText);
        
        // Wrap the images in a div, and give it position:relative
        var wrap = '<div class="pin-me"></div>';
        $this.wrap(wrap).parent('.pin-me').css({"position" : "relative", "display" : "inline-block"});

        // Add the pin-me button and link, aligned to the top-left of the image
        $this.after('<span class="pin-me-button"><a style="display:block" href="' + shareUrl + '">'+ settings.pinButton +'</a></span>').next('.pin-me-button').css({'position':'absolute', 'top': '20px', 'left': '20px'});

        // If set, hide pin button and show on hover
        if(settings.showOnHover === true ) {

          $('.pin-me-button').css('display','none');

          $( ".pin-me" ).hover(function() {
            $( this ).find( ".pin-me-button" ).stop().fadeIn(settings.fadeDuration);
          }, function() {
            $( this ).find( ".pin-me-button" ).stop().fadeOut(settings.fadeDuration);
          });
        }

      });

      // If set, pop the Pinterest window out in a new window
      if(settings.popOut === true){
        $('.pin-me-button a').on('click', function (e) {
            popupCenter($(this).attr('href'), 'Pinterest', 580, 470);
            e.preventDefault();
        });
      }

    });
    
  };

  var popupCenter = function(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 3) - (h / 3)) + dualScreenTop;

    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
      newWindow.focus();
    }
  };

})(jQuery);
