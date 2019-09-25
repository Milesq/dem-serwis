import 'normalize.css';
import 'regenerator-runtime/runtime';
import Navigo from 'navigo';

import Indicator from './indicator';
import { routes } from '../config';

const router = new Navigo(undefined, true);
const appShadow = document.querySelector('#app').attachShadow({ mode: 'open' });
const parser = new DOMParser();
let indicator = {
    move() {}
};

if (window.outerWidth >= 800) {
    indicator = new Indicator(document.getElementById('indicator'));
}

routes.forEach(({ path, name, handler }) => {
    path = path || `/${name}`;

    router.on(path, () => {
        setContent(`${name}.html`, handler);
    });
});

router.notFound(() => router.navigate('/'));

const hamburger = document.querySelector('.hamburger');
router.hooks({
    after() {
        if (hamburger.classList.contains('is-active')) {
            hamburger.dispatchEvent(new Event('click'));
        }
    }
});

router.resolve();

const additionalsCallback = new Proxy(
    {
        'index_page.html'() {
            document.querySelector('.fluid-img').classList.remove('hidden');
            document.querySelector('.landing-page-wrapper').style.height = '100vh';
        }
    },
    {
        get(target, name) {
            const hide = () => {
                document.querySelector('.fluid-img').classList.add('hidden');
                document.querySelector('.landing-page-wrapper').style.height = '';
            };

            return name in target ? target[name] : hide;
        }
    }
);

async function setContent(url, callback) {
    indicator.move(url);
    let page = await fetch(url).then(x => x.text());
    page = parser.parseFromString(page, 'text/html');

    appShadow.innerHTML = page.querySelector('template').innerHTML;
    appShadow.appendChild(page.querySelector('link').cloneNode(true));

    additionalsCallback[url]();

    callback(appShadow);
}
