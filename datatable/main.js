import { data } from './data.js';
import { Datatable } from './Datatable.js';

const columns = [
    'id',
    'title',
    'cal',
    'gi'
];

const titles = [
    '№',
    'Название',
    'Калории',
    'Гликемический индекс'
];

const datatable = new Datatable(data, columns, titles, {
    datatableSelector: '.datatable',
    currentPage: 1,
    limit: 3,
    offset: 0,
    total: data.length
});

console.log('Instance class Datatable', datatable);

datatable.render();