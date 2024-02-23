import './main.css'
import $ from 'jquery'
import checkLStimings from '../../scripts/checkLStimings';
import { Basket } from '../../scripts/components/Basket';
import appendPopularItems from '../../scripts/popular';
import setHeaderListeners from '../../scripts/header';

const basket = new Basket()


$(function () {
    checkLStimings(['basket']);
    basket.basketCounter();
    appendPopularItems();
    setHeaderListeners();
})

