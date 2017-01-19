import { TimelineMax } from 'gsap';

export default class Splash {

    init(element) {
		this.panel = element;

		this.dotsSmallGroup = this.panel.find('.splash__dots__small');
		this.dotsLargeGroup = this.panel.find('.splash__dots__large');
		this.dotsSmall = this.dotsSmallGroup.find('.splash__dots__small__dot');
		this.dotsLarge = this.dotsLargeGroup.find('.splash__dots__large__dot');

		this.cornerCircle = this.panel.find('.splash__corner-circle');

		this.smRadialContainer = this.panel.find('.splash__sm-radial');
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

		// this.startMainTl();
    }

	setStage() {
		const setStageTl = new TimelineMax();

		setStageTl
			.set(this.dotsSmallGroup, { scale: 0.80, x: '12%' })
			.set(this.dotsLargeGroup, { scale: 0.80, x: '8%' })

			.set(this.cornerCircle, { scale: 0.75, x: '-40%', y: '80%' })

			.set(this.smRadialOuter, { scale: 0.75, x: '-4.5%' })
			.set(this.smRadialInner, { scale: 0.75, x: '33%', y: '43.4%' }) // 115, 150
			.set(this.smRadialBlocks, { scale: 0.75, x: '22%', y: '30%' }) // 90, 124
			.set(this.smRadialLines, { scale: 0.75, x: '15.2%', y: '20.4%' }) // 72, 98
			.set(this.smRadialContainer, { scale: 1.1, y: '-7%' })

			.set(this.lrgRadialLines, { scale: 0.75, x: '58.8%', y: '6.4%' }) // 614, 66
			.set(this.lrgRadialOuter, { scale: 0.75, x: '51.5%', y: '3%' }) // 581, 36
			.set(this.lrgRadialBlocks, { scale: 0.75, x: '65.5%', y: '9.5%' }) // 645, 93
			.set(this.lrgRadialInner, { scale: 0.75, x: '103.3%', y: '26.6%' }) // 739, 190
			.set(this.lrgRadialContainer, { scale: 1.1,  x: '-16%', y: '-2%' }) // -90, 40
		;

		return setStageTl;
	}

	radialsTl() {
		const radialsTl = new TimelineMax();

		radialsTl
			.add('ellipsesIn')
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
			// .add(this.radialsTl())
		;
	}
}
