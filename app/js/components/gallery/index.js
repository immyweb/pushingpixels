import $ from 'jquery';
import Gallery from './gallery';

export default {

    init: () => {

        let $gallery = $('.js-gallery');
        let gallery;

        if ( $gallery && $gallery.length ) {

            $gallery.each((index, element) => {
                gallery = new Gallery();
    			gallery.init( $(element) );
            });
        }
    }
};
