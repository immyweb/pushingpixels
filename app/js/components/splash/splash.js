import { TimelineMax } from 'gsap';

export default class Splash {

    init(element) {
		this.panel = element;

		this.dotsSmallGroup = this.panel.find('.splash__dots__small');
		this.dotsLargeGroup = this.panel.find('.splash__dots__large');
		this.dotsSmall = this.dotsSmallGroup.find('.splash__dots__small__dot');
		this.dotsLarge = this.dotsLargeGroup.find('.splash__dots__large__dot');

		this.cornerCircle = this.panel.find('.splash__corner-circle');

		this.smRadialOuter = this.panel.find('.splash__sm-radial__outer');
		this.smRadialInner = this.panel.find('.splash__sm-radial__inner');
		this.smRadialBlocks = this.panel.find('.splash__sm-radial__blocks');
		this.smRadialLines = this.panel.find('.splash__sm-radial__lines');

		this.lrgRadialContainer = this.panel.find('.splash__lrg-radial');
		this.lrgRadialLines = this.panel.find('.splash__lrg-radial__lines');
		this.lrgRadialOuter = this.panel.find('.splash__lrg-radial__outer');
		this.lrgRadialBlocks = this.panel.find('.splash__lrg-radial__blocks');
		this.lrgRadialInner = this.panel.find('.splash__lrg-radial__inner');

		this.heading = this.panel.find('.splash__heading');

		this.startMainTl();
    }

	setStage() {
		const setStageTl = new TimelineMax();

		setStageTl
			.set(this.dotsSmallGroup, { x: '12%', scale: 0.80 })
			.set(this.dotsLargeGroup, { x: '8%', scale: 0.80 })

			.set(this.cornerCircle, { x: '-40%', y: '80%', scale: 0.75 })

			.set(this.smRadialOuter, { x: '-5%', scale: 0.75 })
			.set(this.smRadialInner, { x: 115, y: 150, scale: 0.75 })
			.set(this.smRadialBlocks, { x: 90, y: 124, scale: 0.75 })
			.set(this.smRadialLines, { x: 72, y: 98, scale: 0.75 })

			.set(this.lrgRadialLines, { x: 614, y: 66, scale: 0.75 })
			.set(this.lrgRadialOuter, { x: 581, y: 36, scale: 0.75 })
			.set(this.lrgRadialBlocks, { x: 645, y: 93, scale: 0.75 })
			.set(this.lrgRadialInner, { x: 739, y: 190, scale: 0.75 })
			.set(this.lrgRadialContainer, { x: -90, y: 40 })
		;

		return setStageTl;
	}

	radialsTl() {
		const radialsTl = new TimelineMax();

		radialsTl
			.fromTo(this.smRadialOuter, 0.5, { scale: 0, transformOrigin: 'center center' }, { scale: 0.75, autoAlpha: 1, ease: Power4.easeInOut })
			.fromTo(this.lrgRadialOuter, 0.5, { scale: 0, transformOrigin: 'center center' }, { scale: 0.75, autoAlpha: 1, ease: Power4.easeInOut }, '-=0.4')
			.fromTo(this.cornerCircle, 0.5, { scale: 0, transformOrigin: 'center center' }, { scale: 0.75, autoAlpha: 1, ease: Power4.easeInOut }, '-=0.4')
			.fromTo(this.smRadialInner, 0.5, { scale: 0, transformOrigin: 'center center' }, { scale: 0.75, autoAlpha: 1, ease: Power4.easeInOut }, '-=0.4')
			.fromTo(this.lrgRadialInner, 0.5, { scale: 0, transformOrigin: 'center center' }, { scale: 0.75, autoAlpha: 1, ease: Power4.easeInOut }, '-=0.4')

			.add('blocksIn')
			.fromTo(this.smRadialBlocks, 0.5, { scale: 0, transformOrigin: 'center center' }, { scale: 0.75, autoAlpha: 0.6, ease: Elastic.easeOut.config(1, 0.4) })
			.fromTo(this.lrgRadialBlocks, 0.5, { scale: 0, transformOrigin: 'center center' }, { scale: 0.75, autoAlpha: 0.65, ease: Elastic.easeOut.config(1, 0.4) }, '-=0.35')

			.add('linesIn')
			.fromTo(this.smRadialLines, 1.5, { scale: 0, transformOrigin: 'center center', rotation: 360 }, { scale: 0.75, autoAlpha: 1, rotation: 0, ease: Power4.easeOut }, 'blocksIn-=0.15')
			.fromTo(this.lrgRadialLines, 1.5, { scale: 0, transformOrigin: 'center center', rotation: 360 }, { scale: 0.75, autoAlpha: 1, rotation: 0, ease: Power4.easeOut }, 'blocksIn-=0.35')

			.add('dotsIn')
			.staggerTo(this.dotsSmall, 0.75, { autoAlpha: 1, ease: Power4.easeOut }, 0.05, 'blocksIn')
			.staggerTo(this.dotsLarge, 0.75, { autoAlpha: 1, ease: Power4.easeOut }, 0.05, 'blocksIn')

			.add('titleIn')
			.fromTo(this.heading, 0.75, { top: '+=5%' }, { top: '-=5%', autoAlpha: 1 }, 'linesIn-=0.5')
		;

		return radialsTl;
	}

	startMainTl() {
		const mainTl = new TimelineMax();

		mainTl
			.add(this.setStage())
			.add(this.radialsTl())
		;
	}
}
