import { dataImages } from './dataImages.js';
import { Carusel } from './Carusel.js';

const carusel = new Carusel(dataImages, {
    selector: '.carusel-wrapper',
    currentPage: 1,
    limit: 3,
    offset: 0,
    total: dataImages.length
});

carusel.render();
