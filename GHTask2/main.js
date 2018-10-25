var string = prompt('Enter your string:', '');

function stringCheck(str) {
    var el = [];
    for (var i = 0; i < str.length; i++) {
        if (str[i] == "{" || str[i] == "[" || str[i] == "(" || str[i] == "'" || str[i] == "`" || str[i] == "\"") {
            el.push(str[i]);
        } else if (str[i] == "}") {
            if (el[el.length - 1] == "{") {
                el.pop();
            }
        } else if (str[i] == "]") {
            if (el[el.length - 1] == "[") {
                el.pop();
            }
        } else if (str[i] == ")") {
            if (el[el.length - 1] == "(") {
                el.pop();
            }
        }
        for(var j=0;j<=el.length - 2;j++){
            if (el[el.length - 1] == "'" && el[j] == "'" || el[el.length - 1] == "`" && el[j] == "`" || el[el.length - 1] == "\"" && el[j] == "\""){
                el.splice([j]);
            }
        }
    }
    return el;
}

var result = stringCheck(string);
if (result.length == 0) {
    alert('Code is correct!');
} else {
    alert('Don\'t close: ' + result.reverse());
}