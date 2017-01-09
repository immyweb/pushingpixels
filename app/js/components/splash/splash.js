import $ from 'jquery';
import { TimelineMax } from 'gsap';

export default class Splash {

    init(element) {
		this.panel = element;

		this.dotsSmall = this.panel.find('.splash__dots__small');
		this.dotsLarge = this.panel.find('.splash__dots__large');

		this.cornerCircle = this.panel.find('.splash__corner-circle');

		this.smRadialOuter = this.panel.find('.splash__sm-radial__outer');
		this.smRadialInner = this.panel.find('.splash__sm-radial__inner');
		this.smRadialBlocks = this.panel.find('.splash__sm-radial__blocks');
		this.smRadialLines = this.panel.find('.splash__sm-radial__lines');

		this.lrgRadialContainer = this.panel.find('.splash__lrg-radial__group');
		this.lrgRadialLines = this.panel.find('.splash__lrg-radial__lines');
		this.lrgRadialOuter = this.panel.find('.splash__lrg-radial__outer');
		this.lrgRadialBlocks = this.panel.find('.splash__lrg-radial__blocks');
		this.lrgRadialInner = this.panel.find('.splash__lrg-radial__inner');


		this.startMainTl();
    }

	setStage() {
		const setStageTl = new TimelineMax();

		setStageTl
			.set(this.dotsSmall, { x: '12%', scale: 0.80 })
			.set(this.dotsLarge, { x: '8%', scale: 0.80 })

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

	startMainTl() {
		const mainTl = new TimelineMax();

		mainTl
			.add(this.setStage())
		;
	}
}
