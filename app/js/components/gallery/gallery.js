import { TimelineMax } from 'gsap';
import enquire from 'enquire.js';

export default class Gallery {

    init(element) {
		this.panel = element;

		this.blocksTop = this.panel.find('.gallery__blocks--top');
		this.blocksBottom = this.panel.find('.gallery__blocks--bottom');
		this.linesTop = this.panel.find('.gallery__lines--top');
		this.linesBottom = this.panel.find('.gallery__lines--bottom');

		this.checkBreakpoint();

    }

	checkBreakpoint() {
		enquire
			.register("screen and (min-width: 1024px)", {
			    match: () => {
					// Desktop
					console.log('desktop');
					// this.startDesktopTl();
			    }
			})
			.register("screen and (min-width: 768px)", {
				match: () => {
					// Tablet
					console.log('tablet');
					// this.startTabletTl();
				}
			})
			.register("screen and (max-width: 480px)", {
				match: () => {
					// Mobile
					console.log('mobile');
					// this.startMobileTl();
				}
			});
	}

	setStageMobile() {
		const setStageTl = new TimelineMax();

		setStageTl
			.set(this.blocksTop, { scale: 0.75, x: '2%', y: '32%' })
			.set(this.blocksBottom, { scale: 0.75, x: '2%', y: '379%' })
			.set(this.linesTop, { scale: 0.75, y: '13%' })
			.set(this.linesBottom, { scale: 0.75, x: '0', y: '397%' })
		;

		return setStageTl;
	}

	setStageTablet() {

	}

	setStageDesktop() {
		const setStageTl = new TimelineMax();

		setStageTl
			.set(this.blocksTop, { scale: 0.75 }) // 2, 32
			// .set(this.blocksBottom, { scale: 0.75 }) // 2, 379
			.set(this.linesTop, { scale: 0.75 }) // 13
			// .set(this.linesBottom, { scale: 0.75 }) // 0, 397
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
