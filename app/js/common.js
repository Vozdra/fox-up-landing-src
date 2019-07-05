$(function() {

	$('.certific-owl').owlCarousel({
		loop: true,
		items: 3,
		nav: true,
		dots: true,
		autoplay: true,
		smartSpeed: 700,
		autoplayTimeout: 3000,
		navText: ['<i class="fa fa-angle-double-left"></i>','<i class="fa fa-angle-double-right"></i>'],
		responsiveClass: true,
		responsive: {
			0: {
				items: 1
			},
			480: {
				items: 1
			},
			768: {
				items: 2
			},
			992: {
				items: 3
			},
			1100: {
				items: 4
			},
		}
	});

	//E-mail Ajax Send
	$('.show_onsubmit').hide('slow');
	$("form.callback-form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			$('.show_onsubmit').show('slow');
			setTimeout(function() {
				$('.show_onsubmit').hide('slow');
				th.trigger("reset");

			}, 3000);
			return false;
		});
		return false;
	});

	$('.show_onsubmit_footer').hide('slow');
	$("form.footer-callback").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			$('.show_onsubmit_footer').show('slow');
			setTimeout(function() {
				$('.show_onsubmit_footer').hide('slow');
				th.trigger("reset");
			}, 3000);
			return false;
		});
		return false;
	});

//scrolling page
	$(window).scroll(function() {
		if ($(this).scrollTop() > $(this).height()) {
			$('.top').addClass('active');
		} else {
			$('.top').removeClass('active');
		}
	});
	$('.top').click(function() {
		$('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
	})

  $("#main-menu a, #footer-menu a").mPageScroll2id();

//menu for mobile
	$('.nav-mob-menu').hide();
	$('.label-mob-menu').click(function() {
		$('.nav-mob-menu').slideToggle('slow');
		$('.hamburger').toggleClass('is-active');
		return false;;
	});

//other
	$('.serv-item-more-info span').hide();
	$('.fa-question-circle').click(function() {
		$(this).parent().siblings('.serv-item-more-info').find('span').show('slow');
		return false;
	});

	$('.fa-times-circle').click(function() {
		$(this).parent().hide('slow');
		return false;
	});

	$('.s-my-work-btn-button').click(function() {
		var elem = $(this).parent().siblings().children();
		elem.css('opacity','1');
		return false;
	});

	$('.s-my-work-items-inner-clouse').click(function() {
		$(this).parent().css('opacity','0');
		return false;
	});

});
