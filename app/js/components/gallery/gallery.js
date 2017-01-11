import { TimelineMax } from 'gsap';

export default class Gallery {

    init(element) {
		this.panel = element;

		this.blocksTop = this.panel.find('.gallery__blocks--top');
		this.blocksBottom = this.panel.find('.gallery__blocks--bottom');
		this.linesTop = this.panel.find('.gallery__lines--top');
		this.linesBottom = this.panel.find('.gallery__lines--bottom');
		this.bkgnd = this.panel.find('.gallery__bkgnd');
		this.frgnd = this.panel.find('.gallery__frgnd');

		this.startMainTl();
    }

	setStage() {
		const setStageTl = new TimelineMax();

		setStageTl
			.set(this.blocksTop, { scale: 0.75, x: '2%', y: '32%' })
			.set(this.blocksBottom, { scale: 0.75, x: '2%', y: '379%' })
			.set(this.linesTop, { scale: 0.75, y: '13%' })
			.set(this.linesBottom, { scale: 0.75, x: '0', y: '397%' })
			.set(this.bkgnd, { scaleX: 0.8, scaleY: 0.75, y: '10%' })
			.set(this.frgnd, { scale: 0.8, scaleY: 0.75, y: '10%' })
		;

		return setStageTl;
	}

	startMainTl() {
		const mainTl = new TimelineMax();

		mainTl
			.add(this.setStage())
		;
	}
}
