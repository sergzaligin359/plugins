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

        this.searchText = '';

        this.$wrapper = document.querySelector(this.options.selector);
        this.$wrapper.innerHTML = '';
        
    }

    htmlTh(titles, columns, sortable){
        let html = `<tr>`;
        html += titles.map((title, index) => `
            <th>
                ${ title }
                <span class="sort" data-sorted=${sortable.includes(columns[index]) ? 'true ': 'false'}>
                    <span class="sort-up" data-sort=${columns[index]}>Up</span>
                    <span class="sort-down" data-sort=${columns[index]}>Down</span>
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

    htmlSearch(){
        this.$searchField = document.createElement('div');
        this.$searchField.className = 'search';
        let html = `<input type="text" name="search" class="search-field">`;
        this.$searchField.innerHTML = html;
        return this.$searchField;
    }

    htmlTable(){
        this.$table = document.createElement('table');
        this.$table.border = 1;
        const thead = document.createElement('thead');
        thead.innerHTML = this.htmlTh(this.titles, this.columns, this.sortable);
        this.$table.append(thead);
        const tbody = document.createElement('tbody');
        tbody.innerHTML = this.htmlTd(this.currentData);
        this.$table.append(tbody);
        return this.$table;
    }

    htmlPagination(){
        this.$pagination = document.createElement('nav');
        this.$pagination.className = 'pagination';
        let html = '<ul>';
        html += '<li class="pagination-prev">Назад</li>';
        for(let i = 1; i <= this.pages; i++){
            html += `<li class="pagination-item">${i}</li>`;
        }
        html += '<li class="pagination-next">Вперед</li>';
        html += '</ul>';
        this.$pagination.innerHTML = html;
        return this.$pagination;
    }

    getDOMElementsForComponent(){
        this.$searchField = document.querySelector(this.options.selector + ' .search .search-field');
        this.$table = document.querySelector(this.options.selector + ' tbody');
        this.$pagination = document.querySelector(this.options.selector + ' .pagination');
    }

    draw(){
        const searchField = this.htmlSearch();
        const table = this.htmlTable();
        const pagination = this.htmlPagination();
        this.$wrapper.append(searchField);
        this.$wrapper.append(table);
        this.$wrapper.append(pagination);

        this.getDOMElementsForComponent();
    }
    // 11
    sliceArray(data, mode = ''){
        console.log('sliceArray', data)
        if(mode == 'search'){
            this.offset = (this.currentPage * this.limit) - this.limit;// (4 * 3) - 3 = 9
            this.currentData = data.slice(0, 0 + this.limit);
            //this.currentData = data.slice(this.offset, this.offset + this.limit);
            console.log('sliceArray current data', this.currentData)
            this.$table.innerHTML = this.htmlTd(this.currentData);
        }
        this.offset = (this.currentPage * this.limit) - this.limit;// (4 * 3) - 3 = 9
        this.currentData = data.slice(this.offset, this.offset + this.limit);
    }

    searchElements(){
        const searchHeandler = (e) => {
            this.searchText = e.target.value;
            const exp = new RegExp(this.searchText, 'i');

            this.searchData = this.data.filter(el => {
                if (this.searchText != '' && this.searchText != ' ' && el.title.search(exp) != -1) {
                    return el;
                } else if(this.searchText == ''){
                    return el;
                }
            });
            console.log('First search', this.searchData);
            // this.currentData = this.searchData;

            // this.sliceArray(this.searchData, 'd');

            this.sliceArray(this.searchData, 'search');
            
            
            //this.currentData = this.searchData;

            this.pages = Math.ceil(this.searchData.length / this.options.limit);
            console.log('search this.currentPage', this.currentPage);
            console.log('search this.searchData', this.searchData);
            console.log('search this.currentData', this.currentData);
            
            this.$pagination.replaceWith(this.htmlPagination());
            
            this.navigationElements('d');
        };

        this.$searchField.addEventListener('input', searchHeandler);
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

            // console.log('pagination', this.currentPage)
            console.log('click this.pages', this.pages);
            console.log('click this.searchData', this.searchData);
            console.log('click this.currentData', this.currentData);
        };

        this.$pagination.addEventListener('click', handlerClick);
    }

    render(){
        if(this.data.length > 0){
            this.sliceArray(this.data);
            this.draw();
            this.searchElements();
            this.navigationElements();
        }else{
            this.$wrapper.style.display = 'block';
            this.$wrapper.innerHTML = `${this.emptyData}`;
        }
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

    $emit(event, ...args) {
        this.emitter.emit(event, ...args);
    }

    $on(event, fn) {
        this.emitter.subscribe(event, fn);
    }

}