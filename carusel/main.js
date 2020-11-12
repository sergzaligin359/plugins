import { dataImages } from './dataImages.js';
import { Carusel } from './Carusel.js';

document.addEventListener("DOMContentLoaded", () => {
    const carusel = new Carusel(dataImages, {
        selector: '.carusel-wrapper',
        currentPage: 1,
        limit: 4,
        offset: 0,
        total: dataImages.length
    });
    
    carusel.render();
});

