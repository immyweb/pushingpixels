import { TimelineMax } from 'gsap';
import enquire from 'enquire.js';
import breakpoints from '../../breakpoints';
import getScale from '../../utils/getScale';

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

		this.radialBlocks = this.panel.find('.contact__svg__radials--blocks');

		this.radialLines = this.panel.find('.contact__svg__radials--lines');

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

	desktopTl() {

		let blockScale = getScale(this.radialBlocks),
			lineScale = getScale(this.radialLines);

		const desktopTl = new TimelineMax();

		desktopTl
			.add('beigeEllipseIn')
			.fromTo(this.ellipseBeigeLeft, 0.5, { scale: 0, transformOrigin: 'center center' }, { scale: 1, autoAlpha: 1, ease: Power4.easeInOut }, 'beigeEllipseIn')
			.fromTo(this.ellipseBeigeRight, 0.5, { scale: 0, transformOrigin: 'center center' }, { scale: 1, autoAlpha: 1, ease: Power4.easeInOut }, 'beigeEllipseIn')

			.fromTo(this.contentBkgnd, 0.5, { scale: 0, transformOrigin: 'center bottom' }, { scale: 1, autoAlpha: 1, ease: Power4.easeInOut }, '-=0.15')

			.add('cornerEllipseIn')
			.fromTo(this.ellipseCornerLeft, 0.5, { scale: 0, transformOrigin: 'center center' }, { scale: 1, autoAlpha: 1, ease: Power4.easeInOut }, 'cornerEllipseIn')
			.fromTo(this.ellipseCornerRight, 0.5, { scale: 0, transformOrigin: 'center center' }, { scale: 1, autoAlpha: 1, ease: Power4.easeInOut }, 'cornerEllipseIn')

			.fromTo(this.contentFrgnd, 0.5, { scale: 0, transformOrigin: 'center bottom' }, { scale: 1, autoAlpha: 1, ease: Power4.easeInOut })
			.to(this.contentCopy, 0.5, { autoAlpha: 1, ease: Power4.easeInOut })

			.add('blocksIn')
			.fromTo(this.radialBlocks, 0.5, { scale: 0, transformOrigin: '50% 100%' }, { scale: blockScale, autoAlpha: 1, ease: Back.easeOut.config(1.4) }, 'cornerEllipseIn+=0.75')
			.fromTo(this.radialLines, 0.5, { scale: 0, transformOrigin: '50% 100%' }, { scale: lineScale, autoAlpha: 1, ease: Back.easeOut.config(1.4) }, 'cornerEllipseIn+=1.25')
		;
	}
}
