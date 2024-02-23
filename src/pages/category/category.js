import './category.css';
import $ from 'jquery'
import { fakeApi } from '../../scripts/fakeAPI';
import Card from '../../scripts/components/Card';
import addPath from '../../scripts/addPathLink';
import { Watched } from '../../scripts/watched';
import { Basket } from '../../scripts/components/Basket';
import checkLStimings from '../../scripts/checkLStimings';
import setHeaderListeners from '../../scripts/header';
import { setSliderListeners } from '../../scripts/slider';
import changeLink from '../../scripts/linkChanger';

const currentUrl = window.location.search;
const decodedQuery = decodeURIComponent(currentUrl.split('=')[1]);
const categoryName = decodedQuery.replace(/_/g, " ");
const basket = new Basket()
const getCurrentItem = (data) => {
    return fakeApi.getCurrentItem(data)
}
function addBasketCount(data) {
    return basket.elementAddToBasket(data)
}
function removeBasketCount(data){
return basket.elementRemoveFromBasket(data)
}

const createCard = (data) => {
    const card = new Card(basket.basketCounter, addBasketCount, removeBasketCount);
    return card.createCard(data)
}
const watched = new Watched({ getCurrentItem: getCurrentItem, createCard: createCard });

async function getPageContent() {
    try {

        const items = await fakeApi.getItemsByCategory(categoryName);
        const categoryInfo = await fakeApi.getCurrentCategory(categoryName);

        setCategoryInfo(categoryInfo[0]);

        items.forEach(data => {
            const card = new Card(basket.basketCounter, addBasketCount, removeBasketCount);
            appendCards(card.createCard(data))
        });

    }
    catch (e) {
        console.log(e);

    }
}
function setCategoryInfo(data) {
    const heading = $('.category-about__heading');
    const description = $('.category-about__text');
    heading.text(data.name);
    description.text(data.desc);
}
function appendCards(data) {
    $('.cards__grid').append(data);
}


$(function () {
    getPageContent();
    addPath(categoryName, false);
    basket.basketCounter()
    checkLStimings(['basket', 'watched'])
    $('.heading__body-head').text(categoryName);
    watched.putWatchedItems();
    setHeaderListeners();
    setSliderListeners();
    
    changeLink('.header-bottom__logo-link');
    changeLink('.header-bottom__catalog');
    changeLink('.header-bottom__basket');
    const headingLinks = $('.heading__body-path-link').toArray();
    headingLinks.forEach(el => {
        changeLink(el)
    });



})



