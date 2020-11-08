import { data } from './data.js';

console.log('data', data);

const datatable = document.querySelector('.datatable');
const table = document.getElementById('table');
const pagination = document.querySelector('.pagination');

// const offset = (currentPage * limit) - limit;

const settingPagination = {
    currentPage: 1,
    limit: 3,
    offset: 0,
    total: data.length
};

console.log('settingPagination', settingPagination);

let currentPage = settingPagination.currentPage;
let currentData = [];
let offset = settingPagination.offset;
let limit = settingPagination.limit;
let pages = Math.ceil(settingPagination.total / settingPagination.limit);

function drawPaginationItems(pages){
    let html = '';
    for(let i = 1; i <= pages; i++){
        html += `<li>${i}</li>`;
    }
    return html;
}

pagination.innerHTML = drawPaginationItems(pages);

const drawTd = (item) => {
    
    let html = '';
    for(let i in item){
        html += `<td>${item[i]}</td>`;
    }
    return html;
}

const drawTr = (currentData) => {
    
    let html = currentData.map(
        (item) => `<tr>${ drawTd(item) }</tr>`)
        .join('');

    return html;
}


datatable.addEventListener('click', (e) => {

    if(e.target.tagName === 'LI'){
        
        currentPage = Number(e.target.textContent);
        offset = (currentPage * limit) - limit;
        currentData = data.slice(offset, offset + limit);
        
        // console.log('currentData ===>', currentData);
        
        table.innerHTML = drawTr(currentData);
    }

});

// console.log('datatable', datatable);