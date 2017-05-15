import $ from 'jquery';
import { TweenMax, TimelineMax } from 'gsap';
import 'gsap/src/uncompressed/plugins/ScrollToPlugin.js';
import ScrollMagic from 'scrollmagic';
import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
// import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
import 'scrollmagic/scrollmagic/uncompressed/plugins/jquery.ScrollMagic.js';
import enquire from 'enquire.js';
import breakpoints from './breakpoints';

import Splash from './components/splash';
import About from './components/about';
import Contact from './components/contact';
import Gallery from './components/gallery';
import Modal from './components/gallery-modal';

const splash = new Splash();
const about = new About();
const gallery = new Gallery();
const contact = new Contact();
const modal = new Modal();

let controller;
const $navItems = $('.nav__items li').not('.nav__item--active');
const $navTrigger = $('.nav-trigger');
const $navItemLink = $('.nav__items a');
const getTriggersDown = $('.slide-pos');
const triggersDown = [];
const getTriggersUp = $('.slide-pos--reverse');
const triggersUp = [];
const $slide = $('.slide');
const $otherSlides = $('.slide').not('#slide01');
const $main = $('#main');
const galleryLinks = $('.gallery__content__item');
const galleryModal = $('.gallery-modal');
const galleryModalClose = galleryModal.find('.gallery-modal__close');
const $body = $('body');

const navTl = new TimelineMax();

export default class OnePager {

	checkBreakpoint() {
		enquire
			.register(`screen and (min-width: ${breakpoints.minLarge})`, {
                match: () => {
                    this.init();
                }
			});

		contact.formHandler();
	}

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

		this.navHandler();

		this.galleryHandler();

		this.closeModal();
    }

    initSlides() {
        splash.init();
		about.init();
        gallery.init();
        contact.init();
		modal.init();
    }

    getTriggers() {
        // Triggers on the way down
		$.each(getTriggersDown, (key, value) => {
			const id = `#${value.id}`;
			triggersDown.push(id);
		});

		// Triggers on the way up
		$.each(getTriggersUp, (key, value) => {
			const id = `#${value.id}`;
			triggersUp.push(id);
		});
    }

    createController() {
        // Create controller
		controller = new ScrollMagic.Controller();
    }

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
    }

    navTl() {
        // Navigation timeline
		$navItems.each((index, item) => {
			const slideHREF = $(item).find('a').attr('href');
			const slideID = slideHREF.substr(slideHREF.length - 7);
			const moveNav = TweenMax.to($('.nav__active'), 1, { y: '+=26', ease: Linear.easeNone });

			// Add individual tweens to the timeline
			navTl.add(moveNav, slideID);
		});
    }

    navScene() {
        // Scene 2 - move navigation
		const navScene = new ScrollMagic.Scene({
			triggerElement: $navTrigger,
			duration: '300%',
			triggerHook: 1
		});

		navScene
			.setTween(navTl)
			.addTo(controller);
    }

    triggersDown() {
        // Scene 3 - trigger the right animation on the way DOWN
		triggersDown.forEach((triggerDown) => {
			const triggerTransitionToNext = new ScrollMagic.Scene({
				triggerElement: triggerDown,
				triggerHook: 0.6
			});

			triggerTransitionToNext
				.on('enter', (e) => {
					// console.log('crossfade to next ' + triggerDown);

					const $slideOut = $('.slide.active');
					const slideIndex = triggerDown.substring(6, 8);
					const $slideIn = $(`#slide${slideIndex}`);
					const direction = e.scrollDirection;

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
    }

    triggersUp() {
        // Scene 4 - trigger the right animation on the way UP
		triggersUp.forEach((triggerUp) => {
			const triggerTransitionToPrev = new ScrollMagic.Scene({
				triggerElement: triggerUp,
				triggerHook: 0.49
			});

			triggerTransitionToPrev
				.on('leave', (e) => {
					// console.log('crossfade to previous ' + triggerUp);

					const $slideOut = $('.slide.active');
					const slideIndex = triggerUp.substring(6, 8);
					const $slideIn = $(`#slide${slideIndex}`);
					const direction = e.scrollDirection;

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
    }

    initPage() {
        this.animationIn();
    }

    // Animate slide IN
    animationIn() {
        TweenMax.set($otherSlides, { autoAlpha: 0 });

        splash.playTl();
    }

    crossFade($slideOut, $slideIn, direction, slideIndex) {
        const slideOutID = $slideOut.attr('id').substring(5, 7);
        const slideInID = $slideIn.attr('id').substring(5, 7);

        // Update nav
        this.updateNav(slideOutID, slideInID);

        // remove class active from all slides
        TweenMax.set($slide, { className: '-=active', display: 'none' });

        // add class active to current slide
        TweenMax.set($(`#slide${slideIndex}`), { className: '+=active', display: 'block' });

        // cross fade timeline
        const crossFadeTl = new TimelineMax();

        crossFadeTl
            .set($main, { className: `slide${slideInID}-active` })
            .to($slideOut, 0.25,
				{ autoAlpha: 0, onComplete: this.hideOldSlide, onCompleteParams: [slideOutID] })
            .set($slideIn,
				{ autoAlpha: 1, onComplete: this.showNewSlide, onCompleteParams: [$slideIn, slideInID] })
        ;
    }

    updateNav(slideOutID, slideInID) {
        // remove active class from all dots
        $('.nav__items li').removeClass('nav__item--active');

        // Add active class to the new active slide
        TweenMax.set($(`.nav__items li.nav__item${slideInID}`), { className: '+=nav__item--active' });
    }

	showNewSlide($slideIn, slideInID) {
		if (slideInID === '01') {
			splash.playTl();
		}
		if (slideInID === '02') {
			about.playTl();
		}
		if (slideInID === '03') {
			gallery.playTl();
		}
		if (slideInID === '04') {
			contact.playTl();
		}
	}

	hideOldSlide(slideOutID) {
		if (slideOutID === '01') {
			splash.resetTl();
		}
		if (slideOutID === '02') {
			about.resetTl();
		}
		if (slideOutID === '03') {
			gallery.resetTl();
		}
		if (slideOutID === '04') {
			contact.resetTl();
		}
	}

	navHandler() {
		$navItemLink.on('click', (e) => {
			// Scroll to the right position
			const slideInIndex = $(e.target).attr('href').substring(6, 8);
			const offset = $(`div#slide${slideInIndex}-pos`).offset().top;
			const wH = window.innerHeight;
			const finalOffset = offset - (wH * 0.4);

			TweenMax.to(window, 0.7, { scrollTo: finalOffset, ease: Power4.easeOut });

			e.preventDefault();
		});
	}

	galleryHandler() {
		const self = this;

		galleryLinks.on('click', function (e) {
			const galleryIndex = $(this).data('model-url').substring(1, 10);

			// disable body scrolling
			controller.enabled(false);
			controller.update(true);

			// add body class
			TweenMax.set($body, { className: '+=modal-open' });

			self.modalContentUpdate(galleryIndex);

			e.preventDefault();
		});
	}

	modalContentUpdate(galleryIndex) {
		const modalHeading = galleryModal.find('[data-modal-heading]');
		const modalCopy1 = galleryModal.find('[data-modal-copy1]');
		const modalCopy2 = galleryModal.find('[data-modal-copy2]');
		const modalImage1 = galleryModal.find('[data-modal-image1] img');
		const modalImage2 = galleryModal.find('[data-modal-image2] img');

		$.getJSON('/data/data.json', (data) => {
			modalHeading.text(data.modal[galleryIndex].heading);
			modalCopy1.text(data.modal[galleryIndex].copy1);
			modalCopy2.text(data.modal[galleryIndex].copy2);
			modalImage1.attr('src', data.modal[galleryIndex].image1);
			modalImage2.attr('src', data.modal[galleryIndex].image2);
			modalImage1.attr('alt', data.modal[galleryIndex].image1Alt);
			modalImage2.attr('alt', data.modal[galleryIndex].image2Alt);

			TweenMax.set($slide, { autoAlpha: 0 });
			TweenMax.set(galleryModal, { display: 'block', autoAlpha: 1 });
			modal.playTl();
		});
	}

	closeModal() {
		galleryModalClose.on('click', (e) => {
			controller.enabled(true);
			controller.update(true);

			modal.closeModal();
			modal.resetTl();

			TweenMax.set($body, { className: '-=modal-open' });

			TweenMax.set($('.gallery'), { autoAlpha: 1 });

			e.preventDefault();
		});
	}
}
