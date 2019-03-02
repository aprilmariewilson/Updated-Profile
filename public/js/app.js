
/*
	Preloader
*/

$(window).on("load", function () {
	var preload = $('.preloader');
	preload.find('.spinner').fadeOut(function () {
		preload.fadeOut();
	});
});

$(function () {
	'use strict';


	/*
		Vars
	*/

	var width = $(window).width();
	var height = $(window).height();


	/*
		Header Menu Desktop
	*/

	var container = $('.container');
	var card_items = $('.card-inner');
	var animation_in = container.data('animation-in');
	var animation_out = container.data('animation-out');

	$('.top-menu').on('click', 'a', function () {

		/* vars */
		var id = $(this).attr('href');
		var h = parseFloat($(id).offset().top);
		var card_item = $(id);
		var menu_items = $('.top-menu li');
		var menu_item = $(this).closest('li');
		var d_lnk = $('.lnks .lnk.discover');

		/* if desktop */
		if (!menu_item.hasClass('active') & (width > 1023) & $('#home-card').length) {

			/* close card items */
			menu_items.removeClass('active');
			container.find(card_items).removeClass('animated ' + animation_in);

			if ($(container).hasClass('opened')) {
				container.find(card_items).addClass('animated ' + animation_out);
			}

			/* open card item */
			menu_item.addClass('active');
			container.addClass('opened');
			container.find(card_item).removeClass('animated ' + animation_out);
			container.find(card_item).addClass('animated ' + animation_in);

			$(card_items).addClass('hidden');

			$(card_item).removeClass('hidden');
			$(card_item).addClass('active');
		}

		/* if mobile */
		if ((width < 1024) & $('#home-card').length) {

			/* scroll to section */
			$('body,html').animate({
				scrollTop: h - 76
			}, 800);
		}

		return false;
	});


	/*
		Smoothscroll
	*/

	if ((width < 1024) & $('#home-card').length) {
		$(window).on('scroll', function () {
			var scrollPos = $(window).scrollTop();
			$('.top-menu ul li a').each(function () {
				var currLink = $(this);
				var refElement = $(currLink.attr("href"));
				if (refElement.offset().top - 76 <= scrollPos) {
					$('.top-menu ul li').removeClass("active");
					currLink.closest('li').addClass("active");
				}
			});
		});
	}


	/*
		slimScroll
	*/

	if (width > 1024) {
		$('.card-inner .card-wrap').slimScroll({
			height: '570px',
			background: '#d1cb7a',
		});
	}


	/*
		Hire Button
	*/

	$('.lnks').on('click', '.lnk.discover', function () {
		$('.top-menu a[href="#contacts-card"]').trigger('click');
	});


	/*
		word animation
	*/
	
	var typed = new Typed('.language-list', {
		strings: ['React', 'Redux', 'MongoDB', 'Mongoose', 'MySQL', 'Templates', 'Handlebars.js',
		'Sequelize', 'Mocha', 'Chai', 'Jest', 'Enzyme', 'Node.js', 'ES6', 'Linux', 'Authentication',
		'Express.js', 'GIT', 'Github', 'Heroku', 'Digital Ocean', 'API', 'JSON', 'AJAX',
		'JavaScript', ' jQuery', 'Firebase', 'HTML5', 'CSS', 'SASS', 'LESS', 'Bootstrap', 'Materialize',
		'Templates', 'Handlebars.js', 'Yarn'
	],
		typeSpeed: 70,
		startDelay: 700,
		smartBackspace: true,
		backDelay: 700,
		backSpeed: 70,
		shuffle: true,
		showCursor: false,
		autoInsertCss: true,
		loop: false,
		loopCount: Infinity,
	  });

	/*
		Initialize masonry items
	*/

	var $container = $('.grid-items');

	$container.imagesLoaded(function () {
		$container.multipleFilterMasonry({
			itemSelector: '.grid-item',
			filtersGroupSelector: '.filter-button-group',
			percentPosition: true,
			gutter: 0
		});
	});


	/*
		12. Initialize masonry filter
	*/

	$('.filter-button-group').on('change', 'input[type="radio"]', function () {
		if ($(this).is(':checked')) {
			$('.f_btn').removeClass('active');
			$(this).closest('.f_btn').addClass('active');
		}
		/* popup image */
		$('.has-popup-image').magnificPopup({
			type: 'image',
			closeOnContentClick: true,
			mainClass: 'popup-box',
			image: {
				verticalFit: true
			}
		});

		/* popup video */
		$('.has-popup-video').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			removalDelay: 160,
			preloader: true,
			fixedContentPos: false,
			overflowY: scroll,
			// disableOn: 0,
			mainClass: 'popup-box',
			image: {
				verticalFit: true
			}
		});

		/* popup music */
		$('.has-popup-music').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false,
			// disableOn: 0,
			mainClass: 'popup-box'
		});

		/* popup media */
		$('.has-popup-media').magnificPopup({
			type: 'inline',
			overflowY: 'auto',
			closeBtnInside: true,
			mainClass: 'popup-box-inline'
		});
	});


	/*
		Popups
	*/

	/* popup image */
	$('.has-popup-image').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'popup-box',
		image: {
			verticalFit: true
		}
	});

	/* popup video */
	$('.has-popup-video').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
		// disableOn: 0,
		mainClass: 'popup-box'
	});

	/* popup music */
	$('.has-popup-music').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
		// disableOn: 0,
		mainClass: 'popup-box'
	});

	/* popup media */
	$('.has-popup-media').magnificPopup({
		type: 'inline',
		overflowY: 'auto',
		closeBtnInside: true,
		mainClass: 'popup-box-inline',
		callbacks: {
			open: function () {
				$('.popup-box-inline .popup-box').slimScroll({
					height: height + 'px'
				});
			}
		}
	});



	// validate contact form and send to database


	$(".submit").on("click", function (event) {
		event.preventDefault();

		//create new user
		var userData = {
			"name": $("#exampleInputName").val().trim(),
			"email": $("#exampleInputEmail").val().trim(),
			"phoneNumber": $("#exampleInputPhoneNumber").val().trim(),
			"message": $("#exampleTextarea").val().trim(),
		};
		$.post("/api/users", userData)
			.then(function () {
				console.log("you made it into the post function!" + userData);
				$('#cform').fadeOut();
				$('.alert-success').delay(1000).fadeIn();
				$(".form-control").val('');
				event.preventDefault();
				jQuery.noConflict();


			});

	});


});