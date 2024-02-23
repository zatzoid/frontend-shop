import $ from 'jquery'
import defaultImg from '../../assets/item-1.png'

export class BasketCard {
    constructor(options) {
        this.addCount = options.addCount;
        this.removeCount = options.removeCount;
        this.deleteCard = options.deleteCard;
        this.removeFromPageBasket = options.removeFromPageBasket;
        this.addToPageBasket = options.addToPageBasket;
        this.switchCbAll = options.switchCbAll;
        this._cardDom = $(` <li class="basket-item">
<label class="basket-item__cb">
    <input class="basket-item__cb-inp" type="checkbox" name="elemnt">
</label>

<div class="basket-item__img">
    <img class="basket-item__img-data" src="" alt='item'>
</div>
<div class="basket-item__text">
    <a class='basket-item__text-heading-link'><h2 class="basket-item__text-heading"></h2></a>
    <p class="basket-item__text-summ"></p>
    <p class="basket-item__text-price"></p>
</div>
<div class="basket-item__btns">
    <button class="basket-item__btn-remove"></button>
    <div class='card__buy-btn-counter '>
        <button class='card__buy-btn-counter-minus'>-</button>
        <p class='card__buy-btn-counter-data'> </p>
        <button class='card__buy-btn-counter-plus'>+</button>
    </div>
</div>
</li>`)
    }
    _getItemFormLS() {
        const storage = JSON.parse(localStorage.getItem('basket'));
        const currentitem = storage.items.find(el => { return el.itemArt === this._cardData.articul })
        return currentitem
    }
    _removeItem() {
        this._cardDom.remove();
        this.deleteCard(this._cardData.articul);
    }
    _setEventListeners() {
        this._cardCounterBtnAdd.on('click', () => {

            const count = this.addCount(this._cardData.articul)
            this._setCardCounter(count)

            if (this._cardCB[0].checked) {
                this.addToPageBasket({
                    itemArt: this._cardData.articul,
                    count: Number(this._cardCounterData.text()),
                    price: Number(this._cardSumm.text())
                })
            }
        });
        this._cardCounterBtnRemove.on('click', () => {

            const count = this.removeCount(this._cardData.articul);
            if (count <= 0) {
                this._cardDom.remove();
                this.removeFromPageBasket({ itemArt: this._cardData.articul })
            } else {
                this._setCardCounter(count);

                if (this._cardCB[0].checked) {
                    this.addToPageBasket({
                        itemArt: this._cardData.articul,
                        count: Number(this._cardCounterData.text()),
                        price: Number(this._cardSumm.text())
                    })

                }
            }

        });
        this._cardBtnRemove.on('click', () => {
            this._removeItem();
            this.removeFromPageBasket({ itemArt: this._cardData.articul })
        })
        this._cardCB.on('change', (el) => {
            if (el.currentTarget.checked) {
                this.addToPageBasket({
                    itemArt: this._cardData.articul,
                    count: Number(this._cardCounterData.text()),
                    price: Number(this._cardSumm.text())
                })
            } else {
                this.removeFromPageBasket({ itemArt: this._cardData.articul })
            }
        })
        this._cardCB.on('click', () => {
            this.switchCbAll()
        })
    }
    _setCardCounter(data) {
        this._cardSumm.text(data * this._cardData.prices[0]);
        this._cardCounterData.text(data);
    }
    _setCardValue() {
        this._cardHeading.text(this._cardData.name);
        this._cardPrice.text(`${this._cardData.prices[0]} Р/${this._cardData.value}`);
        this._cardHeadingLink.attr('href', `/card.html?item=${this._cardData.articul}`);
        this._cardImg.attr('src', defaultImg);
        this._cardImg.attr('alt', this._cardData.name);
        $(this._cardDomMain).attr('data-index', this._cardData.articul)
        this._setCardCounter(this._cardLSdata.count);


    }
    createCard(data) {
        this._cardData = data;
        this._cardDomMain = this._cardDom.find('.basket-item').prevObject[0];
        this._cardHeading = this._cardDom.find('.basket-item__text-heading');
        this._cardPrice = this._cardDom.find('.basket-item__text-price');
        this._cardSumm = this._cardDom.find('.basket-item__text-summ');
        this._cardHeadingLink = this._cardDom.find('.basket-item__text-heading-link');
        this._cardImg = this._cardDom.find('.basket-item__img-data');
        this._cardCounterData = this._cardDom.find('.card__buy-btn-counter-data');
        this._cardCounterBtnAdd = this._cardDom.find('.card__buy-btn-counter-plus');
        this._cardCounterBtnRemove = this._cardDom.find('.card__buy-btn-counter-minus');
        this._cardBtnRemove = this._cardDom.find('.basket-item__btn-remove');
        this._cardCB = this._cardDom.find('.basket-item__cb-inp')
        this._cardLSdata = this._getItemFormLS();
        this._setCardValue()
        this._setEventListeners()
        return this._cardDom
    }
}