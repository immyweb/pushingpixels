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
			.set(this.circleBeige, { scale: 0.75, x: '74%', y: '45%' })
			.set(this.circleWhite, { scale: 0.75, x: '-12%', y: '-28%' }) // -100, -250
			.set(this.rectLight, { scale: 0.8, x: '24%', y: '60%' }) // 125, 275
			.set(this.rectMid, { scaleX: 0.9, scaleY: 0.75, x: '36.4%', y: '10.8%' }) // 350, 75
			.set(this.dotsSmall, { scale: 0.8, x: '7%' }) // 75
			.set(this.dotsLarge, { scale: 0.8, x: '9%' }) // 100
			.set(this.linesBottom, { scale: 0.75, x: '10%', y: '402%' }) // 125
			.set(this.linesLeft, { scale: 0.75, x: '27.8%', rotation: 90 }) // 350
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
