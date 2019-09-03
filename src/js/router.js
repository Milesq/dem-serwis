import 'normalize.css';
import 'regenerator-runtime/runtime';
import Navigo from 'navigo';

import Indicator from './indicator';
import { routes } from '../config';

const router = new Navigo(undefined, true);
const appShadow = document.querySelector('#app').attachShadow({ mode: 'open' });
const parser = new DOMParser();
const indicator = new Indicator(document.getElementById('indicator'));

routes.forEach(({ path, name, handler }) => {
    if (path == undefined) {
        path = `/${name}`;
    }

    router.on(path, () => {
        setContent(`${name}.html`, handler);
    });
});

router.notFound(() => router.navigate('/'));

router.resolve();

async function setContent(page, callback) {
    indicator.move(page);
    page = await fetch(page).then(x => x.text());
    page = parser.parseFromString(page, 'text/html');

    appShadow.innerHTML = page.querySelector('template').innerHTML;
    appShadow.appendChild(page.querySelector('link').cloneNode(true));
    callback(appShadow);
}
