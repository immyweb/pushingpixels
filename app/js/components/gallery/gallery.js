import { TimelineMax } from 'gsap';
import enquire from 'enquire.js';

export default class Gallery {

    init(element) {
		this.panel = element;

		this.svg = this.panel.find('.gallery__svg');
		this.blocksTop = this.panel.find('.gallery__blocks--top');
		this.blocksBottom = this.panel.find('.gallery__blocks--bottom');
		this.linesTop = this.panel.find('.gallery__lines--top');
		this.linesBottom = this.panel.find('.gallery__lines--bottom');
		this.bkgnd = this.panel.find('.gallery__bkgnd');
		this.frgnd = this.panel.find('.gallery__frgnd');
		this.content = this.panel.find('.gallery__content div');

		this.checkBreakpoint();

    }

	checkBreakpoint() {
		enquire
			.register("screen and (min-width: 1024px)", {
			    match: () => {
					// Desktop
					console.log('desktop');
					this.startDesktopTl();
			    }
			})
			.register("screen and (min-width: 768px)", {
				match: () => {
					// Tablet
					console.log('tablet');
					this.startTabletTl();
				}
			})
			.register("screen and (max-width: 480px)", {
				match: () => {
					// Mobile
					console.log('mobile');
					this.startMobileTl();
				}
			});
	}

	setStageMobile() {
		const setStageTl = new TimelineMax();

		this.svg.attr('viewBox', '0 0 480 1024');

		setStageTl
			.set(this.blocksTop, { scale: 0.75, x: '2%', y: '32%' })
			.set(this.blocksBottom, { scale: 0.75, x: '2%', y: '379%' })
			.set(this.linesTop, { scale: 0.75, y: '13%' })
			.set(this.linesBottom, { scale: 0.75, x: '0', y: '397%' })
			.set(this.bkgnd, { scaleX: 0.8, scaleY: 1, y: '10%' })
			.set(this.frgnd, { scale: 0.8, scaleY: 0.75, y: '10%' })
		;

		return setStageTl;
	}

	setStageTablet() {

	}

	setStageDesktop() {
		const setStageTl = new TimelineMax();

		this.svg.attr('viewBox', '0 0 1280 1024');

		setStageTl
			.set(this.blocksTop, { scale: 0.75, x: '2%', y: '32%' })
			.set(this.blocksBottom, { scale: 0.75, x: '2%', y: '379%' })
			.set(this.linesTop, { scale: 0.75, y: '13%' })
			.set(this.linesBottom, { scale: 0.75, x: '0', y: '397%' })
			.set(this.bkgnd, { scaleX: 0.8, scaleY: 0.75, y: '10%' })
			.set(this.frgnd, { scale: 0.8, scaleY: 0.75, y: '10%' })
			.set(this.content, { x: '20%', y: '15%' })
		;

		return setStageTl;
	}

	startMobileTl() {
		const mobileTl = new TimelineMax();

		mobileTl
			.add(this.setStageMobile())
		;
	}

	startTabletTl() {
		const tabletTl = new TimelineMax();

		// tabletTl
		// 	.add(this.setStageTablet())
		// ;
	}

	startDesktopTl() {
		const desktopTl = new TimelineMax();

		desktopTl
			.add(this.setStageDesktop())
		;
	}
}
