import { data } from './data.js';
import { Datatable } from './Datatable.js';

const columns = [
    'id',
    'title',
    'cal',
    'gi',
    'actions'
];

const sortable = [
    'gi',
    'cal',
];

const titles = [
    '№',
    'Название',
    'Калории',
    'Гликемический индекс',
    'Управление'
];

const datatable = new Datatable(data, columns, titles, sortable, {
    datatableSelector: '.datatable',
    currentPage: 1,
    limit: 3,
    offset: 0,
    total: data.length
});

console.log('Instance class Datatable', datatable);

datatable.render();