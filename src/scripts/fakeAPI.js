import { itemList, categoryList } from './constants';



class FakeAPI {
    constructor() {

    }
    _response(data) {
        return data

    }
    getCategory() {
        return this._response(categoryList);
    }
    getItemList() {
        return this._response(itemList);
    }
    getCurrentCategory(data) {
        const filtedList = categoryList.filter(el => { return el.name === data });
        return this._response(filtedList);
    }
    getItemsByCategory(data) {
        const filtedList = itemList.filter(el => { return el.category === data });
        return this._response(filtedList);
    }
    getPopularItems() {
        const popular = [itemList[0], itemList[1], itemList[2], itemList[3]]
        return this._response(popular);
    }
    getCurrentItem(data) {
        if (Array.isArray(data)) {
            let responseArray = []
            data.forEach(obj => {
                const item = itemList.find(el => el.articul === obj.itemArt);
                if (item) {
                    responseArray.push(item);
                }

            });
            return this._response(responseArray);
        } else {
            const item = itemList.find(el => el.articul === data);
            return this._response(item);
        }


    }
    getSearchedEls(data) {
        const serched = data.toLowerCase()
        const filtedItems = itemList.filter(el => { return el.name.toLocaleLowerCase().includes(serched) });
        const filtedCategory = categoryList.filter(el => {console.log(serched, el.name); return el.name.toLocaleLowerCase().includes(serched) });
        return this._response({ items: filtedItems, category: filtedCategory })

    }

}
export const fakeApi = new FakeAPI