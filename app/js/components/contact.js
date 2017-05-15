import $ from 'jquery';
import { TimelineMax, TweenLite } from 'gsap';
import enquire from 'enquire.js';
import breakpoints from '../breakpoints';
// import getScale from '../utils/getScale';

const mainTl = new TimelineMax();

let blockScale;
let lineScale;

export default class Contact {

    init() {
		this.panel = $('.contact');

		this.ellipseBeigeLeft = this.panel.find('.contact__ellipsebeige--left');
		this.ellipseBeigeRight = this.panel.find('.contact__ellipsebeige--right');

		this.ellipseCornerLeft = this.panel.find('.contact__ellipsecorner--left');
		this.ellipseCornerRight = this.panel.find('.contact__ellipsecorner--right');

		this.contentBkgnd = this.panel.find('.contact__content__bkgnd');
		this.contentFrgnd = this.panel.find('.contact__content__frgnd');
		this.contentCopy = this.panel.find('.contact__content__copy');

		this.radialBlocks = this.panel.find('.contact__svg__radials--blocks');
		this.radialLines = this.panel.find('.contact__svg__radials--lines');

		this.checkBreakpoint();
    }

	checkBreakpoint() {
		enquire
			.register(`screen and (min-width: ${breakpoints.minLarge})`, {
				match: () => {
					// console.log('large > 1024+');
					this.desktopTl();
				},
				unmatch: () => {
					location.reload();
				}
			});
	}

	desktopTl() {
		// let blockScale = getScale(this.radialBlocks),
		// 	lineScale = getScale(this.radialLines);
		this.getScaleValues();

		mainTl
			.set(this.panel, { autoAlpha: 1 })
			.add('beigeEllipseIn')
			.fromTo(this.ellipseBeigeLeft, 0.5,
				{ scale: 0, transformOrigin: 'center center' },
				{ scale: 1, autoAlpha: 1, ease: Power4.easeInOut }, 'beigeEllipseIn')
			.fromTo(this.ellipseBeigeRight, 0.5,
				{ scale: 0, transformOrigin: 'center center' },
				{ scale: 1, autoAlpha: 1, ease: Power4.easeInOut }, 'beigeEllipseIn')

			.fromTo(this.contentBkgnd, 0.5,
				{ scale: 0, transformOrigin: 'center bottom' },
				{ scale: 1, autoAlpha: 1, ease: Power4.easeInOut, clearProps: 'scale' }, '-=0.15')

			.add('cornerEllipseIn')
			.fromTo(this.ellipseCornerLeft, 0.5,
				{ scale: 0, transformOrigin: 'center center' },
				{ scale: 1, autoAlpha: 1, ease: Power4.easeInOut }, 'cornerEllipseIn')
			.fromTo(this.ellipseCornerRight, 0.5,
				{ scale: 0, transformOrigin: 'center center' },
				{ scale: 1, autoAlpha: 1, ease: Power4.easeInOut }, 'cornerEllipseIn')

			.fromTo(this.contentFrgnd, 0.5,
				{ scale: 0, transformOrigin: 'center bottom' },
				{ scale: 1, autoAlpha: 1, ease: Power4.easeInOut, clearProps: 'scale' })
			.to(this.contentCopy, 0.5, { autoAlpha: 1, ease: Power4.easeInOut })

			.add('blocksIn')
			.fromTo(this.radialBlocks, 1.5,
				{ scale: 0, transformOrigin: '50% 50%', rotation: 360 },
				{ scale: blockScale, autoAlpha: 1, rotation: 0, ease: Power4.easeOut }, 'cornerEllipseIn+=0.75')
			.fromTo(this.radialLines, 1.5,
				{ scale: 0, transformOrigin: '50% 50%', rotation: -360 },
				{ scale: lineScale, autoAlpha: 1, rotation: 0, ease: Power4.easeOut }, 'cornerEllipseIn+=1.5')
		;

		mainTl.pause();
	}

	getScaleValues() {
		enquire
			.register(`screen and (min-width: ${breakpoints.minLarge})`, () => {
				// console.log('1024px');
				blockScale = 1.1;
				lineScale = 1.1;
			})
			.register(`screen and (min-width: ${breakpoints.minXLarge})`, () => {
				// console.log('1200px');
				blockScale = 1.055;
				lineScale = 1.06;
			})
			.register(`screen and (min-width: ${breakpoints.minXXLarge})`, () => {
				// console.log('1440px');
				blockScale = 0.825;
				lineScale = 0.825;
			});
	}

	playTl() {
		mainTl.play();
	}

	resetTl() {
		mainTl.pause(0, true);
	}

    formHandler() {
		const form = $('#contactForm');
		const url = 'https://www.enformed.io/x99zq8be';
		const proxy = 'https://cors-anywhere.herokuapp.com/';

        form.submit(function (e) {
			e.preventDefault();

			$.ajax({
				url: proxy + url,
				method: 'post',
				dataType: 'json',
				accepts: 'application/json',
				data: $(this).serialize(),
				success() {
					// console.log('Your form was successfully received!');
					TweenLite.to($('.contact__content__form__success'), 0.5, { autoAlpha: 1 });
				},
				error() {
					// console.log('Failure. Try again.');
					// TweenLite.to($('.contact__content__form__error'), 0.5, { autoAlpha: 1 });
					TweenLite.to($('.contact__content__form__success'), 0.5, { autoAlpha: 1 });
				}
			});
		});
    }
}
