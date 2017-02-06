import $ from 'jquery';
import { TimelineMax } from 'gsap';
import enquire from 'enquire.js';
import breakpoints from '../breakpoints';

let mobileTl = new TimelineMax();
let desktopTl = new TimelineMax();

export default class About {

    init() {
		this.panel = $('.about');

		this.dotsSmall = this.panel.find('.about__svg__dots--small__dot');
		this.dotsLarge = this.panel.find('.about__svg__dots--large__dot');

		this.linesBottom = this.panel.find('.about__svg__lines--bottom__line');
		this.linesLeft = this.panel.find('.about__svg__lines--left__line');

		this.ellipseBkgndTop = this.panel.find('.about__ellipsebkgnd--top');
		this.ellipseBkgndBottom = this.panel.find('.about__ellipsebkgnd--bottom');

		this.rectLight = this.panel.find('.about__rect--light');
		this.rectMid = this.panel.find('.about__rect--mid');
		this.content = this.panel.find('.about__content');
		this.contentHolder = this.panel.find('.about__content__holder');

		this.checkBreakpoint();
    }

	checkBreakpoint() {
		enquire
			.register(`screen and (max-width: ${breakpoints.maxSmall})`, {
				match: () => {
					// console.log('medium < 640');
					this.mobileTL();
				}
			})
			.register(`screen and (min-width: ${breakpoints.minMedium})`, {
			    match: () => {
					// console.log('large > 641');
					this.desktopTl();
			    }
			});
	}

	mobileTL() {

		mobileTl
			.set(this.panel, { autoAlpha: 1 })
			.add('panelsIn')
			.fromTo(this.rectMid, 0.5, { scaleX: 0, transformOrigin: 'center center' }, { scaleX: 1, autoAlpha: 1, ease: Power4.easeInOut }, '-=0.25')
			.fromTo(this.content, 0.75, { scaleY: 0, transformOrigin: 'center top' }, { scaleY: 1, autoAlpha: 1, ease: Power4.easeInOut }, '-=0.25')
			.to(this.contentHolder, 0.75, { autoAlpha: 1, ease: Power4.easeInOut }, '-=0.25')

			.add('linesIn')
			.staggerFromTo(this.linesLeft, 0.5, { scaleY: 0, transformOrigin: 'center top' }, { scaleY: 1, autoAlpha: 1, ease: Elastic.easeOut.config(1.75, 0.3) }, 0.02, 'panelsIn')
			.staggerFromTo(this.linesBottom, 0.5, { scaleY: 0, transformOrigin: 'center top' }, { scaleY: 1, autoAlpha: 1, ease: Elastic.easeOut.config(1.75, 0.3) }, 0.02, 'panelsIn')
		;
	}

	desktopTl() {

		desktopTl
			.set(this.panel, { autoAlpha: 1 })
			.add('ellipsesIn')
			.fromTo(this.ellipseBkgndTop, 0.5, { scale: 0, transformOrigin: 'center center' }, { scale: 1, autoAlpha: 0.5, ease: Power4.easeInOut })
			.fromTo(this.ellipseBkgndBottom, 0.5, { scale: 0, transformOrigin: 'center center' }, { scale: 1, autoAlpha: 1, ease: Power4.easeInOut }, '-=0.25')

			.add('panelsIn')
			.fromTo(this.rectLight, 0.5, { scaleX: 0, transformOrigin: 'center center' }, { scaleX: 1, autoAlpha: 1, ease: Power4.easeInOut })
			.fromTo(this.rectMid, 0.5, { scaleX: 0, transformOrigin: 'center center' }, { scaleX: 1, autoAlpha: 1, ease: Power4.easeInOut }, '-=0.25')
			.fromTo(this.content, 0.75, { scaleY: 0, transformOrigin: 'center top' }, { scaleY: 1, autoAlpha: 1, ease: Power4.easeInOut }, '-=0.25')
			.to(this.contentHolder, 0.75, { autoAlpha: 1, ease: Power4.easeInOut }, '-=0.25')

			.add('linesIn')
			.staggerFromTo(this.linesLeft, 0.5, { scaleY: 0, transformOrigin: 'center top' }, { scaleY: 1, autoAlpha: 1, ease: Elastic.easeOut.config(1.75, 0.3) }, 0.02, 'panelsIn')
			.staggerFromTo(this.linesBottom, 0.5, { scaleY: 0, transformOrigin: 'center top' }, { scaleY: 1, autoAlpha: 1, ease: Elastic.easeOut.config(1.75, 0.3) }, 0.02, 'panelsIn')

			.add('dotsIn')
			.staggerFromTo(this.dotsSmall, 0.5, { scale: 0, transformOrigin: 'center top' }, { scale: 1, autoAlpha: 1, ease: Power4.easeInOut }, 0.02, 'panelsIn+=0.5')
			.staggerFromTo(this.dotsLarge, 0.4, { scale: 0, transformOrigin: 'center top' }, { scale: 1, autoAlpha: 1, ease: Power4.easeInOut }, 0.02, 'panelsIn+=0.5')
		;

		desktopTl.pause();
	}

	playTl() {
		desktopTl.play();
	}

	resetTl() {
		desktopTl.pause(0, true);
	}
}
