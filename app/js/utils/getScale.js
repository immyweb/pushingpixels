import $ from 'jquery';

export default function getScale(element) {
	let scale;

	let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

	if ( !isSafari ) {

		let matrix = $(element).css('transform') || $(element).css('-ms-transform');

		let	values = matrix.split('(')[1];

		values = values.split(')')[0];
		values = values.split(',');
		let a = values[0];
		let b = values[1];

		scale = Math.sqrt(a*a + b*b);

	}

	// console.log(new WebKitCSSMatrix(window.getComputedStyle($(element)[0]).webkitTransform));
	// console.log(matrix);


	return scale;
}
