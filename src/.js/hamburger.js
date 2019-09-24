const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-active');
    menu.classList.toggle('mobile-menu--is-active');
});
