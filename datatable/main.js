console.log('data', data);
const table = document.getElementById('table');
const tableBody = document.querySelector('#table tbody');
const tableHead = document.querySelector('#table thead');
const tableFoot = document.querySelector('#table tfoot');
table.innerHTML = '';

const dataTable = {
    thead: ['№', 'Название', 'Калорийность', 'Гликемический индекс'],
    data: data,
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

const drawTbody = () => {
    const tbody = document.createElement('tbody');
    
    dataTable.data.forEach(el => {
        const tr = document.createElement('tr');

        for(let prop in el){
            const td = document.createElement('td');
            td.innerText = el[prop];
            tr.appendChild(td);
            console.log('prop', el[prop]);
        }
        tbody.appendChild(tr);
    });

    return tbody;
};

const drawTable = () => {
    table.appendChild(drawThead());
    table.appendChild(drawTbody());
};

drawTbody();
drawTable();