import './catalog.css';
import $ from 'jquery'
import checkLStimings from '../../scripts/checkLStimings';
import { Basket } from '../../scripts/components/Basket';
import setHeaderListeners from '../../scripts/header';
import changeLink from '../../scripts/linkChanger';

const basket = new Basket()

$(function () {
    checkLStimings(['basket']);
    basket.basketCounter();
    setHeaderListeners();
   
   
    
    changeLink('.header-bottom__logo-link');
    changeLink('.header-bottom__catalog');
    changeLink('.header-bottom__basket');
    const headingLinks = $('.heading__body-path-link').toArray();
    headingLinks.forEach(el => {
        changeLink(el)
    });
    const categoryLinks = $('.catalog__grid-el-link').toArray();
    categoryLinks.forEach(el => {
        changeLink(el)
    })


})

