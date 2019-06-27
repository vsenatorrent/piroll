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