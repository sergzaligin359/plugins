import { Emitter } from './eventEmitter.js';

export class Datatable{

    constructor(data=[], columns=[], titles=[], sortable=[], actions=[], options={}){
        this.options = options;
        this.actions = actions;
        this.isActions = actions.length > 0 ? true : false;

        this.emitter = new Emitter;

        this.data = data;
        this.limit = this.options.limit;
        this.total = data.length;
        this.currentPage = 1;
        this.offset = 0;
        this.pages = Math.ceil(this.total / this.options.limit);

        this.columns = columns;
        this.titles = titles;
        this.sortable = sortable;
        this.currentData = [];
        this.searchData = [];
        this.emptyData = this.options.emptyData;
        
        this.$pagination = null;
        this.$table = null;
        this.$searchField = null;

        this.sortUp = null;
        this.sortDown = null;
        this.sortCols = null;

        this.searchText = '';

        this.$wrapper = document.querySelector(this.options.selector);
        this.$wrapper.innerHTML = '';
        
    }

    getDOMElementsForComponent(){
        this.$table = document.querySelector(this.options.selector + ' tbody');
        this.sortUp = document.querySelector(this.options.selector + ' .sort-up');
        this.sortDown = document.querySelector(this.options.selector + ' .sort-down');
        this.sortCols = document.querySelectorAll(this.options.selector + ' .sort');
        this.actions = document.querySelectorAll(this.options.selector + ' .action-list span');
        this.$pagination = document.querySelector(this.options.selector + ' .pagination');
    }

    sortColumn(){

        const handlerClick = (e) => {

            console.log('click sortColumn', e.target.dataset);

            if(e.target.dataset.sortUp){
                this.sortFieldUp(this.data, e.target.dataset.sortUp);
                console.log('this.currentData sort', this.data);
                
            }

            if(e.target.dataset.sortDown){
                this.sortFieldDown(this.data, e.target.dataset.sortDown);
                console.log('this.currentData sort', this.data);
            }
            
            const tbody = this.drawTBody();
            // console.log('this.$table.tbody', this.$table);
            console.log('tbody', tbody);
            this.$table.replaceWith(tbody);
            this.getDOMElementsForComponent();
        }
        
        this.sortCols.forEach(el => el.addEventListener('click', handlerClick));
    }

    actionsBtn(){
        const handlerClick = (e) => {
            
            if( e.target.className === 'action-update'){
                console.log('UPDATE', e.target.dataset.actionid);
            }

            if( e.target.className === 'action-delete'){
                console.log('DELETE', e.target.dataset.actionid);
                this.data = this.data.filter(item => item.id != e.target.dataset.actionid);

                this.pages = Math.ceil(this.data.length / this.options.limit);
                console.log('PAGES', this.pages);

                this.sliceArray(this.data);

                

                const tbody = this.drawTBody();
                this.$table.replaceWith(tbody);

                const pagination = this.htmlPagination();
                console.log('pagination', pagination);
                console.log('this.$pagination', this.$pagination);
                this.$pagination.replaceWith(pagination);
                
                this.getDOMElementsForComponent();
                this.actionsBtn();
                this.navigationElements();
            }
            this.getDOMElementsForComponent();

        }
        this.actions.forEach(el => el.addEventListener('click', handlerClick));
    }

    drawTBody(){
        this.sliceArray(this.data);
        const td = this.htmlTd(this.currentData);
        const tbody = document.createElement('tbody');
        tbody.innerHTML = td;
        return tbody;
    }

    drawTHead(){
        const th = this.htmlTh(this.titles, this.columns, this.sortable);
        const thead = document.createElement('thead');
        thead.innerHTML = th;
        return thead;
    }

    drawTable(){
        const table = document.createElement('table');
        table.border = 1;
        return table;
    }

    draw(){
        const table = this.htmlTable(this.data);
        this.$wrapper.append(table);
        this.getDOMElementsForComponent();
        this.sortColumn();
    }

    render(){
        if(this.data.length > 0){
            this.sliceArray(this.data);
            this.$table = this.drawTable();
            const thead = this.drawTHead();
            const tbody = this.drawTBody();
            const pagination = this.htmlPagination();
            const search = this.htmlSearch();

            this.$wrapper.append(search);
            this.$table.append(thead);
            this.$table.append(tbody);
            this.$wrapper.append(this.$table);
            this.$wrapper.append(pagination);

            this.getDOMElementsForComponent();
            this.navigationElements();
            this.searchElements();
            this.sortColumn();
            this.actionsBtn();
        }else{
            this.$wrapper.style.display = 'block';
            this.$wrapper.innerHTML = `${this.emptyData}`;
        }
    }

    htmlTh(titles, columns, sortable){
        let html = `<tr>`;
        html += titles.map((title, index) => `
            <th>
                ${ title }
                <span class="sort" data-sorted=${sortable.includes(columns[index]) ? 'true ': 'false'}>
                    <span class="sort-up" data-sort-up=${columns[index]}>Up</span>
                    <span class="sort-down" data-sort-down=${columns[index]}>Down</span>
                </span>
            </th>`).join('');
            if(this.isActions){
                html += '<th>Действия</th>'
            }
        html += '</tr>';
        return html;
    }

    htmlTd(data){
        return data.map(item => {
            if(this.isActions){
                return `<tr>` +
                    this.columns.map(el => {
                        return `<td>${item[el]}</td>`;
                    }).join('') + `
                        <td>
                            <div class="action-list">
                                <span class="action-delete" data-actionId=${ item.id }>Del</span>
                                <span class="action-update" data-actionId=${ item.id }>Update</span>
                            </div>
                        </td>
                    <tr>`;
            }else{
                return `<tr>` +
                this.columns.map(el => {
                    return `<td>${item[el]}</td>`;
                }).join('');
            }
        }).join('');
    }

    htmlTable(data){
        this.$table = document.createElement('table');
        this.$table.border = 1;
        const thead = document.createElement('thead');
        thead.innerHTML = this.htmlTh(this.titles, this.columns, this.sortable);
        this.$table.append(thead);
        const tbody = document.createElement('tbody');
        tbody.innerHTML = this.htmlTd(data);
        this.$table.append(tbody);
        return this.$table;
    }

    sortFieldUp(array, field) {
        array.sort(function(a, b) {
            if (a[field] > b[field]) {
                return 1;
              }
              if (a[field] < b[field]) {
                return -1;
              }
              return 0;
        })
    }

    sortFieldDown(array, field) {
        array.sort(function(a, b) {
            if (a[field] < b[field]) {
                return 1;
              }
              if (a[field] > b[field]) {
                return -1;
              }
              return 0;
         })
    }

    searchElements(){
        const searchHeandler = (e) => {
            this.searchText = e.target.value;
            const exp = new RegExp(this.searchText, 'i');

            this.searchData = this.data.filter(el => {
                if (this.searchText != '' && this.searchText != ' ' && el[this.columns[1]].search(exp) != -1) {
                    return el;
                } else if(this.searchText == ''){
                    return el;
                }
            });

            this.sliceArray(this.searchData, 'search');
            
            this.pages = Math.ceil(this.searchData.length / this.options.limit);
            
            this.$pagination.replaceWith(this.htmlPagination());
            
            this.navigationElements('d');
        };

        this.$searchField.addEventListener('input', searchHeandler);
    }

    sliceArray(data, mode = ''){
        if(mode == 'search'){
            this.offset = (this.currentPage * this.limit) - this.limit;// (4 * 3) - 3 = 9
            this.currentData = data.slice(0, 0 + this.limit);
            this.$table.innerHTML = this.htmlTd(this.currentData);
        }
        this.offset = (this.currentPage * this.limit) - this.limit;// (4 * 3) - 3 = 9
        this.currentData = data.slice(this.offset, this.offset + this.limit);
    }

    navigationElements(mode=''){
        const handlerClick = (e) => {
            this.getDOMElementsForComponent();
            if(this.isClickPaginationItemButton(e)){
                this.currentPage = Number(e.target.textContent);
            }
        
            if(this.isClickPrevButton(e)){
                if(this.currentPage > 1) {
                    this.currentPage -= 1;
                }else{
                    this.currentPage = this.pages;
                }
            }
        
            if(this.isClickNextButton(e)){
                if(this.currentPage < this.pages) {
                    this.currentPage += 1;
                }else{
                    this.currentPage = 1;
                }
            }
            
            if(mode == 'd'){
                this.sliceArray(this.searchData);
            }else{
                this.sliceArray(this.data);
            }
            
            this.$table.innerHTML = this.htmlTd(this.currentData);
           
        };

        this.$pagination.addEventListener('click', handlerClick);
    }

    htmlSearch(){
        this.$searchField = document.createElement('div');
        this.$searchField.className = 'search';
        let html = `<input type="text" name="search" class="search-field">`;
        this.$searchField.innerHTML = html;
        return this.$searchField;
    }

    htmlPagination(){
        const pagination = document.createElement('nav');
        pagination.className = 'pagination';
        let html = '<ul>';
        html += '<li class="pagination-prev">Назад</li>';
        for(let i = 1; i <= this.pages; i++){
            html += `<li class="pagination-item">${i}</li>`;
        }
        html += '<li class="pagination-next">Вперед</li>';
        html += '</ul>';
        pagination.innerHTML = html;
        return pagination;
    }

    isClickPrevButton(e){
        return e.target.className === 'pagination-prev';
    }

    isClickNextButton(e){
        return e.target.className === 'pagination-next';
    }

    isClickSortButton(e){
        return e.target.className === 'sort';
    }

    isClickPaginationItemButton(e){
        return e.target.className === 'pagination-item';
    }

}