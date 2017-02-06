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

let splash = new Splash(),
    about = new About(),
    gallery = new Gallery(),
    contact = new Contact();

let controller,
    $navItems = $('.nav__items li').not('.nav__item--active'),
    $navTrigger = $('.nav-trigger'),
    getTriggersDown = $('.slide-pos'),
    triggersDown = [],
    getTriggersUp = $('.slide-pos--reverse'),
    triggersUp = [],
    $slideIn = $('.slide.active'),
    $slide = $('.slide'),
    $main = $('#main');

let navTl = new TimelineMax();

export default {

    init() {

		this.initSlides();

        this.getTriggers();

        this.createController();

        this.sceneOne();

        this.navTl();

        this.navScene();

        this.triggersDown();

        this.triggersUp();

		this.initPage();

    },

    initSlides() {
        splash.init();
		about.init();
        gallery.init();
        contact.init();
    },

    getTriggers() {
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
    },

    createController() {
        // Create controller
		controller = new ScrollMagic.Controller();
    },

    sceneOne() {
        // Scene 1 - pin our main section
		const pinScene01 = new ScrollMagic.Scene({
			triggerElement: '#main',
			triggerHook: 0,
			duration: '400%'
		});

		pinScene01
			.setPin('#main .pin-wrapper', { pushFollowers: false })
			.addTo(controller);
    },

    navTl() {
        // Navigation timeline
		$navItems.each((index, item) => {
			let slideHREF = $(item).find('a').attr('href'),
				slideID = slideHREF.substr(slideHREF.length -7),
				moveNav = TweenMax.to($('.nav__active'), 1, { y: '+=34.5', ease: Linear.easeNone });

			// Add individual tweens to the timeline
			navTl.add(moveNav, slideID);
		});
    },

    navScene() {
        // Scene 2 - move navigation
		const navScene = new ScrollMagic.Scene({
			triggerElement: $navTrigger,
			duration: '400%'
		});

		navScene
			.setTween(navTl)
			.addTo(controller);
    },

    triggersDown() {
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

					this.crossFade($slideOut, $slideIn, direction, slideIndex);
				})
				// .addIndicators({
				// 	name: 'triggerDown',
				// 	indent: 520,
				// 	colorStart: 'yellow',
				// 	colorTrigger: 'yellow'
				// })
				.addTo(controller);
		});
    },

    triggersUp() {
        // Scene 4 - trigger the right animation on the way UP
		triggersUp.forEach((triggerUp) => {

			let triggerTransitionToPrev = new ScrollMagic.Scene({
				triggerElement: triggerUp,
				triggerHook: 0.49
			});

			triggerTransitionToPrev
				.on('leave', (e) => {
					// console.log('crossfade to previous ' + triggerUp);

					let $slideOut = $('.slide.active'),
						slideIndex = triggerUp.substring(6, 8),
						$slideIn = $('#slide' + slideIndex),
						direction = e.scrollDirection;

					// console.log(e.scrollDirection);

					this.crossFade($slideOut, $slideIn, direction, slideIndex);
				})
				// .addIndicators({
				// 	name: 'triggerUp',
				// 	indent: 110,
				// 	colorStart: 'red',
				// 	colorTrigger: 'red'
				// })
				.addTo(controller);
		});
    },

    initPage() {
        setTimeout(() => {
            // Prevents body from flickering
            // TweenMax.set($body, { autoAlpha: 1 });

            // Animate first slide in
            this.animationIn($slideIn);
        }, 500);
    },

    // Animate slide IN
    animationIn($slideIn) {

        TweenMax.set($slide, { autoAlpha: 0 });

        splash.playTl();
    },

    crossFade($slideOut, $slideIn, direction, slideIndex) {
        let slideOutID = $slideOut.attr('id').substring(5, 7),
            slideInID = $slideIn.attr('id').substring(5, 7);

        // Update nav
        this.updateNav(slideOutID, slideInID);

        // remove class active from all slides
        TweenMax.set($slide, { className: '-=active', display: 'none' });

        // add class active to current slide
        TweenMax.set($('#slide' + slideIndex), { className: '+=active', display: 'block' });

        // cross fade timeline
        const crossFadeTl = new TimelineMax();

        crossFadeTl
            .set($main, { className: 'slide' + slideInID + '-active' })
            .to($slideOut, 0.25, { autoAlpha: 0, onComplete: this.hideOldSlide, onCompleteParams: [ slideOutID] })
            .set($slideIn, { autoAlpha: 1, onComplete: this.showNewSlide, onCompleteParams: [$slideIn, slideInID] })
        ;
    },

    updateNav(slideOutID, slideInID) {
        // remove active class from all dots
        $('.nav__items li').removeClass('nav__item--active');

        // Add active class to the new active slide
        TweenMax.set($('.nav__items li.nav__item' + slideInID), { className: '+=nav__item--active' });
    },

	showNewSlide($slideIn, slideInID) {

		if ( slideInID === '01' ) {
			splash.playTl()
		}
		if ( slideInID === '02' ) {
			about.playTl()
		}
		if ( slideInID === '03' ) {
			gallery.playTl()
		}
		if ( slideInID === '04' ) {
			contact.playTl()
		}
	},

	hideOldSlide(slideOutID) {

		if ( slideOutID === '01' ) {
			splash.resetTl()
		}
		if ( slideOutID === '02' ) {
			about.resetTl()
		}
		if ( slideOutID === '03' ) {
			gallery.resetTl()
		}
		if ( slideOutID === '04' ) {
			contact.resetTl()
		}
	}

};
