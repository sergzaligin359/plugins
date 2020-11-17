export class Carusel {

    constructor(data, options={}){
        this.data = data;
        this.currentData = [];
        this.total = options.total;

        this.options = options;
        this.currentPage = this.options.currentPage;
        this.offset = this.options.offset;

        //console.log('window.screen.width ===>', document.body.clientWidth);
        this.options.limit = document.body.clientWidth > 640 ? options.limit : 2;
        this.limit = this.options.limit;

        this.pages = Math.ceil(this.options.total / this.options.limit);

        this.$wrapper = document.querySelector(this.options.selector);
        this.$content = document.querySelector(this.options.selector + ' .carusel');
        this.$pagination = document.querySelector(this.options.selector + ' .pagination');

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
        html += data.map(el => {
            return `
            <figure>
                <img src="/${el.src}" alt="1">
                <figcaption>${el.title}: <a href="http://www.flickr.com/photos/rclark/">подробнее</a></figcaption>
            </figure>
            `
        }).join('');
        return html;
    }

    htmlNavigation(){
        return `<button class="pagination-prev">Back</button><span class="cnt">${this.offset + this.limit}</span> из ${this.total}<button class="pagination-next">Next</button>`;
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
        
        this.$content.innerHTML = '';
        this.drawContent();
    }
    prepare(){
        if(document.body.clientWidth < 640){
            this.limit = 2;
        }
    }
    render(){
        //document.body.clientWidth > 640 ? 4 : 2
        this.$wrapper.innerHTML = '';
        this.sliceArray(this.data);

        this.draw();
        this.$pagination.innerHTML = this.drawNavigation();

        this.$pagination = document.querySelector(this.options.selector + ' .pagination');
        this.$cnt = document.querySelector(this.options.selector + ' .cnt');

        const handlerClick = (e) => {
           
            console.log('click currentPage  ===>', this.offset + this.limit);
            this.$cnt = document.querySelector(this.options.selector + ' .cnt');
            
            if(this.isClickPrevButton(e)){
                
                if(this.currentPage > 1) {
                    this.currentPage -= 1;
                    this.$cnt.textContent = this.$cnt.textContent - this.data.slice(this.offset, this.offset + this.limit).length;
                }else{
                    this.currentPage = this.pages;
                    this.$cnt.textContent = +this.total;
                }
            }
        
            if(this.isClickNextButton(e)){
                
                if(this.currentPage < this.pages) {
                    this.currentPage += 1;
                    this.$cnt.textContent = +this.$cnt.textContent + this.limit < this.total ? +this.$cnt.textContent + this.limit : this.total;
                }else{
                    this.currentPage = 1;
                    this.$cnt.textContent = +this.limit;
                }
            }

            this.$content = document.querySelector(this.options.selector + ' .carusel');
            this.$content.remove();
            this.sliceArray(this.data);
            this.draw();
            this.$wrapper.append(this.$pagination);
        
        }
        
        this.$pagination.addEventListener('click', handlerClick);
    }
}