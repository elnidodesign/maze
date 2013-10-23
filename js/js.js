jQuery(document).ready(function ($) {


    $(window).stellar();

    var links = $('.navigation').find('li');
    slide = $('.slide');
    button = $('.button');
    mywindow = $(window);
    htmlbody = $('html,body');
	
	/**/	
	if (mywindow.scrollTop() < 1) {
		$('.navigation li[data-slide="1"]').addClass('active');
	}
	/**/

    slide.waypoint(function (event, direction) {

        dataslide = $(this).attr('data-slide');

        if (direction === 'down') {
            $('.navigation li[data-slide="' + dataslide + '"]').addClass('active').prev().removeClass('active');
			
			$('.navigation li[data-slide="1"]').removeClass('active');
			
        }
        else {
            $('.navigation li[data-slide="' + dataslide + '"]').addClass('active').next().removeClass('active');
        }

    });
 
    mywindow.scroll(function () {
        if (mywindow.scrollTop() == 0) {
            $('.navigation li[data-slide="1"]').addClass('active');
            $('.navigation li[data-slide="2"]').removeClass('active');
        }
    });

    /*function goToByScroll(dataslide) {
        htmlbody.animate({
            scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top
        }, 2000, 'easeInOutQuint');
    }*/
	
	function goToByScroll(dataslide) {
		var goal = $('.slide[data-slide="' + dataslide + '"]').offset().top;
		if (mywindow.scrollTop()<goal) {
			var goalPx = goal + 5;
		} else {
			var goalPx = goal - 50;
		}
        htmlbody.animate({
            scrollTop: goalPx
        }, 2000, 'easeInOutQuint');
    }

    links.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);
    });

    button.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);

    });
	
	//accordion
        $(".accordion h3").eq(1).addClass("active");
        $(".accordion .accord_cont").eq(1).show();
    
        $(".accordion h3").click(function(){
            $(this).next(".accord_cont").slideToggle("fast")
            .siblings(".accord_cont:visible").slideUp("fast");
            $(this).toggleClass("active");
            $(this).siblings("h3").removeClass("active");
        }); 
        
	//Pictures_bg
	$("#slide1, #slide3, #slide7").each(function () {
        var slide_h = $(this).height();
		
		$(this).css('background-size', '100% '+slide_h+'px');
		
    });
	
	
	
	
});

        $(window).load(function(){
            
            //set and get some variables
            var thumbnail = {
                imgIncrease : 100, /* the image increase in pixels (for zoom) */
                effectDuration : 400, /* the duration of the effect (zoom and caption) */
                /* 
                get the width and height of the images. Going to use those
                for 2 things:
                    make the list items same size
                    get the images back to normal after the zoom 
                */
                imgWidth : $('.grid_6 .thumbnailWrapper ul li').find('img').width(), 
                imgHeight : $('.grid_6 .thumbnailWrapper ul li').find('img').height() 
                
            };
            
            //make the list items same size as the images
            $('.grid_6  .thumbnailWrapper ul li').css({ 
                
                'width' : thumbnail.imgWidth, 
                'height' : thumbnail.imgHeight 
                
            });
            
            //when mouse over the list item...
            $('.grid_6 .thumbnailWrapper ul li').hover(function(){
                
                $(this).find('img').stop().animate({
                    
                    /* increase the image width for the zoom effect*/
                    width: parseInt(thumbnail.imgWidth) + thumbnail.imgIncrease,
                    /* we need to change the left and top position in order to 
                    have the zoom effect, so we are moving them to a negative
                    position of the half of the imgIncrease */
                    left: thumbnail.imgIncrease/2*(-1),
                    top: thumbnail.imgIncrease/2*(-1)
                    
                },{ 
                    
                    "duration": thumbnail.effectDuration,
                    "queue": false
                    
                });
                
                //show the caption using slideDown event
                $(this).find('.caption:not(:animated)').slideDown(thumbnail.effectDuration);
                
            //when mouse leave...
            }, function(){
                
                //find the image and animate it...
                $(this).find('img').animate({
                    
                    /* get it back to original size (zoom out) */
                    width: thumbnail.imgWidth,
                    /* get left and top positions back to normal */
                    left: 0,
                    top: 0
                    
                }, thumbnail.effectDuration);
                
                //hide the caption using slideUp event
                $(this).find('.caption').slideUp(thumbnail.effectDuration);
                
            });
            
        });