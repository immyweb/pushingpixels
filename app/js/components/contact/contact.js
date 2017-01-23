import { TimelineMax } from 'gsap';
import enquire from 'enquire.js';
import breakpoints from '../../breakpoints';

export default class Contact {

    init(element) {
		this.panel = element;

		this.ellipseBeigeLeft = this.panel.find('.contact__ellipsebeige--left');
		this.ellipseBeigeRight = this.panel.find('.contact__ellipsebeige--right');

		this.ellipseCornerLeft = this.panel.find('.contact__ellipsecorner--left');
		this.ellipseCornerRight = this.panel.find('.contact__ellipsecorner--right');

		this.contentBkgnd = this.panel.find('.contact__content__bkgnd');
		this.contentFrgnd = this.panel.find('.contact__content__frgnd');
		this.contentCopy = this.panel.find('.contact__content__copy');

		this.radialBlocksLeft = this.panel.find('.contact__svg__radials--blocks__left');
		this.radialBlocksRight = this.panel.find('.contact__svg__radials--blocks__right');

		this.radialLinesLeft = this.panel.find('.contact__svg__radials--lines__left');
		this.radialLinesRight = this.panel.find('.contact__svg__radials--lines__right');

		this.dotsLarge = this.panel.find('.contact__svg__dots--large');
		this.dotsSmall = this.panel.find('.contact__svg__dots--small');

		this.checkBreakpoint();
    }

	checkBreakpoint() {
		enquire
			.register(`screen and (max-width: ${breakpoints.maxSmall})`, {
				match: () => {
					// console.log('small to medium < 640');
					// this.mobileTL();
				}
			})
			.register(`screen and (min-width: ${breakpoints.minMedium}) and (max-width: ${breakpoints.maxMedium})`, {
			    match: () => {
					// console.log('medium to large > 641 - 1023');
					this.desktopTl();
			    }
			})
			.register(`screen and (min-width: ${breakpoints.minLarge})`, {
			    match: () => {
					// console.log('large > 1024+');
					this.desktopTl();
			    }
			});
	}

	reverseLinesAnimTl() {
		const tlReverseBlocks = new TimelineMax();

		for ( let i = this.radialLinesLeft.length-1; i >= 0; i-- ) {
			tlReverseBlocks.fromTo(this.radialLinesLeft[i], 0.02, { scaleX: 0, transformOrigin: 'center bottom' }, { scaleX: 1, autoAlpha: 1, ease: Elastic.easeOut.config(1.75, 0.3) });
		}

		return tlReverseBlocks;
	}

	reverseBlocksAnimTl() {
		const tlReverseBlocks = new TimelineMax();

		for ( let i = this.radialBlocksLeft.length-1; i >= 0; i-- ) {
			tlReverseBlocks.fromTo(this.radialBlocksLeft[i], 0.05, { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, autoAlpha: 1, ease: Power4.easeInOut });
		}

		return tlReverseBlocks;
	}

	desktopTl() {
		const desktopTl = new TimelineMax();

		desktopTl
			// .add('beigeEllipseIn')
			// .fromTo(this.ellipseBeigeLeft, 0.5, { scale: 0, transformOrigin: 'center center' }, { scale: 1, autoAlpha: 1, ease: Power4.easeInOut }, 'beigeEllipseIn')
			// .fromTo(this.ellipseBeigeRight, 0.5, { scale: 0, transformOrigin: 'center center' }, { scale: 1, autoAlpha: 1, ease: Power4.easeInOut }, 'beigeEllipseIn')
			//
			// .fromTo(this.contentBkgnd, 0.5, { scale: 0, transformOrigin: 'center bottom' }, { scale: 1, autoAlpha: 1, ease: Power4.easeInOut }, '-=0.15')
			//
			// .add('cornerEllipseIn')
			// .fromTo(this.ellipseCornerLeft, 0.5, { scale: 0, transformOrigin: 'center center' }, { scale: 1, autoAlpha: 1, ease: Power4.easeInOut }, 'cornerEllipseIn')
			// .fromTo(this.ellipseCornerRight, 0.5, { scale: 0, transformOrigin: 'center center' }, { scale: 1, autoAlpha: 1, ease: Power4.easeInOut }, 'cornerEllipseIn')
			//
			// .fromTo(this.contentFrgnd, 0.5, { scale: 0, transformOrigin: 'center bottom' }, { scale: 1, autoAlpha: 1, ease: Power4.easeInOut })
			// .to(this.contentCopy, 0.5, { autoAlpha: 1, ease: Power4.easeInOut })

			.add('blocksIn')
			.add(this.reverseBlocksAnimTl(), 'blocksIn')
			.staggerFromTo(this.radialBlocksRight, 0.5, { scaleY: 0, transformOrigin: 'center bottom' }, { scaleY: 1, autoAlpha: 1, ease: Power4.easeInOut }, 0.05, 'blocksIn')

			.add('linesIn')
			// .add(this.reverseLinesAnimTl(), 'blocksIn+=0.25')
			// .staggerFromTo(this.radialLinesRight, 0.5, { scaleX: 0, transformOrigin: 'center bottom' }, { scaleX: 1, autoAlpha: 1, ease: Elastic.easeOut.config(1.75, 0.3) }, 0.02, 'blocksIn+=0.25')
		;
	}
}
