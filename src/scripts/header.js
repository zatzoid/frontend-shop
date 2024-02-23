import $ from 'jquery';
import { setEventListnersSearch } from './search';


const menuInput = $('.header-top__open-btn-cb-input');
const menuLines = $('.header-top__open-btn-cb-lines');
const menuLinks = $('.header-top');




export default function setHeaderListeners() {
    menuInput.on('change', (el) => {
        if (el.target.checked) {
            menuLines.addClass('header-top__open-btn-cb-lines_opened');
            menuLinks.addClass('haeder-top__links_opened')
        } else {
            menuLines.removeClass('header-top__open-btn-cb-lines_opened');
            menuLinks.removeClass('haeder-top__links_opened')
        }
    })
    setEventListnersSearch()
}
