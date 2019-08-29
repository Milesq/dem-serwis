import index from './js/index.ts';
import about from './js/about.ts';
import who from './js/who.ts';

export const routes = [
    {
        path: '/',
        name: 'index_page',
        handler: index
    },
    {
        name: 'about',
        handler: about
    },
    {
        name: 'who',
        handler: who
    }
];
