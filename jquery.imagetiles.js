// 
//  jquery.imagetiles.js
//  a jquery plugin to display a list of images in 
//  randomly sized tiles.  You can also have
//  a caption that will can be displayed on hover/focus
// 
//  The formatting of this plugin follows a prototyping model
//  that you can find in projects like Twitter's Bootstrap
//  (twitter.github.com/bootstrap)
//
//
//  Created by Carter Schoenfeld on 2012-06-28.
//  
// 


(function( $ ) {
  
  var imageTiles  = function( element, options ) {
    this.$element  = $(element);
    
    this.items       = this.$element.find('li');
    this.itemCount   = this.$element.find('li').length;
    this.rowCount    = this.$element.find('li').length;
  
   //class names to added to list items to create tile effect
    this.displays    = {
        '2' : 'span4',
        '3' : 'span3',
        '4' : 'span2',
        '5' : 'span2'
    };
    
    this.displayType = 2;
    
    this.options   = $.extend({}, $.fn.imagetiles.defaults, options);
    
  }
  
  imageTiles.prototype = {
    
    constructor: imageTiles
    
      , makeTiles : function(){
        var $i;
        
        this.$element.wrap('<div class="imageTiles" />');
        
        //starting an outer loop for counting all elements
        for( $i = 0; $i < (this.itemCount -1); $i++ ){
          
          this.setRandomDisplay($i);
          
          $i= $i+(this.displayType -1);
          
          this.rowCount = this.rowCount - this.displayType;
       }
        this.reformatCaption();
      }
      
      , setRandomDisplay : function(i){
          var $j;
          this.displayType = this.getRandomDisplay(this.rowCount);
          //starting loop to count the number of similar sized images
          for( $j = 1; $j <=this.displayType; $j++){  
            var tileClass = ((this.displayType == 5 && $j==1) ? 'span4' : this.displays[this.displayType]);
            this.items.eq(i).addClass(tileClass);
            i++;
          }
      }
      
      , getRandomDisplay : function( count ){
        var display = Math.floor(Math.random() * (5 - 2 + 1)) + 2;
        var amount = count - display;
        
        
        if (amount > count || amount == 1 || display > count){
          return ((display == 4 && amount == 1) || (display == 5  && amount == 1) ? 2 : display + amount);
        } else {
          return display;
        }
      }

      
      , reformatCaption : function(){
        var that = this;
        this.items.each(function(){
          that.positionCaption($(this));
          that.bindFocus($(this));
        });
      }
      
      , positionCaption : function(listItem){
        
        var caption         = listItem.find('.imagetile-caption')
            , listHeight    = listItem.height()
            , listWidth     = listItem.width()
            , captionStart  = (this.options.showCaption === 'Yes' ? listHeight - 40 : listHeight)
            , captionHeight = listItem.find('.imagetile-caption-text').height();  
        
            
        if(captionHeight > listHeight){
          this.recalcCaptionFont(caption, captionHeight, listHeight);
        }    
            
        caption.css({
          'height'      : listHeight,
          'width'       : listWidth,
          'top'         : captionStart,
          'line-height' : '20px'
        });
        
        
      }
      
      , recalcCaptionFont : function (item, captionHeight, listHeight){
          var childElements, lineHeight, newLineHeightMultiplier;
          childElements = item.children().children();
          
          for($i = 0; $i < childElements.length; $i++){
            
            var elementHeight = childElements.eq($i).height();

            if(elementHeight < listHeight){

              listHeight = listHeight - elementHeight;

            } else {

            this.hideOverflow($i+1, childElements);
            lineHeight = parseInt(childElements.eq($i).css('line-height'));
            newHeightMultiplier = Math.floor(listHeight/lineHeight) - 1;
            childElements.eq($i).height(newHeightMultiplier * lineHeight);
            break;

            }
          }
          
      }
      
      
      , hideOverflow : function($idx, items){
        for($idx; $idx < items.length; $idx++){
          items.eq($idx).hide();
        }
        
      }
      
      
      , bindFocus : function(listItem){
        var orgPosition  = listItem.find('.imagetile-caption').css('top');
        var captionHeight = listItem.find('.imagetile-caption-text').height();
        
        listItem.find('a').bind({
          'mouseenter focus': function(){
            listItem.find('.imagetile-caption').css({
              'top'        : '0px'
            });
              
            listItem.find('.imagetile-caption-text').css({
              'margin-top' : -captionHeight/2,
              'top'        : '50%'
            })
          },
          'mouseleave blur' : function(){
            listItem.find('.imagetile-caption').css({
              'top'        : orgPosition
            });
            
            listItem.find('.imagetile-caption-text').css({
              'margin-top' : 'auto',
              'top'        : '0px'
            })
          }
        })
      }   
  }
  
  $.fn.imagetiles = function( options ) {
   
    return this.each( function() {
      var $this = $(this)
         , data = $this.data('imagetiles');
      if (!data) $this.data('imagetiles', (data = new imageTiles(this, options)));   
      data.makeTiles();   
    })
  }; 
    
  $.fn.imagetiles.defaults = {
      showCaption : 'Yes'
  };
  
  $.fn.imagetiles.Constructor = imageTiles;
   
})( jQuery );