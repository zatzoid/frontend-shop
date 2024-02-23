import $ from 'jquery';


export default function addPath(name, isCurrent) {
    const link = $(` <a href="#" class="heading__body-path-link "></a>`)
   
    if(isCurrent){
        const categoryLink = name.replace(/ /g, "_");
       
        link.attr('href', `/category.html?category=${categoryLink}`)
        $('.heading__body-path').append(link);
    }else{
        link.attr('href', `#`)
        link.addClass('heading__body-path-link_current')
        $('.heading__body-path').append(link);
    }
    link.text(name);
}