const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.navigation');
const menu = document.querySelector('.mobile-menu');
const logoLink = document.querySelector('.link-logo__wrapper');

function tg(el, className) {
    el.classList.toggle(className);
}

hamburger.addEventListener('click', () => {
    tg(hamburger, 'is-active');
    tg(menu, 'mobile-menu--is-active');
    tg(logoLink, 'hidden');
    tg(nav, 'navigation--mobile-active');
});
