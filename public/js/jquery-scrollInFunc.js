/*!
 * jQuery scrollInFunc plugin -version 1.0.0
 *
 *
 * Copyright 2015, Mayumi Tanji
 * Released under the MIT license
 * http://www.opensource.org/licenses/mit-license.php
 */

 (function( $ ){

  $.fn.scrollInFunc = function( options ) {

    var defaults = $.extend( {
      delayHeight : 400,
      fadeOutEvent : true,
      targetReach: function() {},
      targetBack: function() {}
    }, options);

    return this.each(function() {

      var self = $(this);

      $(window).on('load scroll resize',function(){
        var target = self.find(defaults.selector);
        var elmTop = self.offset().top;
        var scrTop = $(window).scrollTop();
        var elmHeight = self.height();
        var windowHeight = $(window).height();
        if (scrTop > elmTop - defaults.delayHeight && scrTop + windowHeight > elmTop + elmHeight){
          if (!self.hasClass('on')) {
            defaults.targetReach( self );
            self.addClass('on');
          }
        }
        if (scrTop + windowHeight < elmTop){
          if (self.hasClass('on') && defaults.fadeOutEvent === true) {
            defaults.targetBack( self );
            self.removeClass('on');
          }
        }
      });

    });

  };

})( jQuery );