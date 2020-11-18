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
    selector: '.less-calory',
    limit: 3,
    emptyData: '<div>Элементов не найдено!</div>'
});

datatable.render();

const datatable2 = new Datatable(data, columns, titles, sortable, {
    selector: '.more-calory',
    limit: 3,
    emptyData: '<div>Элементов не найдено!</div>'
});

datatable2.render();