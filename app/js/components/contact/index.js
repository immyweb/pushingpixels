import $ from 'jquery';
import Contact from './contact';

export default {

    init: () => {

        let $contact = $('.js-contact');
        let contact;

        if ( $contact && $contact.length ) {

            $contact.each((index, element) => {
                contact = new Contact();
    			contact.init( $(element) );
            });
        }
    }
};
