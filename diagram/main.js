import { Diagram } from './Diagram.js';
import { data } from './data.js';

const diagram = new Diagram(data, {});

diagram.render();

// console.log('Diagram...');

// let unitsList = document.querySelectorAll('.unit');
// console.log('unitsList', unitsList[0]);

// unitsList[0].style.strokeDasharray = `30 100`;
// unitsList[0].style.stroke = `green`;

// unitsList[1].style.strokeDasharray = `70 100`;
// unitsList[1].style.strokeDashoffset = `-30`;
// unitsList[1].style.stroke = `gray`;

// unitsList[0].style.strokeDashoffset = -90;