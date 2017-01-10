import { TimelineMax } from 'gsap';

export default class About {

    init(element) {
		this.panel = element;

		this.circleBeige = this.panel.find('.about__circle--beige');
		this.circleWhite = this.panel.find('.about__circle--white');
		this.rectLight = this.panel.find('.about__rect--light');
		this.rectMid = this.panel.find('.about__rect--mid');
		this.dotsSmall = this.panel.find('.about__dots--small');
		this.dotsLarge = this.panel.find('.about__dots--large');
		this.linesBottom = this.panel.find('.about__lines--bottom');
		this.linesLeft = this.panel.find('.about__lines--left');

		this.startMainTl();
    }

	setStage() {
		const setStageTl = new TimelineMax();

		setStageTl
			.set(this.circleBeige, { x: '74%', y: '45%', scale: 0.75 })
			.set(this.circleWhite, { x: -100, y: -250, scale: 0.75 })
			.set(this.rectLight, { x: 175, y: 275, scale: 0.8 })
			.set(this.rectMid, { x: 400, y: 75, scaleX: 0.8, scaleY: 0.75 })
			.set(this.dotsSmall, { x: 125, scale: 0.8 })
			.set(this.dotsLarge, { x: 150, scale: 0.8 })
			.set(this.linesBottom, { x: 175, y: '402%', scale: 0.75 })
			.set(this.linesLeft, { x: 400, scale: 0.75, rotation: 90 })
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
