import $ from 'jquery';
import splash from './components/splash/index';
import about from './components/about/index';
import contact from './components/contact/index';

// run scripts on DOM ready
$(document).ready(() => {
    splash.init();
	about.init();
	contact.init();
});
