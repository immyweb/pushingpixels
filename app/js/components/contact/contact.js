import { TimelineMax } from 'gsap';

export default class Contact {

    init(element) {
		this.panel = element;

		this.radialBlocks = this.panel.find('.contact__svg__radials--blocks');
		this.radialLines = this.panel.find('.contact__svg__radials--lines');
		this.dotsLarge = this.panel.find('.contact__svg__dots--large');
		this.dotsSmall = this.panel.find('.contact__svg__dots--small');

		this.startMainTl();
    }

	setStage() {
		const setStageTl = new TimelineMax();


		return setStageTl;
	}

	startMainTl() {
		const mainTl = new TimelineMax();


	}
}
