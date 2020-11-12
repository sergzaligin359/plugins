export class Pie {
    constructor(data, options={}){
        this.data = data;
        this.buttons = document.querySelector('.buttons');
        this.pie = document.querySelector('.pie'),
        this.activeClass = 'active';
        // need see radius
        this.total = 100; 

    }

    convertNumberToPercentage(num){
        return ((num * this.total) / 100);
    }

    setPieChart(name) {
        const number = this.data[name];
        const fixedNumber = this.convertNumberToPercentage(number);
        const result = fixedNumber + ' ' + this.total;
        this.pie.style.strokeDasharray = result;
    }

    setActiveClass(el) {
        for(let i = 0; i < this.buttons.children.length; i++) {
          this.buttons.children[i].classList.remove(this.activeClass);
          el.classList.add(this.activeClass);
        }
    }

    drawButton(){
        for(let property in this.data) {
            const newBtn = document.createElement('button');
            newBtn.innerText = property;
            newBtn.setAttribute('data-name', property);
            this.buttons.appendChild(newBtn);
        }
    }
    render(){
        console.log('Pie', this.data);
        this.drawButton();
        this.setPieChart('asia');
        this.setActiveClass(this.buttons.children[0]);

        this.buttons.addEventListener('click', (e) => {
            console.log('Pie click');
            if(e.target != e.currentTarget) {
                const el = e.target,
                name = el.getAttribute('data-name');
                this.setPieChart(name);
                this.setActiveClass(el);
            }
            e.stopPropagation();
        });
    }
}