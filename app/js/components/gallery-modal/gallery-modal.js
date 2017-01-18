import { TimelineMax } from 'gsap';
import enquire from 'enquire.js';
import breakpoints from '../../breakpoints';

export default class GalleryModal {

    init(element) {
		this.panel = element;

		this.contentBkgnd = this.panel.find('.gallery-modal__content__bkgnd');
		this.contentFrgnd = this.panel.find('.gallery-modal__content__frgnd');
		this.contentInner = this.panel.find('.gallery-modal__content__inner');
		this.contentImages = this.panel.find('.gallery-modal__content__images li');

		this.blocksLeftTop = this.panel.find('.gallery-modal__svg__blocks--left__top');
		this.blocksLeftBottom = this.panel.find('.gallery-modal__svg__blocks--left__bottom');
		this.blocksRightTop = this.panel.find('.gallery-modal__svg__blocks--right__top');
		this.blocksRightBottom = this.panel.find('.gallery-modal__svg__blocks--right__bottom');

		this.linesLeftTop = this.panel.find('.gallery-modal__svg__lines--left__top');
		this.linesLeftBottom = this.panel.find('.gallery-modal__svg__lines--left__bottom');
		this.linesRightTop = this.panel.find('.gallery-modal__svg__lines--right__top');
		this.linesRightBottom = this.panel.find('.gallery-modal__svg__lines--right__bottom');

		this.checkBreakpoint();
    }

	checkBreakpoint() {
		enquire
			.register(`screen and (min-width: ${breakpoints.maxMedium})`, {
				match: () => {
					// console.log('medium > 640');
					this.mainTl();
				}
			});
	}

	reverseLinesLeftAnimTl() {
		const tlReverseLines = new TimelineMax();

		for ( let i = this.linesLeftBottom.length-1; i >= 0; i-- ) {
			tlReverseLines.fromTo(this.linesLeftBottom[i], 0.02, { scaleX: 0, transformOrigin: '100% 50%' }, { scaleX: 1, autoAlpha: 1, ease: Elastic.easeOut.config(1.75, 0.3) });
		}

		return tlReverseLines;
	}

	reverseLinesRightAnimTl() {
		const tlReverseLines = new TimelineMax();

		for ( let i = this.linesRightBottom.length-1; i >= 0; i-- ) {
			tlReverseLines.fromTo(this.linesRightBottom[i], 0.02, { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, autoAlpha: 1, ease: Elastic.easeOut.config(1.75, 0.3) });
		}

		return tlReverseLines;
	}

	reverseBlocksLeftAnimTl() {
		const tlReverseBlocks = new TimelineMax();

		for ( let i = this.blocksLeftBottom.length-1; i >= 0; i-- ) {
			tlReverseBlocks.fromTo(this.blocksLeftBottom[i], 0.05, { scaleX: 0, transformOrigin: '100% 50%' }, { scaleX: 1, autoAlpha: 1, ease: Elastic.easeOut.config(1.75, 0.3) });
		}

		return tlReverseBlocks;
	}

	reverseBlocksRightAnimTl() {
		const tlReverseBlocks = new TimelineMax();

		for ( let i = this.blocksRightBottom.length-1; i >= 0; i-- ) {
			tlReverseBlocks.fromTo(this.blocksRightBottom[i], 0.05, { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, autoAlpha: 1, ease: Elastic.easeOut.config(1.75, 0.3) });
		}

		return tlReverseBlocks;
	}

	mainTl() {
		const mainTl = new TimelineMax();

		mainTl
			.add('panelsIn')
			.fromTo(this.contentBkgnd, 0.5, { scaleX: 0, transformOrigin: 'center center' }, { scaleX: 1, autoAlpha: 1, ease: Power4.easeInOut })
			.fromTo(this.contentFrgnd, 0.5, { scaleX: 0, transformOrigin: 'center center' }, { scaleX: 1, autoAlpha: 1, ease: Power4.easeInOut }, '-=0.15')
			.to(this.contentInner, 0.75, { autoAlpha: 1, ease: Power4.easeInOut }, '-=0.25')
			.staggerTo(this.contentImages, 0.5, { autoAlpha: 1, ease: Power4.easeIn }, 0.5, '-=0.25')

			.add('blocksIn')
			.staggerFromTo(this.blocksLeftTop, 0.5, { scaleX: 0.5, transformOrigin: '100% 50%' }, { scaleX: 1, autoAlpha: 1, ease: Elastic.easeOut.config(1.75, 0.3) }, 0.05, 'panelsIn+=0.75')
			.add(this.reverseBlocksLeftAnimTl(), 'panelsIn+=0.75')
			.staggerFromTo(this.blocksRightTop, 0.5, { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, autoAlpha: 1, ease: Elastic.easeOut.config(1.75, 0.3) }, 0.05, 'panelsIn+=0.75')
			.add(this.reverseBlocksRightAnimTl(), 'panelsIn+=0.75')

			.add('linesIn')
			.staggerFromTo(this.linesLeftTop, 0.5, { scaleX: 0, transformOrigin: '100% 50%' }, { scaleX: 1, autoAlpha: 1, ease: Elastic.easeOut.config(1.75, 0.3) }, 0.02, 'panelsIn+=1.00')
			.add(this.reverseLinesLeftAnimTl(), 'panelsIn+=1.00')
			.staggerFromTo(this.linesRightTop, 0.5, { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, autoAlpha: 1, ease: Elastic.easeOut.config(1.75, 0.3) }, 0.02, 'panelsIn+=1.00')
			.add(this.reverseLinesRightAnimTl(), 'panelsIn+=1.00')
		;
	}
}
