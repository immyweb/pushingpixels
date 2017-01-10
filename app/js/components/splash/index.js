import $ from 'jquery';
import Splash from './splash';

export default {

    init: () => {

        let $splash = $('.js-splash');
        let splash;

        if ( $splash && $splash.length ) {

            $splash.each((index, element) => {
                splash = new Splash();
    			splash.init( $(element) );
            });
        }
    }
};
