import $ from 'jquery';
import { TweenMax } from 'gsap';
import ScrollMagic from 'scrollmagic';
import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';

import Splash from './components/splash';
import About from './components/about';
import Contact from './components/contact';
import Gallery from './components/gallery';
// import galleryModal from '../gallery-modal/index';

export default {

    init: () => {

		const splash = new Splash(),
			about = new About(),
			contact = new Contact(),
			gallery = new Gallery();

		let controller,
			$navItems = $('.nav__items li').not('.nav__item--active'),
			$navTrigger = $('.nav-trigger'),
			getTriggersDown = $('.slide-pos'),
			triggersDown = [],
			getTriggersUp = $('.slide-pos--reverse'),
			triggersUp = [],
			$slideIn = $('.slide.active');


		// Triggers on the way down
		$.each(getTriggersDown, (key, value) => {

			let id = '#' + value.id;
			triggersDown.push(id);

		});

		// Triggers on the way up
		$.each(getTriggersUp, (key, value) => {

			let id = '#' + value.id;
			triggersUp.push(id);

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
					// console.log('crossfade to next ' + triggerDown);

					let $slideOut = $('.slide.active'),
						slideIndex = triggerDown.substring(6, 8),
						$slideIn = $('#slide' + slideIndex),
						direction = e.scrollDirection;

					// console.log(e.scrollDirection);

					crossFade($slideOut, $slideIn, direction, slideIndex);
				})
				// .addIndicators({
				// 	name: 'triggerDown',
				// 	indent: 520,
				// 	colorStart: 'yellow',
				// 	colorTrigger: 'yellow'
				// })
				.addTo(controller);
		});

		// Scene 4 - trigger the right animation on the way DOWN
		triggersUp.forEach((triggerUp) => {

			let triggerTransitionToPrev = new ScrollMagic.Scene({
				triggerElement: triggerUp,
				triggerHook: 0.49
			});

			triggerTransitionToPrev
				.on('leave', (e) => {
					// console.log('crossfade to previous ' + triggerUp);
					// let $slideOut = $('.slide.active'),
					// 	slideIndex = triggerUp.substring(6, 8),
					// 	$slideIn = $('#slide' + slideIndex),
					// 	direction = e.scrollDirection;

					// console.log(e.scrollDirection);

					// crossFade($slideOut, $slideIn, direction, slideIndex);
				})
				// .addIndicators({
				// 	name: 'triggerUp',
				// 	indent: 110,
				// 	colorStart: 'red',
				// 	colorTrigger: 'red'
				// })
				.addTo(controller);
		});

		function initPage() {
			setTimeout(() => {
				// Prevents body from flickering
				// TweenMax.set($body, { autoAlpha: 1 });

				// Animate first slide in
				animationIn($slideIn);
			}, 500);
		}

		initPage();


		function crossFade($slideOut, $slideIn, direction, slideIndex) {

		}

		// Animate slide IN
		function animationIn($slideIn) {

			splash.init($slideIn);
		}

    }

};
