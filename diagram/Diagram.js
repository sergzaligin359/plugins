export class Diagram {
    constructor(data, options={}){
        this.data = data;
        this.unitsList = document.querySelectorAll('.unit');
        this.chart = document.querySelector('.chart');
    }
    render(){
        console.log('Diagram', this.data, this.unitsList);
        // transform: rotate(180deg);
        this.unitsList[0].style.strokeDasharray = `${this.data.gi} 100`;
        this.unitsList[0].style.stroke = `green`;

        this.chart.style.transform = `rotate(-90deg)`;

        this.unitsList[1].style.strokeDasharray = `${100 - this.data.gi} 100`;
        this.unitsList[1].style.strokeDashoffset = `-${this.data.gi}`;
        this.unitsList[1].style.stroke = `gray`;

        // this.unitsList[1].style.transform = `rotate(90deg)`;
    }
}