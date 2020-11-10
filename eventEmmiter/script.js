console.log('start event emitter...');

const input1 = document.getElementById('text1');
const input2 = document.getElementById('text2');

input1.addEventListener('input', (e) => {
    const target = e.target.value;
    console.log('Input text1', e.target.value);
    $emit('input1:input', target);
});

$on('input1:input', (data) => {
    console.log('ON ==>', data);
    input2.value = data;
});

































// emitter.subscribe('sergEvent', (data) => console.log('Some data sergEvent', data));
// emitter.emit('sergEvent', { name: 'Sergey' });