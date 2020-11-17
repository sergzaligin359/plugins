export class Carusel {

    constructor(data, columns, options={}){
        this.options = options;

        this.data = data;
        this.columns = columns;
        this.emptyData = options.emptyData;
        this.currentData = [];
        this.total = data.length;

        this.currentPage = 1;
        this.offset = 0;

        this.offset = options.offset;
        this.limit = document.body.clientWidth > 640 ? options.limit : 2;

        // this.outCnt = (this.offset + this.limit) < this.total ? (this.offset + this.limit) : this.total;

        //console.log('window.screen.width ===>', document.body.clientWidth);

        this.pages = Math.ceil(this.total / options.limit);

        this.$out = null;
        this.$pagination = null;

        this.$wrapper = document.querySelector(options.selector);

        this.$wrapper.innerHTML = '';
    }

    init(){
        this.$wrapper.style.display = 'block';
        this.$wrapper.innerHTML = '<div>LOADING...</div>';

        setTimeout(() => {
            this.$wrapper.innerHTML = '';
            this.sliceArray(this.data);
            this.draw();
            
            const handlerClick = (e) => {
           
                // console.log('click currentPage  ===>', this.offset + this.limit);
                // this.$cnt = document.querySelector(this.options.selector + ' .cnt');
                
                if(this.isClickPrevButton(e)){
                    
                    if(this.currentPage > 1) {
                        this.currentPage -= 1;
                        this.$out.textContent = this.$out.textContent - this.data.slice(this.offset, this.offset + this.limit).length;
                    }else{
                        this.currentPage = this.pages;
                        this.$out.textContent = +this.total;
                    }
                }
            
                if(this.isClickNextButton(e)){
                    
                    if(this.currentPage < this.pages) {
                        this.currentPage += 1;
                        this.$out.textContent = +this.$out.textContent + this.limit < this.total ? +this.$out.textContent + this.limit : this.total;
                    }else{
                        this.currentPage = 1;
                        this.$out.textContent = +this.limit;
                    }
                }
    
                this.sliceArray(this.data);
                this.$content = document.querySelector(this.options.selector + ' .carusel');
                this.$content.innerHTML = this.htmlContent(this.currentData);
                
                //this.drawContent();
            }

            this.$pagination.addEventListener('click', handlerClick);
        }, 300);
    }

    sliceArray(data){
        this.offset = (this.currentPage * this.limit) - this.limit;
        this.currentData = data.slice(this.offset, this.offset + this.limit);
    }

    isClickPrevButton(e){
        return e.target.className === 'pagination-prev';
    }

    isClickNextButton(e){
        return e.target.className === 'pagination-next';
    }

    sliceArray(data){
        this.offset = (this.currentPage * this.limit) - this.limit;
        this.currentData = data.slice(this.offset, this.offset + this.limit);
    }

    htmlContent(data){
        let html = '';
        html += data.map((el) => {
            return `
            <figure>
                <img src="/${el[this.columns[0]]}" alt="1">
                <figcaption>${el[this.columns[1]]}: <a href="#">подробнее</a></figcaption>
            </figure>
            `
        }).join('');
        return html;
    }

    htmlNavigation(){
        return `
            <button class="pagination-prev">Back</button>
            <span class="out">${(this.offset + this.limit) < this.total ? (this.offset + this.limit) : this.total}</span> из <span>${this.total}</span>
            <button class="pagination-next">Next</button>
        `;
    }

    drawNavigation(){
        const navWrap = document.createElement('div');
        navWrap.className = 'pagination';
        navWrap.innerHTML = this.htmlNavigation();
        this.$wrapper.append(navWrap);
    }

    drawContent(){
        const conWrap = document.createElement('div');
        conWrap.className = 'carusel';
        conWrap.innerHTML = this.htmlContent(this.currentData);
        this.$wrapper.append(conWrap);
    }

    draw(){
        this.drawContent();
        this.drawNavigation();
        this.$out = document.querySelector(this.options.selector + ' .out');
        this.$pagination = document.querySelector(this.options.selector + ' .pagination');
        // console.log('CNT out', this.$out);
    }

    prepare(){
        if(document.body.clientWidth < 640){
            this.limit = 2;
        }
    }

    render(){
        if(this.data.length){
            this.init();
            

        }else{
            this.$wrapper.innerHTML = `${this.emptyData}`;
        }
    }
}