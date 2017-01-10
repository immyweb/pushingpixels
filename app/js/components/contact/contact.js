import { TimelineMax } from 'gsap';

export default class Contact {

    init(element) {
		this.panel = element;

		this.ellipseBeigeLeft = this.panel.find('.contact__ellipse-beige--left');
		this.ellipseBeigeRight = this.panel.find('.contact__ellipse-beige--right');
		this.radialBlocks = this.panel.find('.contact__radial--blocks');
		this.radialLines = this.panel.find('.contact__radial--lines');
		this.ellipseMainBkgnd = this.panel.find('.contact__ellipse-main--bkgnd');
		this.ellipseMidLeft = this.panel.find('.contact__ellipse-mid--left');
		this.ellipseMidRight = this.panel.find('.contact__ellipse-mid--right');
		this.ellipseMainFrgnd = this.panel.find('.contact__ellipse-main--frgnd');
		this.ellipseDarkLeft = this.panel.find('.contact__ellipse-dark--left');
		this.ellipseDarkRight = this.panel.find('.contact__ellipse-dark--right');
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
			.add(this.setStage())
			// .add(this.radialsTl())
		;
	}
}
