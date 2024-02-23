import $ from 'jquery'

//эта функция для замены ссылок при деплое на гитхабе


export default function changeLink(dom) {
    const domEL = $(dom);
    const currentPath = window.location.href;
    const isGhPage = currentPath.includes('github');
    if (isGhPage) {
        const prevLink = domEL.attr('href');
        const newLink = `/frontend-shop${prevLink}`;
        domEL.attr('href', newLink);
    }
}
