import $ from 'jquery';

export class CardOverview {
    constructor(basketCounter, elementAddToBasket, elementRemoveFromBasket) {
        this.elementRemoveFromBasket = elementRemoveFromBasket
        this.elementAddToBasket = elementAddToBasket
        this.basketCounter = basketCounter
        this._cardComercial = $('.card-overview__img-comercial');
        this._cardArt = $('.card-overview__desc-art');
        this._cardName = $('.card-overview__desc-name');
        this._cardShort = $('.card-overview__desc-short');
        this._cardWeights = $('.card-overview__desc-weight');
        this._cardPrice = $('.card-overview__desc-price');
        this._cardDesc = $('.card-description__stats');
        //btns
        this._cardBasketBtn = $('.card-overview__desc-btn_basket')
        this._cardBasketBtnContainer = $('.card__buy-btn-counter')
        this._cardBasketBtnCounterAdd = $('.card__buy-btn-counter-plus');
        this._cardBasketBtnCounterRemove = $('.card__buy-btn-counter-minus');
        this._cardBasketBtnCounterData = $('.card__buy-btn-counter-data');


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
    _appendWeight() {

        if (this._cardData.weight.length > 0) {
            this._cardData.weight.forEach((el, index) => {
                const cardWeightDom = $(`<label class="card-overview__desc-weight-btn">
        <input type="radio"  name="weight" value="" class="card-overview__desc-weight-btn-input">
        <div class="card-overview__desc-weight-btn-box">
            <p class="card-overview__desc-weight-btn-box-text"></p>
        </div>
    </label>`)
                cardWeightDom.find('.card-overview__desc-weight-btn-box-text').text(`${el} кг`);
                cardWeightDom.find('.card-overview__desc-weight-btn-input').attr('value', index);
                this._cardWeights.append(cardWeightDom);
            })
        }

    }
    _addPrice(data) {
        this._cardPrice.text(this._cardData.prices[data]);
        this._cardPrice.append(`<span> ₽/${this._cardData.value} </span>`);

    }

    _addItemToBasket() {
        this._cardBasketBtnCounterData.text(this.elementAddToBasket(this._cardData.articul));
        this._cardBasketBtn.addClass('card__buy-btn_hide');
        this._cardBasketBtnContainer.removeClass('card__buy-btn_hide');
    }
    _removeItemFromBasket() {
        if (this._cardBasketBtnCounterData.text() <= 1) {
            this._cardBasketBtn.removeClass('card__buy-btn_hide');
            this._cardBasketBtnContainer.addClass('card__buy-btn_hide');
        }
        this._cardBasketBtnCounterData.text(this.elementRemoveFromBasket(this._cardData.articul))
    }


    _setEventListeners() {
        const inputList = $('.card-overview__desc-weight-btn-input').toArray();
        inputList.forEach(el => {
            $(el).on('change', (el) => {
                this._addPrice(el.currentTarget.defaultValue);
            })
        })

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
    _appedCardData() {

        this._cardArt.text(`Артикул: ${this._cardData.articul}`)
        this._cardName.text(this._cardData.name);
        this._cardShort.text(this._cardData.shortDesc);

    }
    _appendDescription() {
        this._cardData.stats.forEach(el => {
            const stats = $(` <span class="card-description__stats-data"></span>`);
            stats.text(el);
            this._cardDesc.append(stats)
        })
        $('.card-description__text').text(this._cardData.description)


    }
    _firstRender() {
        const inputList = $('.card-overview__desc-weight-btn-input')[0];
        $(inputList).attr('checked', 'checked');
        $(inputList).trigger('change');
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



    setCardData(data) {
        this._cardData = data;
        this._appendComercial();
        this._appedCardData();
        this._appendWeight();
        this._setEventListeners();
        this._appendDescription();
        this._firstRender();
    }

}