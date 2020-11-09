export class Datatable{

    constructor(data, columns=[], options={}){
        this.data = data;
        this.columns = columns;
        this.currentData = [];
        this.options = options;

        this.$el = document.querySelector(this.options.datatableSelector);
        this.$pagination = document.querySelector(this.options.datatableSelector + ' .pagination');

        this.currentPage = this.options.currentPage;
        this.offset = this.options.offset;
        this.limit = this.options.limit;
        this.pages = Math.ceil(this.options.total / this.options.limit);
    }

    drawPaginationItems(pages){
        let html = '<li class="pagination-prev">Назад</li>';
        for(let i = 1; i <= pages; i++){
            html += `<li class="pagination-item">${i}</li>`;
        }
        html += '<li class="pagination-next">Вперед</li>';
        return html;
    }

    render(){
        this.$pagination.innerHTML = this.drawPaginationItems(this.pages);

        this.$pagination.addEventListener('click', (e) => {
            //console.log('pagination click ===>');
            if(e.target.className === 'pagination-item'){
                this.currentPage = Number(e.target.textContent);
            }
        
            if(e.target.className === 'pagination-prev'){
                if(this.currentPage > 1) {
                    this.currentPage -= 1;
                }else{
                    this.currentPage = this.pages;
                }
            }
        
            if(e.target.className === 'pagination-next'){
                if(this.currentPage < this.pages) {
                    this.currentPage += 1;
                }else{
                    this.currentPage = 1;
                }
            }
        
            this.offset = (this.currentPage * this.limit) - this.limit;
            this.currentData = this.data.slice(this.offset, this.offset + this.limit);
            console.log('currentData ===>', this.currentData);
            // table.innerHTML = drawTr(currentData);
        
        });
    }
}