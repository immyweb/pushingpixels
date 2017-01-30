import $ from 'jquery';
import { TweenMax } from 'gsap';
import ScrollMagic from 'scrollmagic';
import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';

export default {

    init: () => {

		let controller,
			$navItems = $('.nav__items li').not('.nav__item--active'),
			$navTrigger = $('.nav-trigger'),
			getTriggersDown = $('.slide-pos'),
			triggersDown = [];


		// Triggers on the way down
		$.each(getTriggersDown, (key, value) => {

			let id = '#' + value.id;
			triggersDown.push(id);

		});


		controller = new ScrollMagic.Controller();

		// Scene 1 - pin our main section
		const pinScene01 = new ScrollMagic.Scene({
			triggerElement: '#main',
			triggerHook: 0,
			duration: '400%'
		});

		pinScene01
			.setPin('#main .pin-wrapper', { pushFollowers: false })
			.addTo(controller);


		// Navigation timeline
		let navTl = new TimelineMax();

		$navItems.each((index, item) => {
			let slideHREF = $(item).find('a').attr('href'),
				slideID = slideHREF.substr(slideHREF.length -7),
				moveNav = TweenMax.to($('.nav__active'), 1, { y: '+=34.5', ease: Linear.easeNone });

			// Add individual tweens to the timeline
			navTl.add(moveNav, slideID);
		});


		// Scene 2 - move navigation
		const navScene = new ScrollMagic.Scene({
			triggerElement: $navTrigger,
			duration: '400%'
		});

		navScene
			.setTween(navTl)
			.addTo(controller);


		// Scene 3 - trigger the right animation on the way DOWN
		triggersDown.forEach((triggerDown) => {

			let triggerTransitionToNext = new ScrollMagic.Scene({
				triggerElement: triggerDown,
				triggerHook: 0.6
			});

			triggerTransitionToNext
				.on('enter', (e) => {
					console.log('crossfade to next ' + triggerDown);

					// let $slideOut = $('.slide.active'),
					// 	slideIndex = triggerDown.substring(6, 8),
					// 	$slideIn = $('#slide' + slideIndex),
					// 	direction = e.scrollDirection;

					// console.log(e.scrollDirection);

					// crossFade($slideOut, $slideIn, direction, slideIndex);
				})
				.addIndicators({
					name: 'triggerDown',
					indent: 520,
					colorStart: 'yellow',
					colorTrigger: 'yellow'
				})
				.addTo(controller);
		});

    }

};
