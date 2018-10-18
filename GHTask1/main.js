var n = 1000;

var ifFuncCode = 'if(y == 0){}';
var switchFuncCode = 'switch (y){case 0:break;';
for (var x = 1; x < n; x++) {
    ifFuncCode += `else if(y == ${x}){}`;
    switchFuncCode += `case ${x}:break;`;
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