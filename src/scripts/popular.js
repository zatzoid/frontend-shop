import $ from 'jquery'
import Card from './components/Card';
import { fakeApi } from './fakeAPI';


export default async function appendPopularItems() {
    try {
        const list = await fakeApi.getPopularItems()
        list.forEach(element => {
            const card = new Card();
            $('.popular__grid').append(card.createCard(element))
        });
    } catch (e) {
        console.log(e);
    }
}




