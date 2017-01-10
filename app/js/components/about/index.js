import $ from 'jquery';
import About from './about';

export default {

    init: () => {

        let $about = $('.js-about');
        let about;

        if ( $about && $about.length ) {

            $about.each((index, element) => {
                about = new About();
    			about.init( $(element) );
            });
        }
    }
};
