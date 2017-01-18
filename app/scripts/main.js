/* global $ */

(function() {

	'use strict';

	var videoID, isPlaying = false;

	$('.js-video-tab').on('click', function() {
		var panelTarget = $(this).attr('data-business');

		if (!$(this).is('.active')) {
			$('.js-video-tab').removeClass('active');
			$(this).addClass('active');

			if (isPlaying) {
				window.wistiaInit = function(w) {
					w.api(videoID).pause();
				};

				$('.js-video').removeClass('playing');
			}

			$('.js-video-panel.active').addClass('fixed');

			$('.js-video-panel[data-video-panel="' + panelTarget + '"').addClass('active');

			setTimeout(function() {
				$('.js-video-panel.active.fixed').removeClass('active fixed');
			}, 500);
		}

	});

	$('.js-play-btn').on('click', function(e) {
		e.preventDefault();
		$(this).parent().next('.js-video').addClass('playing');

		videoID = $(this).parent().next('.js-video').find('.wistia_embed').attr('id');

		window.wistiaInit = function(w) {
			w.api(videoID).play();
			isPlaying = true;
		};
	});

	$('.js-close-video').on('click', function() {
		$(this).parent().removeClass('playing');

		videoID = $(this).prev().find('.wistia_embed').attr('id');

		window.wistiaInit = function(w) {
			w.api(videoID).pause();
			isPlaying = false;
		};
	});

}());
