export class Datatable{

    constructor(data, columns=[], titles, sortable=[], options={}){
        this.data = data;
        this.total = data.length;
        this.columns = columns;
        this.titles = titles;
        this.sortable = sortable;

        this.currentData = [];
        this.searchData = data;
        this.options = options;

        this.mode = false;

        this.$el = document.querySelector(this.options.datatableSelector);
        this.$pagination = document.querySelector(this.options.datatableSelector + ' .pagination');
        this.$table = document.querySelector(this.options.datatableSelector + ' table');
        this.$search = document.querySelector(this.options.datatableSelector + ' #search');

        this.currentPage = this.options.currentPage;
        this.offset = this.options.offset;
        this.limit = this.options.limit;
        this.pages = Math.ceil(this.options.total / this.options.limit);
    }

    sortField(array, field) {
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


    sortFieldA(array, field) {
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

    sliceArraySearch(){
        this.offset = (this.currentPage * this.limit) - this.limit;
        this.currentData = this.data.slice(this.offset, this.offset + this.limit);
    }

    drawTh(titles, columns, sortable){
        let html = `<tr>`;
        html += titles.map((title, index) => `<th>${ title }<span class="sort" data-sorted=${sortable.includes(columns[index]) ? 'true ': 'false'}>
            <span class="sort-up" data-sort=${columns[index]}>Up</span><span class="sort-down" data-sort=${columns[index]}>Down</span>
        </span></th>`).join('');
        html += '</tr>';
        return html;
    }

    drawTd(data){
        if(this.columns.includes('actions')){
            return data.map(item => `<tr>
                <td>${ item.id }</td><td>${ item.title }</td><td>${ item.cal }</td><td>${ item.gi }</td>
                <td>
                <div class="action-list">
                    <span class="action-delete" data-actionId=${ item.id }>Del</span>
                    <span class="action-update" data-actionId=${ item.id }>Update</span>
                </div>
                </td>
            <tr>`).join('');
        }else{
            return data.map(item => `<tr>
                <td>${ item.id }</td><td>${ item.title }</td><td>${ item.cal }</td><td>${ item.gi }</td>
            <tr>`).join('');
        }
    }

    drawTable(){
        this.$table.innerHTML = '';
        const thead = document.createElement('thead');
        thead.innerHTML = this.drawTh(this.titles, this.columns, this.sortable);
        this.$table.append(thead);
        const tbody = document.createElement('tbody');
        tbody.innerHTML = this.drawTd(this.currentData);
        this.$table.append(tbody);
    }

    drawPagination(pages){
        let html = '<li class="pagination-prev">Назад</li>';
        for(let i = 1; i <= pages; i++){
            html += `<li class="pagination-item">${i}</li>`;
        }
        html += '<li class="pagination-next">Вперед</li>';
        return html;
    }

    sliceArray(data){
        this.offset = (this.currentPage * this.limit) - this.limit;
        this.currentData = data.slice(this.offset, this.offset + this.limit);
    }

    render(){

        this.sliceArray(this.searchData);

        this.$pagination.innerHTML = this.drawPagination(this.pages);
        
        this.drawTable();

        const handleAction = (e) => {
            
            if(e.target.className === 'action-delete'){
                let id = e.target.dataset.actionid;
                this.data = this.data.filter(el => el.id != id);
                this.currentData = this.currentData.filter(el => el.id != id);
                this.sliceArray(this.data);
                this.drawTable();
            }
            
        }

        const actions = document.querySelectorAll('.action-list');

        this.$table.addEventListener('click', handleAction);

        const handlerClick = (e) => {
            
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
        
            this.sliceArray(this.searchData);
            this.drawTable();
        
        }

        const handlerSearch = (e) => {

            const searchField = e.target.value;
            const exp = new RegExp(searchField, 'i');

            this.searchData = this.data.filter(el => {

                if (searchField != '' && searchField != ' ' && el.title.search(exp) != -1) {
                    return el;
                } else if(searchField == ''){
                    return el;
                }
                
            });

            this.pages = Math.ceil(this.searchData.length / this.options.limit);
            this.$pagination.innerHTML = this.drawPagination(this.pages);
            this.sliceArray(this.searchData);
            this.drawTable();
        }

        const handleSort = (e) => {
            
            if(e.target.className === 'sort-up'){
                
                if(this.searchData.length){
                    this.sortField(this.searchData, e.target.dataset.sort);
                    this.sliceArray(this.searchData);
                    
                    
                }else{
                    this.sortField(this.data, e.target.dataset.sort);
                    this.sliceArray(this.data);
                }
                
                this.drawTable();
            }

            if(e.target.className === 'sort-down'){
               
                if(this.searchData.length){
                    this.sortFieldA(this.searchData, e.target.dataset.sort);
                    this.sliceArray(this.searchData);
                    
                    
                }else{
                    this.sortFieldA(this.data, e.target.dataset.sort);
                    this.sliceArray(this.data);
                }
                
                this.drawTable();
            }
        }

        this.$table.addEventListener('click', handleSort);

        this.$pagination.addEventListener('click', handlerClick);

        this.$search.addEventListener('input', handlerSearch);

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