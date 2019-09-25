import index from './js/index';
import about from './js/about';
import who from './js/who';

export const routes = [
    {
        path: '/',
        name: 'index_page',
        handler: index
    },
    {
        name: 'who',
        handler: who
    },
    {
        name: 'about',
        handler: about
    }
];

export const API = 'https://api-euwest.graphcms.com/v1/ck0z78jwr0c9001b2czxygwyg/master';
