import './basket.css'
import $ from 'jquery'
import checkLStimings from '../../scripts/checkLStimings';
import { Basket } from '../../scripts/components/Basket';
import { fakeApi } from '../../scripts/fakeAPI';
import { BasketCard } from '../../scripts/components/BasketCard';
import changeLink from '../../scripts/linkChanger';



const basket = new Basket();
function addCount(data) {

    return basket.elementAddToBasket(data);

}
function removeCount(data) {
    return basket.elementRemoveFromBasket(data)
}
function deleteCard(data) {
    basket.deleteElementFromBasket(data);

    const checkContainer = $('.basket__items').find('.basket-item');
    if (checkContainer.length <= 0) {
        $('.basket').empty();
        $('.basket').append(
            ` <h2 class="basket__placeholder">Корзина пуста</h2>`
        )
    }

}
let pageBasket = [];

function addToPageBasket(data) {
    //{itemArt: 123, count: 123, price: 222}

    const indexInList = pageBasket.findIndex(el => { return el.itemArt === data.itemArt });

    if (indexInList === -1) {
        pageBasket.push(data);
    } else {
        pageBasket[indexInList].count = data.count;
        pageBasket[indexInList].price = data.price;
    }
    changeFooterInfo()
}
function removeFromPageBasket(data) {
    //{itemArt: 123, count: 123, price: 222}
    const indexInList = pageBasket.findIndex(el => { return el.itemArt === data.itemArt });
    pageBasket.splice(indexInList, 1);
    changeFooterInfo()
}
function putAllToPageBasket() {
    const inputArray = $('.basket-item__cb-inp').toArray();

    inputArray.forEach(el => {
        el.checked = true
        $(el).trigger("change");
    })
}
function removeAllFromPageBasket() {
    const inputArray = $('.basket-item__cb-inp').toArray();

    inputArray.forEach(el => {
        el.checked = false
        $(el).trigger("change");
    })
}
function switchCbAll() {
    const inputArray = $('.basket-item__cb-inp').toArray();
    const isAllChecked = inputArray.some(el => { return el.checked === false });

    if (isAllChecked) {
        $('.basket__cb-all-input')[0].checked = false
    } else {
        $('.basket__cb-all-input')[0].checked = true
    }
}

function changeFooterInfo() {
    let count = 0
    pageBasket.forEach(element => {
        count = count + element.count;
    });
    $('.basket__footer-text-value_count').text(count);

    let price = 0;
    pageBasket.forEach(element => {
        price = price + element.price
    });
    $('.basket__footer-text-value_price').text(price);
}
/* 
function changeFooterInfo() {
    let count = 0
    const countArray = $('.card__buy-btn-counter-data').toArray()
    countArray.forEach(element => {
        count = count + Number(element.outerText);
    });
    $('.basket__footer-text-value_count').text(count);
    let price = 0;
    const priceArray = $('.basket-item__text-summ').toArray()
    priceArray.forEach(element => {
        price = price + Number(element.outerText);
    });
    $('.basket__footer-text-value_price').text(price);
}
 */

function buy() {
    let textValue = '';
    pageBasket.forEach(el => {
        textValue = textValue + `арт.${el.itemArt}- ${el.count}шт.`
    })
    const text = `Вы купили: ${textValue}`
    alert(text)
}

async function renderBasket() {
    try {
        const basket = JSON.parse(localStorage.getItem('basket'));
        if (basket.items.length > 0) {
            $('.basket').empty();
            $('.basket').append(`
            <label class='basket__cb-all'> <input type="checkbox" name="all" class="basket__cb-all-input"> Выбрать все</label>
                <ul class="basket__items">
                </ul>
                <div class='basket__footer'>
                <div class="basket__footer-text">
                    <p class="basket__footer-text-data">Товаров в заказе</p>
                    <p class="basket__footer-text-value basket__footer-text-value_count"></p>
                    <p class="basket__footer-text-data">Итог</p>
                    <p class="basket__footer-text-value basket__footer-text-value_price"></p>
                </div>
                <button class="btn-radius btn-blue basket__footer-btn ">Оформить заказ</button>
                <p class="basket__footer-description">Дата и стоимость доставки или самовывоза определяются при оформлении
                    заказа</p>
            </div>
            `)
            const itemList = await fakeApi.getCurrentItem(basket.items);
            itemList.forEach(element => {
                const newCard = new BasketCard({
                    addCount: addCount,
                    removeCount: removeCount,
                    deleteCard: deleteCard,
                    addToPageBasket: addToPageBasket,
                    removeFromPageBasket: removeFromPageBasket,
                    switchCbAll: switchCbAll
                });
                $('.basket__items').append(newCard.createCard(element))
            });
            changeFooterInfo();
            $('.basket__footer-btn').on('click', () => {
                buy()
            })
            $('.basket__cb-all-input').on('change', (el) => {
                if (el.currentTarget.checked) {
                    putAllToPageBasket()
                } else {
                    removeAllFromPageBasket()
                }
            })
        }
    } catch (e) {
        console.log(e);
    }

}


$(function () {
    checkLStimings(['basket']);
    basket.basketCounter();
    renderBasket();
    
    changeLink('.header-bottom__logo-link');
    changeLink('.header-bottom__catalog');
    changeLink('.header-bottom__basket');
    const headingLinks = $('.heading__body-path-link').toArray();
    headingLinks.forEach(el => {
        changeLink(el)
    });

})