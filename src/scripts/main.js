//show gallery modal
$('.gallery__btn').on('click', function(){
    const modalParent = $(this).closest('picture');
    const modalHeader = modalParent.find('.gallery__header').text();
    const modalDescription = modalParent.find('.gallery__description').text();
    const imageSrc = modalParent.children('.gallery__img').attr('src');
    $('.modal__header').text(modalHeader);
    $('.modal__description').text(modalDescription);
    $('.modal__image').attr('src', imageSrc);
    $('.modal').css('display', 'flex');
});
//close gallery modal
$('.modal__close').on('click', function(){
    $('.modal').fadeOut();
});

const mymap = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoidnNlbmF0b3JyZW50IiwiYSI6ImNqeGh4bG1iOTBwdDkzeWw5NnRxeThrYmcifQ.CfdcfJ5QOCV-9iA9QdveLA'
}).addTo(mymap);


const greenIcon = L.icon({
    iconUrl: '../img/marker-icon.png',
    shadowUrl: '../img/marker-shadow.png',

    iconSize: [25, 41], // size of the icon
    shadowSize: [41, 41], // size of the shadow
    iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor: [12, 9] // point from which the popup should open relative to the iconAnchor
});

const marker = L.marker([51.5, -0.09], { icon: greenIcon }).addTo(mymap);

marker.bindPopup('<b>We are here!</b>').openPopup();