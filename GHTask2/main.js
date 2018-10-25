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
        if (el[el.length - 1] == "'" && el[el.length - 2] == "'" || el[el.length - 1] == "`" && el[el.length - 2] == "`" || el[el.length - 1] == "\"" && el[el.length - 2] == "\"") {
            el.splice([el.length - 2]);
        }
        if (el[el.length - 3] == "'" && el[el.length - 1] == "'" || el[el.length - 3] == "`" && el[el.length - 1] == "`" || el[el.length - 3] == "\"" && el[el.length - 1] == "\"") {
            el.splice([el.length - 3]);
        }
    }
    return el;
}

var result = stringCheck(string);
if (result.length == 0) {
    alert('Code is correct!');
} else {
    alert('Don\'t close: ' + result);
}