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
    let html = '<li class="pagination-prev">Назад</li>';
    for(let i = 1; i <= pages; i++){
        html += `<li class="pagination-item">${i}</li>`;
    }
    html += '<li class="pagination-next">Вперед</li>';
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

    offset = (currentPage * limit) - limit;
    currentData = data.slice(offset, offset + limit);
    
    let html = currentData.map(
        (item) => `<tr>${ drawTd(item) }</tr>`)
        .join('');

    return html;
}

table.innerHTML = drawTr(currentData);

datatable.addEventListener('click', (e) => {

    if(e.target.className === 'pagination-item'){
        currentPage = Number(e.target.textContent);
    }

    if(e.target.className === 'pagination-prev'){
        if(currentPage > 1) {
            currentPage -= 1;
        }else{
            currentPage = pages;
        }
    }

    if(e.target.className === 'pagination-next'){
        if(currentPage < pages) {
            currentPage += 1;
        }else{
            currentPage = 1;
        }
    }

    offset = (currentPage * limit) - limit;
    currentData = data.slice(offset, offset + limit);
    // console.log('currentData ===>', currentData);
    table.innerHTML = drawTr(currentData);

});

// console.log('datatable', datatable);