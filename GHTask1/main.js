var n = 1000;

var ifFuncCode = '';
var switchFuncCode = 'switch (y){';
for (var x = 0; x < n; x++) {
    ifFuncCode += `if(y == ${x}){}`;
    switchFuncCode += `case ${x} :break;`;
}
switchFuncCode += '}';

function switchMultipleCall() {
    for (var i = 0; i < n; i++) {
        var switchOneCall = new Function('y', switchFuncCode)(i);
    }
}

function ifMultipleCall() {
    for (var i = 0; i < n; i++) {
        var ifOneCall = new Function('y', ifFuncCode)(i);
    }
}

console.time('switchTime');
switchMultipleCall();
console.timeEnd('switchTime');

console.time('ifTime');
ifMultipleCall();
console.timeEnd('ifTime');