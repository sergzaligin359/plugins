console.log('dataImages', dataImages);

const caruselWrapper = document.querySelector('.carusel-wrapper');
const carusel = document.querySelector('.carusel');

const dataCarusel = {
    data: dataImages,
    currentData: [...dataImages].splice(0, 4),
    pageItems: 4
};

const pagination = (data) => {
    const items = data.data.length;
    const offset = data.pageItems;
    const pages = Math.ceil(items / offset);
    let start = 0;

    const back = document.querySelector('.back');
    const forward = document.querySelector('.forward');
    
    forward.dataset.start = 0;
    back.dataset.start = 0;
    forward.dataset.page = 1;
    back.dataset.page = 1;

    back.addEventListener('click', () => {
    
        back.dataset.start = parseInt(forward.dataset.start) - offset;
        forward.dataset.start = parseInt(back.dataset.start);
        
        if(parseInt(back.dataset.page) <= 1 || parseInt(back.dataset.start) <= 0){
            console.warn('PAGE EQ!!!');
            forward.dataset.start = 0;
            forward.dataset.page = 1;
            back.dataset.start = 0;
            back.dataset.page = 1;
            //back.setAttribute('disabled', true);
        }

        start = parseInt(back.dataset.start);

        dataCarusel.currentData = [...data.data].splice(start, offset);
        const carusel = document.querySelector('.carusel');
        carusel.replaceWith(drawCarusel());
    });
    
    
    forward.addEventListener('click', () => {

        forward.dataset.start = parseInt(forward.dataset.start) + offset;
        forward.dataset.page = parseInt(forward.dataset.page) + 1;
        back.dataset.page = parseInt(forward.dataset.page);

        if(parseInt(forward.dataset.page) > pages){
            console.warn('PAGE EQ!!!');
            forward.dataset.start = 0;
            forward.dataset.page = 1;
        }

        start =  parseInt(forward.dataset.start);

        dataCarusel.currentData = [...data.data].splice(start, offset);
        
        const carusel = document.querySelector('.carusel');
        //carusel.replaceWith(drawCarusel());
        const div = document.createElement('div');
        div.className = 'loading';
        div.innerHTML = '<div>L O A D I N G</div>'
        carusel.replaceWith(div);

        setTimeout(() => {
            const carusel = document.querySelector('.loading');
            carusel.replaceWith(drawCarusel());
        }, 1000)
    });

    
};

const drawCarusel = () => {

    const div = document.createElement('div');
    div.className = 'carusel';
    
    dataCarusel.currentData.forEach(el => {

        const figure = document.createElement('figure');

        const img = document.createElement('img');
        img.src = el.src;
        const figcaption = document.createElement('figcaption');
        figcaption.innerHTML = `${el.title}:  <a href="#">подробнее</a>`;

        figure.appendChild(img);
        figure.appendChild(figcaption);

        div.appendChild(figure);

    });

    return div;
};

carusel.replaceWith(drawCarusel());

pagination(dataCarusel);