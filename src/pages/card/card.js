import './card.css';
import $ from 'jquery';
import { fakeApi } from '../../scripts/fakeAPI';
import addPath from '../../scripts/addPathLink';
import { CardOverview } from '../../scripts/components/CardOverview';
import { Watched } from '../../scripts/watched';
import Card from '../../scripts/components/Card';
import { Basket } from '../../scripts/components/Basket';
import checkLStimings from '../../scripts/checkLStimings';
import setHeaderListeners from '../../scripts/header';
import { setSliderListeners } from '../../scripts/slider';

const currentUrl = window.location.search;
const decodedQuery = decodeURIComponent(currentUrl.split('=')[1]);
const categoryName = decodedQuery.replace(/_/g, " ");

const basket = new Basket();
function addBasketCount(data) {
    return basket.elementAddToBasket(data)
}
function removeBasketCount(data){
return basket.elementRemoveFromBasket(data)
}

const cardOverview = new CardOverview(basket.basketCounter, basket.elementAddToBasket, basket.elementRemoveFromBasket);
const getCurrentItem = (data) => {
    return fakeApi.getCurrentItem(data)
}

const createCard = (data) => {
    const card = new Card(basket.basketCounter, addBasketCount, removeBasketCount);
    return card.createCard(data)
}
const watched = new Watched({ getCurrentItem: getCurrentItem, createCard: createCard });




async function getCurrentCard() {
    try {
        const item = await fakeApi.getCurrentItem(decodedQuery);
        addPath(item.category, true);
        addPath(item.name, false);
        cardOverview.setCardData(item)
        watched.putLSitem(item.articul)
    }
    catch (e) {
        console.log(e);
    }
}



$(function () {
    checkLStimings(['basket', 'watched']);
    getCurrentCard();
    watched.putWatchedItems();
    basket.basketCounter();
    setHeaderListeners();
    setSliderListeners();

})

