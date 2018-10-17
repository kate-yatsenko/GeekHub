var n = 1000;
var funcCode = 'switch (x){';
for (var x = 1; x <= n; x++) {
    funcCode += `case ${x}:break;`;
}
funcCode += '}';

function switchMultipleCall() {
    for (var i = 1; i <= n; i++) {
        var switchOneCall = new Function('x', funcCode)(i);
    }
}

console.time('switchTime');
switchMultipleCall();
console.timeEnd('switchTime');