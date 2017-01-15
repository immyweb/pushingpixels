import { TimelineMax } from 'gsap';

export default class Contact {

    init(element) {
		this.panel = element;

		this.radialBlocks = this.panel.find('.contact__radial--blocks');
		this.radialLines = this.panel.find('.contact__radial--lines');
		this.dotsLarge = this.panel.find('.contact__dots--large');
		this.dotsSmall = this.panel.find('.contact__dots--small');

		this.startMainTl();
    }

	setStage() {
		const setStageTl = new TimelineMax();


		return setStageTl;
	}

	startMainTl() {
		const mainTl = new TimelineMax();

		mainTl
			// .add(this.setStage())
			// .add(this.radialsTl())
		;
	}
}
