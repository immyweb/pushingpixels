import $ from 'jquery';
import GalleryModal from './gallery-modal';

export default {

    init: () => {

        let $galleryModal = $('.js-gallery-modal');
        let galleryModal;

        if ( $galleryModal && $galleryModal.length ) {

            $galleryModal.each((index, element) => {
                galleryModal = new GalleryModal();
    			galleryModal.init( $(element) );
            });
        }
    }
};
