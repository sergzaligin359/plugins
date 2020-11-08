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

let currentPage = 1;
let currentData = null;
let offset = 0;
let limit = 3;
let pages = Math.ceil(settingPagination.total / settingPagination.limit);

function drawPaginationItems(pages){
    let html = '';
    for(let i = 1; i <= pages; i++){
        html += `<li>${i}</li>`;
    }
    return html;
}

pagination.innerHTML = drawPaginationItems(pages);

const drawCellTd = (item) => {
    
    let html = '';
    for(i in item){
        html += `<td>${item[i]}</td>`;
    }
    return html;
}

datatable.addEventListener('click', (e) => {

    if(e.target.tagName === 'LI'){
        
        currentPage = Number(e.target.textContent);
        offset = (currentPage * limit) - limit;
        currentData = data.slice(offset, offset + limit);
        
        console.log('currentData ===>', currentData);

        const td = currentData.map(
            (item) => `<tr>${ drawCellTd(item) }</tr>`)
            .join('');
        
        table.innerHTML = td;
    }

});

// console.log('datatable', datatable);