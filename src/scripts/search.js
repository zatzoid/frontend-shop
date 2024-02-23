import $ from 'jquery';
import { FindedEl } from './components/FindedEl';
import { fakeApi } from './fakeAPI';



const searchContainer = $('.header-bottom__search');
const searchError =`<li> <p class="header-bottom__search-finded-placeholder">Ничего не найдено</p> </li>`
const searchInput = $('.header-bottom__search-input');
const searchClsoeBtn  = $('.header-bottom__search-finded-btn-close');
const searchOpenBtn = $('.header-bottom__search-btn-open')

const searchContainerItems = $('.header-bottom__search-finded-result-items');
const searchContainerCategory = $('.header-bottom__search-finded-result-category');

export function setEventListnersSearch() {
    searchInput.on('focus', () => {
        searchContainer.addClass('header-bottom__search_open');
    })
    searchInput.on('focusout', function (){
        const value = $(this).val();
        const ww = window.innerWidth;
        if(value <= 3 && ww > 600){
            closeSearch()
        }
        
    })
    searchInput.on('input', function () {
        const value = $(this).val();
        if (value.length > 3) {
            searchEl(value)
        }
    })
    searchClsoeBtn.on('click', ()=>{
        closeSearch()
    })
    searchOpenBtn.on('click',()=>{
        searchContainer.toggleClass('header-bottom__search_open');
    })
}
function closeSearch(){
    searchInput.val('')
    searchContainerItems.empty();
    searchContainerCategory.empty()
    searchContainer.removeClass('header-bottom__search_open');
   
}

async function searchEl(data) {
    try {
        const response = await fakeApi.getSearchedEls(data);
        if (response.items.length > 0) {
            searchContainerItems.empty()
            response.items.forEach(element => {
                const findedEl = new FindedEl;

                searchContainerItems.append(findedEl.createElItem(element))
            });

        } else {
            searchContainerItems.empty()
            searchContainerItems.append(searchError);
        }

        if (response.category.length > 0) {
            searchContainerCategory.empty()
            response.category.forEach(element => {
                const findedEl = new FindedEl;

                searchContainerCategory.append(findedEl.createElCategory(element))
            });

        } else {
            searchContainerCategory.empty()
            searchContainerCategory.append(searchError);
        }
    }
    catch (e) {
        console.log(e);
    }
}