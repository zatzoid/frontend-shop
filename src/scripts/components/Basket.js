import $ from 'jquery'

export class Basket {
    constructor() {

        // this._headerBasketCount = $('.header-bottom__basket-count');
    }

    deleteElementFromBasket(itemArt) {
        let existingList = JSON.parse(localStorage.getItem('basket'));
        const newList = existingList.items.filter(el => { return el.itemArt !== itemArt });

        localStorage.removeItem("basket");
        const currentDate = new Date().getTime();

        existingList.time = currentDate
        existingList.items = newList;
        console.log(existingList);
        localStorage.setItem("basket", JSON.stringify(existingList));

        this.basketCounter()
    }

    basketCounter() {
        const existingList = JSON.parse(localStorage.getItem('basket'));
        let itemCount = 0
        if (existingList && existingList.items.length > 0) {
            existingList.items.forEach(el => {
                itemCount = itemCount + el.count
            });
            $('.header-bottom__basket-count').text(itemCount);
            $('.header-bottom__basket-count').addClass('header-bottom__basket-count_active');
        } else {
            $('.header-bottom__basket-count').removeClass('header-bottom__basket-count_active');
        }
    }

    elementAddToBasket(itemArt) {
        let returnedValue = 0
        let existingList = JSON.parse(localStorage.getItem('basket'));
        if (!existingList) {
            existingList = {
                time: new Date().getTime(),
                items: []
            }

        }

        const hasThisItem = existingList.items.find(el => { return el.itemArt === itemArt });
        if (hasThisItem) {
            const index = existingList.items.findIndex((el) => { return el.itemArt === hasThisItem.itemArt });
            const newObj = { ...hasThisItem, count: hasThisItem.count + 1 };
            /*   Object.assign(hasThisItem, newObj) */
            existingList.items[index] = newObj;
            returnedValue = newObj.count
            /*  basketCount.text(newObj.count) */
        } else {
            existingList.items.push({ itemArt: itemArt, count: 1 });
            returnedValue = 1
            /*  basketCount.text('1') */
        }

        localStorage.removeItem("basket");
        const currentDate = new Date().getTime();

        existingList.time = currentDate
        localStorage.setItem("basket", JSON.stringify(existingList));

        this.basketCounter()
        return returnedValue
    }
    elementRemoveFromBasket(itemArt) {
        let returnedValue = 0
        let existingList = JSON.parse(localStorage.getItem('basket'));
        const hasThisItem = existingList.items.find(el => { return el.itemArt === itemArt });
        if (hasThisItem.count > 1) {
            const index = existingList.items.findIndex((el) => { return el.itemArt === hasThisItem.itemArt });
            const newObj = { ...hasThisItem, count: hasThisItem.count - 1 };
            /*   Object.assign(hasThisItem, newObj) */
            existingList.items[index] = newObj;
            returnedValue = newObj.count;
        } else {
            existingList.items = existingList.items.filter(el => { return el.itemArt !== hasThisItem.itemArt });
        }
        localStorage.removeItem("basket");
        const currentDate = new Date().getTime();

        existingList.time = currentDate
        localStorage.setItem("basket", JSON.stringify(existingList));

        this.basketCounter();
        return returnedValue
    }
}