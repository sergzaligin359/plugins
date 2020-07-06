console.log('dataImages', dataImages);

const carusel = document.querySelector('.carusel');

const dataCarusel = {
    data: dataImages,
    currentData: [...data].splice(0, 4),
    pageItems: 4
};

console.log('carusel', carusel);
console.log('dataCarusel', dataCarusel);