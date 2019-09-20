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
    path = path || `/${name}`;

    router.on(path, () => {
        setContent(`${name}.html`, handler);
    });
});

router.notFound(() => router.navigate('/'));

router.resolve();

const additionalsCallback = new Proxy(
    {
        'index_page.html'() {
            document.querySelector('.fluid-img').classList.remove('hidden');
        }
    },
    {
        get(target, name) {
            const hide = () => {
                document.querySelector('.fluid-img').classList.add('hidden');
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
