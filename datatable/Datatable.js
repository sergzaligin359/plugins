export class Datatable{

    constructor(data=[], columns=[], titles=[], sortable=[], options={}){
        this.options = options;

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
        this.emptyData = this.options.emptyData;
        
        this.$pagination = null;
        this.$table = null;
        this.$searchField = null;

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
        html += '</tr>';
        return html;
    }

    htmlTd(data){
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

    htmlSearch(){
        this.$searchField = document.createElement('div');
        this.$searchField.className = 'search-field';
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

    draw(){
        const searchField = this.htmlSearch();
        const table = this.htmlTable();
        const pagination = this.htmlPagination();
        this.$wrapper.append(searchField);
        this.$wrapper.append(table);
        this.$wrapper.append(pagination);
    }

    render(){
        if(this.data.length){
            this.draw();
        }else{
            this.$wrapper.style.display = 'block';
            this.$wrapper.innerHTML = `${this.emptyData}`;
        }
    }

}