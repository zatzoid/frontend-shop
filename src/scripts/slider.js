import $ from 'jquery';


const grid = $('.watched__grid');
const itemListLength = grid.find('.card').toArray();
const slideBtnLeft = $('.watched__heading-btn_left');
const slideBtnRight = $('.watched__heading-btn_right');
function maxVisibleCard() {
    const ww = window.innerWidth;

    if (ww >= 1200) {
        return 4;
    } else if (1200 > ww && ww > 900) {
        return 3
    } else if (900 > ww && ww > 600) {
        return 2
    } else {
        return 1
    }
}

let sliderPosCount = 0;

function slideRight(count) {
    const itemListLength = grid.find('.card').toArray();
    const translateValue = itemListLength[0].offsetWidth;

    sliderPosCount = sliderPosCount + count;

    const maxVisible = maxVisibleCard();

    const translateStep =  ((translateValue * sliderPosCount) + ((40 * sliderPosCount) / 2)) * (-1);
    console.log(translateStep);

    if ((itemListLength.length - maxVisible) >= sliderPosCount && translateStep <= 0) {
        grid.css({ transform: `translateX(${translateStep}px)` });
    }else{
        sliderPosCount = sliderPosCount - count;
    }
    //1200 = 4
    //900 = 3
    //600 = 2
    //300 = 1 



}

export function setSliderListeners() {
    slideBtnRight.on('click', () => {
        let count = 0
        count = count + 1
        slideRight(count)
    })
    slideBtnLeft.on('click', () => {
        slideRight(-1)
    })

}
