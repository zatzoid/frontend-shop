import './catalog.css';
import $ from 'jquery'
import checkLStimings from '../../scripts/checkLStimings';
import { Basket } from '../../scripts/components/Basket';
import setHeaderListeners from '../../scripts/header';

const basket = new Basket()


$(function () {
    checkLStimings(['basket']);
    basket.basketCounter();
    setHeaderListeners()
})

