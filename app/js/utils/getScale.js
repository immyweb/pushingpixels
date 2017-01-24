import $ from 'jquery';

export default function getScale(element) {

	let matrix = $(element).css('transform'),
		values = matrix.split('(')[1];

	values = values.split(')')[0];
	values = values.split(',');
	let a = values[0];
	let b = values[1];

	let scale = Math.sqrt(a*a + b*b);

	return scale;
}
