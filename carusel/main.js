import { dataImages } from './dataImages.js';
import { Carusel } from './Carusel.js';

const dataImages2 = [
    {
        thumbnails: 'images/10.jpg',
        name: 'Title111'
    },
];

const columns = [
    'src',
    'title'
];

const columns2 = [
    'thumbnails',
    'name'
];

const carusel = new Carusel(dataImages, columns, {
    selector: '.less-calory',
    limit: 4,
    emptyData: '<div>Элементов не найдено!</div>'
});

carusel.render();

const carusel2 = new Carusel(dataImages2, columns2, {
    selector: '.more-calory',
    limit: 4,
    emptyData: '<div>Элементов не найдено!</div>'
});

carusel2.render();


