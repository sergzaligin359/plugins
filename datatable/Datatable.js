export class Datatable{

    constructor(data, columns=[], titles, options={}){
        this.data = data;
        this.total = data.length;
        this.columns = columns;
        this.titles = titles;
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

    sortField(array) {
        array.sort(function(a, b) {
            if (a.gi > b.gi) {
                return 1;
              }
              if (a.gi < b.gi) {
                return -1;
              }
              return 0;
          })
        console.log('Sorting process...', array);
    }

    sliceArraySearch(){
        this.offset = (this.currentPage * this.limit) - this.limit;
        this.currentData = this.data.slice(this.offset, this.offset + this.limit);
    }

    drawTh(titles, columns){
        let html = `<tr>`;
        html += titles.map((title, index) => `<th>${ title }<span class="sort" data-sort=${columns[index]}>Sort</span></th>`).join('');
        html += '</tr>';
        return html;
    }

    drawTd(data){
        return data.map(item => `<tr><td>${ item.id }</td><td>${ item.title }</td><td>${ item.cal }</td><td>${ item.gi }</td><tr>`).join('');
    }

    drawTable(){
        this.$table.innerHTML = '';
        const thead = document.createElement('thead');
        thead.innerHTML = this.drawTh(this.titles, this.columns);
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
        // html += `<span> ${this.offset} из ${ this.total } </span>`;
        return html;
    }

    sliceArray(data){
        this.offset = (this.currentPage * this.limit) - this.limit;
        this.currentData = data.slice(this.offset, this.offset + this.limit);
        // console.log('sliceArray() currentData ===>', this.currentData);
    }

    render(){

        this.sliceArray(this.searchData);

        this.$pagination.innerHTML = this.drawPagination(this.pages);
        
        this.drawTable();

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

            console.log('Search text', e.target.value);
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
            // this.sliceArray();
            console.log('new this.searchData ===>', this.searchData);
            this.drawTable();
        }

        const handleSort = (e) => {
            if(this.isClickSortButton(e)){
                console.log('SORT', e.target.dataset.sort);
               // this.sortField(this.data);
                if(this.searchData.length){
                    this.sortField(this.searchData);
                    this.sliceArray(this.searchData);
                    
                    
                }else{
                    this.sortField(this.data);
                    this.sliceArray(this.data);
                }
                
                this.drawTable();
            }
        }

        this.$table.addEventListener('click', handleSort);

        this.$pagination.addEventListener('click', handlerClick);

        this.$search.addEventListener('input', handlerSearch);

        // this.$pagination.removeEventListener('click', handlerClick, false);
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