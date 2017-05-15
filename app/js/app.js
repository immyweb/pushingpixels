import $ from 'jquery';
import OnePager from './onepager';

const onePager = new OnePager();

// run scripts on DOM ready
$(document).ready(() => {
	onePager.checkBreakpoint();
});
