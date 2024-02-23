import $ from 'jquery'

export class Watched {
    constructor(options) {
        this.getCurrentItem = options.getCurrentItem;
        this.createCard = options.createCard || null;
        this._watchedContainer = $('.watched__grid') || null;
    }

    putLSitem(data) {
        //{itemArt: '12333'}
        //watched: [itemArt: '12333]
        let existingList = this.getLSitems();
        const hasThisItem = existingList.items.some(el => { return el.itemArt === data });
        if (!hasThisItem) {
            existingList.items.push({ itemArt: data });
            existingList.time = new Date().getTime();
            localStorage.removeItem("watched");
            localStorage.setItem("watched", JSON.stringify(existingList));
        }

    }
    getLSitems() {

        let existingList = JSON.parse(localStorage.getItem('watched'));

        if (!existingList) {
            existingList = {
                time: new Date().getTime(),
                items: []
            }
            localStorage.setItem("watched", JSON.stringify(existingList));
        }
        const currentDate = new Date().getTime();
        existingList.time = currentDate
        return existingList

    }
    async putWatchedItems() {
        const list = this.getLSitems()
        try {
            const items = await this.getCurrentItem(list.items);
            if (items.length > 0 && this._watchedContainer) {
                items.forEach(element => {
                    this._watchedContainer.append(this.createCard(element))
                });


            } else {
                throw new Error('нету просмотренных')
            }
        }
        catch (e) {
            console.log(e);
        }

    }
}