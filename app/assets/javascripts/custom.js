/* ---------------------------------------------------- */
/*		Navigation Dropdowns
/* ---------------------------------------------------- */

$(function() {

	$('#nav ul').css('width', 'auto');
	$('#header').after('<div class="subnav-background"></div>');

	$('#nav li').hover(function() {
		$(this).children('ul').hide().stop(true, true).slideDown(200);
	}, function() {
		$(this).children('ul').stop(true, true).fadeOut(0, function() {
			$('.subnav-background').slideUp(200);
			$('#header').removeClass('active');
		});
	});

	$('#nav li').hover(function() {
		if( $(this).children('ul').length > 0 ) {
			var containerWidth = $('.container').width(),
				subWidth = $(this).children('ul').width(),
				pos = $(this).position(),
				left = containerWidth - subWidth - ( pos.left + ( $(this).width() / 2 )),
				margin = ( $(this).children('ul').children('li').size() - 1 ) * 30;
				
			$(this).children('ul').css('right', left+margin);
			$(this).addClass('hover');
			$('.subnav-background').stop(true, true).slideDown(200);
			$('#header').addClass('active');
		}
	}, function() {
		$(this).removeClass('hover');
		
	});
});

/* end Navigation Dropdowns */

/* ---------------------------------------------------- */
/*		Input Placeholders
/* ---------------------------------------------------- */

$(function() {
	$('[placeholder]').focus(function() {
		var input = $(this);
		if (input.val() == input.attr('placeholder')) {
			input.val('');
			input.removeClass('placeholder');
		}
	}).blur(function() {
		var input = $(this);
		if (input.val() == '' || input.val() == input.attr('placeholder')) {
			input.addClass('placeholder');
			input.val(input.attr('placeholder'));
		}
	}).blur().parents('form').submit(function() {
		$(this).find('[placeholder]').each(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
			}
		})
	});
})

/* end Input Placeholders */

/* ---------------------------------------------------- */
/*		Homepage Project Grid
/* ---------------------------------------------------- */

$(function(){
	$('#projects-slider').gridnav({
		rows	: 2,
		type	: {
			mode		: 'sequpdown',
			speed		: 350,
			easing		: 'easeOutCubic',
			factor		: 50,
			reverse		: false,
			timeout		: 3000
		}
	});
});

/* end Homepage Project Grid */

/* ---------------------------------------------------- */
/*		Blog Post Carousel
/* ---------------------------------------------------- */

$(function() {
	$('.carousel').jcarousel({
		animation: 600,
		easing: 'easeOutCubic'
	});
});

/* end Blog Post Carousel */

/* ---------------------------------------------------- */
/*		Google Maps
/* ---------------------------------------------------- */

$(function() {
	var image = new google.maps.MarkerImage(
		'img/google-map-marker.png',
		new google.maps.Size(171,82),
		new google.maps.Point(0,0),
		new google.maps.Point(171,82)
	);

	var shadow = new google.maps.MarkerImage(
		'img/google-map-shadow.png',
		new google.maps.Size(215,82),
		new google.maps.Point(0,0),
		new google.maps.Point(171,82)
	);

	var shape = {
		coord: [165,0,166,1,167,2,168,3,169,4,170,5,170,6,170,7,170,8,170,9,170,10,170,11,170,12,170,13,170,14,170,15,170,16,170,17,170,18,170,19,170,20,170,21,170,22,170,23,170,24,170,25,170,26,170,27,170,28,170,29,170,30,170,31,170,32,170,33,170,34,170,35,170,36,170,37,170,38,170,39,170,40,170,41,170,42,170,43,170,44,170,45,170,46,170,47,169,48,168,49,168,50,166,51,165,52,135,53,136,54,137,55,137,56,138,57,139,58,139,59,140,60,141,61,141,62,142,63,143,64,143,65,144,66,145,67,145,68,146,69,147,70,148,71,148,72,149,73,150,74,150,75,151,76,152,77,152,78,153,79,154,80,154,81,153,81,151,80,150,79,148,78,146,77,145,76,143,75,141,74,140,73,138,72,136,71,134,70,133,69,131,68,129,67,128,66,126,65,124,64,123,63,121,62,119,61,118,60,116,59,114,58,113,57,111,56,109,55,107,54,106,53,5,52,4,51,2,50,2,49,1,48,0,47,0,46,0,45,0,44,0,43,0,42,0,41,0,40,0,39,0,38,0,37,0,36,0,35,0,34,0,33,0,32,0,31,0,30,0,29,0,28,0,27,0,26,0,25,0,24,0,23,0,22,0,21,0,20,0,19,0,18,0,17,0,16,0,15,0,14,0,13,0,12,0,11,0,10,0,9,0,8,0,7,0,6,0,5,1,4,2,3,3,2,4,1,5,0,165,0],
		type: 'poly'
	};

 	var place = new google.maps.LatLng(-37.81799016456871, 144.96523663401604);

	$('#contact-map').gmap3({
		action: 'addMarker',
		latLng: place,
		map: {
			center: true,
			zoom: 17
		},
		marker: {
			options:{
				icon: image,
				shadow: shadow,
				shape: shape,
				position: place
			}
		}
	});
});

/* end Google Maps */

/* ---------------------------------------------------- */
/*		Grayscale Image Hover Effect
/* ---------------------------------------------------- */

$(function() {
	
	// clone image
	$('.single_image img, .multi_images img, .blog-posts .post-image').each(function(){
		var el = $(this);
		el.css({"position":"absolute"}).wrap("<div class='img-wrapper' style='display: inline-block;'>").clone().addClass('img-grayscale').css({"position":"absolute","z-index":"998","opacity":"1"}).insertBefore(el).queue(function(){
			var el = $(this);
			el.parent().css({"width":this.width,"height":this.height});
			el.dequeue();
		});
		this.src = grayscale(this.src);
	});
	
	// Fade image 
	$('.single_image img, .multi_images img, .blog-posts .post-image').mouseover(function(){
		$(this).parent().find('img:first').stop().animate({opacity:0.3}, 400);
	})
	$('.img-grayscale').mouseout(function(){
		$(this).stop().animate({opacity:1}, 400);
	});		
	
	// Grayscale w canvas method
	function grayscale(src){
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		var imgObj = new Image();
		imgObj.src = src;
		canvas.width = imgObj.width;
		canvas.height = imgObj.height; 
		ctx.drawImage(imgObj, 0, 0); 
		var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
		for(var y = 0; y < imgPixels.height; y++){
			for(var x = 0; x < imgPixels.width; x++){
				var i = (y * 4) * imgPixels.width + x * 4;
				var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
				imgPixels.data[i] = avg; 
				imgPixels.data[i + 1] = avg; 
				imgPixels.data[i + 2] = avg;
			}
		}
		ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
		return canvas.toDataURL();
    }

});

/* end Blog Post Carousel */

/* ---------------------------------------------------- */
/*		Fancybox
/* ---------------------------------------------------- */

$(function(){
	// Images
	$("a.single_image").fancybox({
		'transitionIn'	: 'fade',
		'transitionOut'	: 'fade',
		'titlePosition'	: 'over'
	});
	$("a.multi_images").fancybox({
		'transitionIn'	: 'fade',
		'transitionOut'	: 'fade',
		'titlePosition'	: 'over'
	});

	//Iframe
	$("a.iframe").fancybox({
		'width'				: '75%',
		'height'			: '75%',
		'autoScale'     	: false,
		'transitionIn'		: 'fade',
		'transitionOut'		: 'fade',
		'type'				: 'iframe',
		'titleShow'		    : false
	});

	// Youtube Video
	$(".youtube_video").click(function() {
		$.fancybox({
				'padding'		: 0,
				'autoScale'		: false,
				'transitionIn'	: 'fade',
				'transitionOut'	: 'fade',
				'title'			: this.title,
				'width'		    : 680,
				'height'		: 495,
				'href'			: this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
				'type'			: 'swf',
				'swf'			: {
					'wmode'		: 'transparent',
					'allowfullscreen'	: 'true'
				}
			});

		return false;
	});
});

/* end Fancybox */

/* ---------------------------------------------------- */
/*		Accordion Content
/* ---------------------------------------------------- */

$(function() {
	$('.acc-container').hide();
	$('.acc-trigger:first').addClass('active').next().show();

	var fullWidth = $('.acc-container').outerWidth(true);
	$('.acc-trigger').css('width', fullWidth);
	$('.acc-container').css('width', fullWidth);
	
	$('.acc-trigger').click(function(e) {
		if( $(this).next().is(':hidden') ) {
			$('.acc-trigger').removeClass('active').next().slideUp(300);
			$(this).toggleClass('active').next().slideDown(300);
		}
		e.preventDefault();
	});
});

/* end Accordion Content */

/* ---------------------------------------------------- */
/*		Content Tabs
/* ---------------------------------------------------- */

$(function() {
	$('.tab-content').hide();
	$('.tabs li:first').addClass('active').show();
	$('.tab-content:first').show();

	$('.tabs li').click(function(e) {
		$('.tabs li').removeClass('active');
		$(this).addClass('active');
		$('.tab-content').hide();

		var activeTab = $(this).find('a').attr('href');
		$(activeTab).fadeIn();

		e.preventDefault();
	});
});

/* end Content Tabs */

/* ---------------------------------------------------- */
/*		Contact Form
/* ---------------------------------------------------- */

$(function(){

	$('#form-submit').after('<p class="hide" id="response">');
	
	//Do what we need to when form is submitted.
	$('#form-submit').click(function(e){
	
	//Setup any needed variables.
	var input_name = $('#form-name').val(),
		input_email = $('#form-email').val(),
		input_message = $('#form-message').val(),
		response_text = $('#response');
		//Hide any previous response text 
		response_text.hide();
		
		//Change response text to 'loading...'
		response_text.html('<img src="loader.gif" height="11" width="16" alt="Loading..." />').show();
		
		//Make AJAX request 
		$.post('php/contact-send.php', {name: input_name, email: input_email, message: input_message}, function(data){
			response_text.html(data);
		});
		
		//Cancel default action
		e.preventDefault();
	});

});

/* end Contact Form */

/* ---------------------------------------------------- */
/*		Single Work Slider(s)
/* ---------------------------------------------------- */

$(function() {
	$('#single-project .slider')
		.after('<div class="single-project-slider-nav">')
		.each(function(){
			var p = this.parentNode;
			$(this).cycle({
				fx: 'fade',
				pager:  $('.single-project-slider-nav', p),
				pause: true,
				speed: 600
			});    
	});
});

/* end Single Work Slider */
