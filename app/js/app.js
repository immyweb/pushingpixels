import $ from 'jquery';
import OnePager from './onepager';

let onePager = new OnePager();

// run scripts on DOM ready
$(document).ready(() => {
	onePager.checkBreakpoint();
});
