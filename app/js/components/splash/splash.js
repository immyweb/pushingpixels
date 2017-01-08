import $ from 'jquery';
import { TimelineMax } from 'gsap';

export default class Splash {

    init(element) {
        console.log(element);
		this.panel = element;

		this.smLarge = this.panel.find('#sm-large');
		this.smSmall = this.panel.find('#sm-small');
		this.radialLarge = this.panel.find('#radial-large');
		this.radialLargeBlocks = this.panel.find('#radial-large-blocks');

		this.startMainTl();
    }

	setStage() {
		const startTl = new TimelineMax();

		startTl
			.set(this.smLarge, { x: '-5%', scale: 0.75 })
			.set(this.smSmall, { x: 115, y: 150, scale: 0.75 })
			.set(this.radialLarge, { x: 645, y: 93, scale: 0.75 })
			.set(this.radialLargeBlocks, { x: 645, y: 93, scale: 0.75 })
		;

		return startTl;
	}

	startMainTl() {
		const mainTl = new TimelineMax();

		mainTl
			.add(this.setStage())
		;
	}
}
