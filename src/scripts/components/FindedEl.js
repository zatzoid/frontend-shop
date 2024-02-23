import $ from 'jquery'

export class FindedEl {
    constructor() {
        this._elDom = $(`
<li class="header-bottom__search-finded-result-item">
<a class="header-bottom__search-finded-result-item-link" href="#">
    <p class="header-bottom__search-finded-result-item-name"></p>
</a>

</li>`)
        this._elLink = this._elDom.find('.header-bottom__search-finded-result-item-link');
        this._elName = this._elDom.find('.header-bottom__search-finded-result-item-name');
    }
    _setElItemData() {
        this._elLink.attr('href', `/card.html?item=${this._elData.articul}`);
        this._elName.text(this._elData.name);
    }
    _setElCategoryData() {
        const categoryName = this._elData.name.replace(/ /g, "_");
        this._elLink.attr('href', `/category.html?category=${categoryName}`);
        this._elName.text(this._elData.name)
    }

    createElItem(data) {
        this._elData = data;
        this._setElItemData();
        return this._elDom

    }
    createElCategory(data) {
        this._elData = data;
        this._setElCategoryData();
        return this._elDom
    }
}