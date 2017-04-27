import $ from 'jquery';
import { TimelineMax } from 'gsap';
import enquire from 'enquire.js';
import breakpoints from '../breakpoints';

let mainTl = new TimelineMax();

export default class Gallery {

    init() {
		this.panel = $('.gallery');

		this.contentBkgnd = this.panel.find('.gallery__content__bkgnd');
		this.contentFrgnd = this.panel.find('.gallery__content__frgnd');
		this.contentInner = this.panel.find('.gallery__content__inner');
		this.contentGallery = this.panel.find('.gallery__content__list');

		this.blocksTopLeft = this.panel.find('.gallery__svg__blocks--top__left');
		this.blocksTopRight = this.panel.find('.gallery__svg__blocks--top__right');
		this.blocksBottomLeft = this.panel.find('.gallery__svg__blocks--bottom__left');
		this.blocksBottomRight = this.panel.find('.gallery__svg__blocks--bottom__right');

		this.linesTopLeft = this.panel.find('.gallery__svg__lines--top__left');
		this.linesTopRight = this.panel.find('.gallery__svg__lines--top__right');
		this.linesBottomLeft = this.panel.find('.gallery__svg__lines--bottom__left');
		this.linesBottomRight = this.panel.find('.gallery__svg__lines--bottom__right');

		this.checkBreakpoint();
    }

	checkBreakpoint() {
		enquire
			.register(`screen and (min-width: ${breakpoints.minLarge})`, {
			    match: () => {
					// console.log('large > 641');
					this.mainTl();
			    },
				unmatch: () => {
					location.reload();
				}
			});
	}

	reverseLinesTopAnimTl() {
		const tlReverseLines = new TimelineMax();

		for ( let i = this.linesTopLeft.length-1; i >= 0; i-- ) {
			tlReverseLines.fromTo(this.linesTopLeft[i], 0.02, { scaleY: 0, transformOrigin: 'center bottom' }, { scaleY: 1, autoAlpha: 1, ease: Elastic.easeOut.config(1.75, 0.3) });
		}

		return tlReverseLines;
	}

	reverseLinesBottomAnimTl() {
		const tlReverseLines = new TimelineMax();

		for ( let i = this.linesBottomLeft.length-1; i >= 0; i-- ) {
			tlReverseLines.fromTo(this.linesBottomLeft[i], 0.02, { scaleY: 0, transformOrigin: 'center bottom' }, { scaleY: 1, autoAlpha: 1, ease: Elastic.easeOut.config(1.75, 0.3) });
		}

		return tlReverseLines;
	}

	reverseBlocksTopAnimTl() {
		const tlReverseBlocks = new TimelineMax();

		for ( let i = this.blocksTopLeft.length-1; i >= 0; i-- ) {
			tlReverseBlocks.fromTo(this.blocksTopLeft[i], 0.05, { scaleY: 0, transformOrigin: 'center bottom' }, { scaleY: 1, autoAlpha: 1, ease: Elastic.easeOut.config(1.75, 0.3) });
		}

		return tlReverseBlocks;
	}

	reverseBlocksBottomAnimTl() {
		const tlReverseBlocks = new TimelineMax();

		for ( let i = this.blocksBottomLeft.length-1; i >= 0; i-- ) {
			tlReverseBlocks.fromTo(this.blocksBottomLeft[i], 0.05, { scaleY: 0, transformOrigin: 'center bottom' }, { scaleY: 1, autoAlpha: 1, ease: Elastic.easeOut.config(1.75, 0.3) });
		}

		return tlReverseBlocks;
	}

	mainTl() {

		mainTl
			.set(this.panel, { autoAlpha: 1 })
			.add('panelsIn')
			.fromTo(this.contentBkgnd, 0.5, { scaleX: 0, transformOrigin: 'center center' }, { scaleX: 1.2, autoAlpha: 1, ease: Power4.easeInOut })
			.fromTo(this.contentFrgnd, 0.5, { scaleX: 0, transformOrigin: 'center center' }, { scaleX: 1.2, autoAlpha: 1, ease: Power4.easeInOut }, '-=0.15')
			.to(this.contentInner, 0.75, { autoAlpha: 1, ease: Power4.easeInOut }, '-=0.25')

			.add('blocksIn')
			.add(this.reverseBlocksTopAnimTl(), 'panelsIn+=0.75')
			.staggerFromTo(this.blocksTopRight, 0.5, { scaleY: 0, transformOrigin: 'center bottom' }, { scaleY: 1, autoAlpha: 1, ease: Elastic.easeOut.config(1.75, 0.3) }, 0.05, 'panelsIn+=0.75')
			.add(this.reverseBlocksBottomAnimTl(), 'panelsIn+=0.75')
			.staggerFromTo(this.blocksBottomRight, 0.5, { scaleY: 0, transformOrigin: 'center bottom' }, { scaleY: 1, autoAlpha: 1, ease: Elastic.easeOut.config(1.75, 0.3) }, 0.05, 'panelsIn+=0.75')

			.add('linesIn')
			.add(this.reverseLinesTopAnimTl(), 'panelsIn+=1.00')
			.staggerFromTo(this.linesTopRight, 0.5, { scaleY: 0, transformOrigin: 'center top' }, { scaleY: 1, autoAlpha: 1, ease: Elastic.easeOut.config(1.75, 0.3) }, 0.02, 'panelsIn+=1.00')
			.add(this.reverseLinesBottomAnimTl(), 'panelsIn+=1.00')
			.staggerFromTo(this.linesBottomRight, 0.5, { scaleY: 0, transformOrigin: 'center top' }, { scaleY: 1, autoAlpha: 1, ease: Elastic.easeOut.config(1.75, 0.3) }, 0.02, 'panelsIn+=1.00')

			.to(this.contentGallery, 0.75, { autoAlpha: 1, ease: Power2.easeIn }, '-=0.75')
			// .fromTo(this.contentGallery, 0.5, { scaleY: 0, transformOrigin: '50% 0%' }, { scaleY: 1, autoAlpha: 1, ease: Power2.easeInOut }, '-=0.75')
		;

		mainTl.pause();
	}

	playTl() {
		mainTl.play();
	}

	resetTl() {
		mainTl.pause(0, true);
	}

}
