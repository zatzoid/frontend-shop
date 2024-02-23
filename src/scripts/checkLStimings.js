export default function checkLStimings(array) {

    const currentDate = new Date().getTime();
    //array string
    array.forEach(el => {
        const existingList = JSON.parse(localStorage.getItem(el));
        //час
        if (existingList && (currentDate - existingList.time) >= 3600000) {
            localStorage.removeItem(el);
        }else{
            console.log(el, 'is deleted');
        }



    });
}