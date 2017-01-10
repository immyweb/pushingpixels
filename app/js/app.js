import $ from 'jquery';
import splash from './components/splash/index';
import about from './components/about/index';

// run scripts on DOM ready
$(document).ready(() => {
    splash.init();
	about.init();
});
