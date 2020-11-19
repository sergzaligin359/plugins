import { data } from './data.js';
import { data2 } from './data2.js';
import { Datatable } from './Datatable.js';

const columns = [
    'id',
    'title',
    'cal',
    'gi',
];

const sortable = [
    'gi',
    'cal',
];

const titles = [
    '№',
    'Название',
    'Калории',
    'Гликимический индекс'
];

const actions = ['1'];

const datatable = new Datatable(data, columns, titles, sortable, actions, {
    selector: '.less-calory',
    limit: 3,
    emptyData: '<div>Элементов не найдено!</div>'
});

datatable.render();


const columns2 = [
    'id',
    'name',
    'cal',
];

const sortable2 = [
    'cal',
];

const titles2 = [
    '№',
    'Имя',
    'Калории',
];

const actions2 = [];

const datatable2 = new Datatable(data2, columns2, titles2, sortable2, actions2, {
    selector: '.more-calory',
    limit: 3,
    emptyData: '<div>Элементов не найдено!</div>'
});

datatable2.render();

console.log('instance datatable', datatable);