import $ from 'jquery';
import { TimelineMax } from 'gsap';
import enquire from 'enquire.js';
import breakpoints from '../breakpoints';

let desktopTl = new TimelineMax();

export default class Splash {

    init() {
		this.panel = $('.splash');

		this.dotsSmallGroup = this.panel.find('.splash__dots__small');
		this.dotsLargeGroup = this.panel.find('.splash__dots__large');
		this.dotsSmall = this.dotsSmallGroup.find('.splash__dots__small__dot');
		this.dotsLarge = this.dotsLargeGroup.find('.splash__dots__large__dot');

		this.cornerCircle = this.panel.find('.splash__corner-circle');

		this.smRadialContainer = this.panel.find('.splash__sm-radial');
		this.smRadialOuter = this.panel.find('.splash__sm-radial__outer');
		this.smRadialInner = this.panel.find('.splash__sm-radial__inner');
		this.smRadialBlocks = this.panel.find('.splash__sm-radial__blocks');
		this.smRadialLines = this.panel.find('.splash__sm-radial__lines');

		this.lrgRadialContainer = this.panel.find('.splash__lrg-radial');
		this.lrgRadialLines = this.panel.find('.splash__lrg-radial__lines');
		this.lrgRadialOuter = this.panel.find('.splash__lrg-radial__outer');
		this.lrgRadialBlocks = this.panel.find('.splash__lrg-radial__blocks');
		this.lrgRadialInner = this.panel.find('.splash__lrg-radial__inner');

		this.heading = this.panel.find('.splash__heading');

		this.checkBreakpoint();
    }

	checkBreakpoint() {
		enquire
			.register(`screen and (min-width: ${breakpoints.minXLarge})`, {
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

		desktopTl
			.set(this.panel, { autoAlpha: 1 })
			.add('ellipsesIn')
			.fromTo(this.smRadialOuter, 0.5, { scale: 0, transformOrigin: 'center center' }, { scale: 1, autoAlpha: 1, ease: Power4.easeInOut })
			.fromTo(this.lrgRadialOuter, 0.5, { scale: 0, transformOrigin: 'center center' }, { scale: 1, autoAlpha: 1, ease: Power4.easeInOut }, '-=0.25')
			.fromTo(this.cornerCircle, 0.5, { scale: 0, transformOrigin: 'center center' }, { scale: 1, autoAlpha: 1, ease: Power4.easeInOut }, '-=0.25')
			.fromTo(this.smRadialInner, 0.5, { scale: 0, transformOrigin: 'center center' }, { scale: 1, autoAlpha: 1, ease: Power4.easeInOut, clearProps: 'scale' }, '-=0.25')
			.fromTo(this.lrgRadialInner, 0.5, { scale: 0, transformOrigin: 'center center' }, { scale: 1, autoAlpha: 1, ease: Power4.easeInOut, clearProps: 'scale' }, '-=0.25')

			.add('blocksIn')
			.fromTo(this.smRadialBlocks, 0.5, { scale: 0, transformOrigin: '49% 49%' }, { scale: 0.59, autoAlpha: 0.6, ease: Elastic.easeOut.config(1, 0.4) })
			.fromTo(this.lrgRadialBlocks, 0.5, { scale: 0, transformOrigin: '54% 54%' }, { scale: 0.82, autoAlpha: 0.65, ease: Elastic.easeOut.config(1, 0.4) }, '-=0.25')

			.add('linesIn')
			.fromTo(this.smRadialLines, 1.5, { scale: 0, transformOrigin: '56% 50%', rotation: 360 }, { scale: 0.7, autoAlpha: 1, rotation: 0, ease: Power4.easeOut }, 'blocksIn-=0.25')
			.fromTo(this.lrgRadialLines, 1.5, { scale: 0, transformOrigin: '47% 47%', rotation: 360 }, { scale: 0.87, autoAlpha: 1, rotation: 0, ease: Power4.easeOut }, 'blocksIn-=0.35')

			.add('dotsIn')
			.staggerTo(this.dotsSmall, 1, { autoAlpha: 1, ease: Power4.easeOut }, 0.05, 'blocksIn')
			.staggerTo(this.dotsLarge, 1, { autoAlpha: 1, ease: Power4.easeOut }, 0.05, 'blocksIn')

			.add('titleIn')
			.fromTo(this.heading, 1, { y: '+=50' }, { y: '-=50', autoAlpha: 1 }, 'linesIn-=0.5')
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
