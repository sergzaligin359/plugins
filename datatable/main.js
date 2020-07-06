console.log('data', data);
console.log('dataImages', dataImages);

const table = document.getElementById('table');
const tableBody = document.querySelector('#table tbody');
const tableHead = document.querySelector('#table thead');
const tableFoot = document.querySelector('#table tfoot');
table.innerHTML = '';

const dataTable = {
    thead: ['№', 'Название', 'Калорийность', 'Гликемический индекс'],
    data: data,
    currentData: [...data].splice(0, 4),
    pageItems: 4
};

const pagination = (data) => {
    const items = data.data.length;
    const offset = data.pageItems;
    const pages = Math.ceil(items / offset);
    let start = 0;
    let currentData = [];

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

        dataTable.currentData = [...data.data].splice(start, offset);
        const tableBody = document.querySelector('#table tbody');

        tableBody.replaceWith(drawTbody());
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


        dataTable.currentData = [...data.data].splice(start, offset);
        const tableBody = document.querySelector('#table tbody');
        //clearTbody();
        tableBody.replaceWith(drawTbody());
    });

    
};


const drawThead = () => {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    
    dataTable.thead.forEach(el => {
        const td = document.createElement('td');
        td.innerText = el;
        tr.appendChild(td);
    });

    thead.appendChild(tr);

    return thead;
};

const drawTfoot = () => {
    const tfoot = document.createElement('tfoot');
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.setAttribute('colspan', 4);
    td.innerHTML = `
    <div>
    <span>${dataTable.pages}</span>-<span>${dataTable.offset}</span> из <span>${dataTable.count}</span>
    <button class="back">back</button><button class="forward" >Forward</button>
    </div>
    `;
    tr.appendChild(td);
    tfoot.appendChild(tr);

    return tfoot;
};

const drawTbody = () => {
    const tbody = document.createElement('tbody');
    
    dataTable.currentData.forEach(el => {
        const tr = document.createElement('tr');

        for(let prop in el){
            const td = document.createElement('td');
            td.innerText = el[prop];
            tr.appendChild(td);
           // console.log('prop', el[prop]);
        }
        tbody.appendChild(tr);
    });

    return tbody;
};

const clearTbody = () => {
    const tableBody = document.querySelector('#table tbody');
    tableBody.remove();
};

const drawTable = () => {
    table.appendChild(drawThead());
    table.appendChild(drawTbody());
    table.appendChild(drawTfoot());
};

drawTable();

pagination(dataTable);