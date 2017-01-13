import { TimelineMax } from 'gsap';

export default class Contact {

    init(element) {
		this.panel = element;

		this.ellipseBeigeLeft = this.panel.find('.contact__ellipse-beige--left');
		this.ellipseBeigeRight = this.panel.find('.contact__ellipse-beige--right');
		this.radialBlocks = this.panel.find('.contact__radial--blocks');
		this.radialLines = this.panel.find('.contact__radial--lines');
		this.dotsLarge = this.panel.find('.contact__dots--large');
		this.dotsSmall = this.panel.find('.contact__dots--small');

		this.startMainTl();
    }

	setStage() {
		const setStageTl = new TimelineMax();

		setStageTl
			.set(this.ellipseBeigeLeft, { scale: 0.75, x: '-35%', y: '32%' })
			.set(this.ellipseBeigeRight, { scale: 0.75, x: '98%', y: '32%' })
			.set(this.radialBlocks, { scale: 0.9, x: '6%', y: '2%' })
			.set(this.radialLines, { scale: 0.9, x: '5%', y: '1%' })
			.set(this.dotsLarge, { scale: 0.8, x: '11%', y: '100%' })
			.set(this.dotsSmall, { scale: 0.8, x: '11%', y: '100%' })
		;

		return setStageTl;
	}

	startMainTl() {
		const mainTl = new TimelineMax();

		mainTl
			.add(this.setStage())
			// .add(this.radialsTl())
		;
	}
}
