import $ from "jquery";
import defaultImage from '../../assets/item-1.png'

export default class Card {
    constructor(basketCounter, elementAddToBasket, elementRemoveFromBasket) {
        this.elementAddToBasket = elementAddToBasket
        this.elementRemoveFromBasket = elementRemoveFromBasket
        this.basketCounter = basketCounter
        this._cardDom = $(` <li class="card">
        <div class='card__comercial'>
        
        </div>
        <div class="card__img">
            <img src="" alt="item-card" class="card__img-data">
        </div>
        <div class="card__desc">
        <a href='#' class="card__desc-link">
            <h3 class="card__desc-link-name">        </h3>
            </a>
            <p class="card__desc-about">            </p>
        </div>
        <div class="card__buy">
            <div class="card__buy-price">
                <p class="card__buy-price-data card__buy-price-data_old"></p>
                <p class="card__buy-price-data card__buy-price-data_new"></p>
            </div>
            <div class="card__buy-btns"> 

            <button class="card__buy-btn btn-blue btn-radius">
            <span class="card__buy-btn-img"></span>
            <p class="card__buy-btn-text">В корзину</p>
        </button>

        <div class='card__buy-btn-counter card__buy-btn_hide'> 
    <button class='card__buy-btn-counter-minus'>-</button>
    <p class='card__buy-btn-counter-data'> </p>
    <button class='card__buy-btn-counter-plus'>+</button>
    </div>
            </div>
        </div>
    </li>`)

    }
    _setCardValue() {
        this._cardOldPrice.hide()
        this._cardName.text(this._cardData.name);
        this._cardShrotDesc.text(this._cardData.shortDesc);
        this._cardPrice.text(`${this._cardData.prices[0]}  ₽/${this._cardData.value} `);
        this._cardImg.attr('src', defaultImage);
        this._appendComercial();
        this._addLinkToCard();
        this._setEventListeners();

    }
    _addItemToBasket() {

        this._cardBasketBtn.addClass('card__buy-btn_hide');
        this._cardBasketBtnContainer.removeClass('card__buy-btn_hide');
        this._cardBasketBtnCounterData.text(this.elementAddToBasket(this._cardData.articul));
    }
    _removeItemFromBasket() {
        const count = this.elementRemoveFromBasket(this._cardData.articul)
        if (count <= 0) {
            this._cardBasketBtn.removeClass('card__buy-btn_hide');
            this._cardBasketBtnContainer.addClass('card__buy-btn_hide');
        }
        this._cardBasketBtnCounterData.text(count);

    }
    _setEventListeners() {
        this._cardBasketBtn.on('click', () => {
            this._addItemToBasket();

        })
        this._cardBasketBtnCounterAdd.on('click', () => {
            this._addItemToBasket();
        })
        this._cardBasketBtnCounterRemove.on('click', () => {
            this._removeItemFromBasket()
        })
    }


    _appendComercial() {

        if (this._cardData.comercial.length > 0) {
            this._cardData.comercial.forEach(el => {
                const cardComercial = $(`<p class="card__comercial-data"></p>`)
                if (el === 'hit') {
                    cardComercial.text('Хит продаж');
                } else {
                    cardComercial.text('Лучшая цена');
                }

                cardComercial.addClass(`card__comercial-data_${el}`);
                this._cardComercial.append(cardComercial[0]);
            });
        }
    }
    _addLinkToCard() {
        /*        const link = this._cardData.name.replace(/ /g, "_"); */
        this._cardLink.attr('href', `/card.html?item=${this._cardData.articul}`);
    }
    _firstRender() {
        let existingList = JSON.parse(localStorage.getItem('basket'));
        if (existingList) {
            const hasThisItem = existingList.items.find(el => { return el.itemArt === this._cardData.articul });
            if (hasThisItem) {
                this._cardBasketBtn.addClass('card__buy-btn_hide');
                this._cardBasketBtnContainer.removeClass('card__buy-btn_hide');
                this._cardBasketBtnCounterData.text(hasThisItem.count);
            }
        }
    }
    createCard(data) {
        this._cardData = data;
        this._cardPrice = this._cardDom.find('.card__buy-price-data_new');
        this._cardName = this._cardDom.find('.card__desc-link-name');
        this._cardLink = this._cardDom.find('.card__desc-link');
        this._cardShrotDesc = this._cardDom.find('.card__desc-about');
        this._cardComercial = this._cardDom.find('.card__comercial')
        this._cardMain = this._cardDom.find('.card').prevObject[0];
        this._cardImg = this._cardDom.find('.card__img-data');
        this._cardOldPrice = this._cardDom.find('.card__buy-price-data_old');
        this._cardBtnsContainer = this._cardDom.find('.card__buy-btns');
        this._cardBasketBtn = this._cardDom.find('.card__buy-btn');
        this._cardBasketBtnContainer = this._cardDom.find('.card__buy-btn-counter')
        this._cardBasketBtnCounterAdd = this._cardDom.find('.card__buy-btn-counter-plus');
        this._cardBasketBtnCounterRemove = this._cardDom.find('.card__buy-btn-counter-minus');
        this._cardBasketBtnCounterData = this._cardDom.find('.card__buy-btn-counter-data');

        this._firstRender();
        this._setCardValue();

        return this._cardDom;

    }
}