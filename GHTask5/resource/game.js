var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var sizeInput = document.getElementById('size');
var changeSize = document.getElementById('change-size');
var scoreLabel = document.getElementById('score');
var score = 0;
var size = 4;
var width = canvas.width / size - 6;
var cells = [];
var fontSize;
var loss = false;
var result = document.getElementById('result');
startGame();

changeSize.onclick = function () {
    if (sizeInput.value >= 2 && sizeInput.value <= 20) {
        size = sizeInput.value;
        width = canvas.width / size - 6;
        canvasClean();
        startGame();
        loss = false;
        canvas.style.opacity = '1';
        score = 0;
        scoreLabel.innerHTML = '';
    }
}

function Cell(row, col) {
    this.value = 0;
    this.x = col * width + 5 * (col + 1);

    this.y = row * width + 5 * (row + 1);
}

function createCells() {
    var i, j;
    for(i = 0; i < size; i++) {
        cells[i] = [];
        for(j = 0; j < size; j++) {
            cells[i][j] = new Cell(i, j);
        }
    }
}

function drawCell(cell) {
    ctx.beginPath();
    ctx.rect(cell.x, cell.y, width, width);
    switch (cell.value){
        case 0 : ctx.fillStyle = '#D2B48C'; break;
        case 2 : ctx.fillStyle = '#D8BFD8'; break;
        case 4 : ctx.fillStyle = '#BA55D3'; break;
        case 8 : ctx.fillStyle = '#ffbf00'; break;
        case 16 : ctx.fillStyle = '#FF0000'; break;
        case 32 : ctx.fillStyle = '#4B0082'; break;
        case 64 : ctx.fillStyle = '#32CD32'; break;
        case 128 : ctx.fillStyle = '#FF7F50'; break;
        case 256 : ctx.fillStyle = '#191970'; break;
        case 512 : ctx.fillStyle = '#ff0080'; break;
        case 1024 : ctx.fillStyle = '#D2691E'; break;
        case 2048 : ctx.fillStyle = '#8B008B'; break;
        case 4096 : ctx.fillStyle = '#008B8B'; break;
        default : ctx.fillStyle = '#ff0080';
    }
    ctx.fill();
    if (cell.value) {
        fontSize = width / 2;
        ctx.font = fontSize + 'px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(cell.value, cell.x + width / 2, cell.y + width / 2 + width/7);
    }
}

function canvasClean() {
    ctx.clearRect(0, 0, 500, 500);
}

document.onkeydown = function (event) {
    if (!loss) {
        if (event.keyCode === 38 || event.keyCode === 87) {
            moveUp();
        } else if (event.keyCode === 39 || event.keyCode === 68) {
            moveRight();
        } else if (event.keyCode === 40 || event.keyCode === 83) {
            moveDown();
        } else if (event.keyCode === 37 || event.keyCode === 65) {
            moveLeft();
        }
        scoreLabel.innerHTML = 'Score : ' + score;
    }
}

var startPoint={};
var nowPoint;
var ldelay;
document.ontouchstart = function(event) {
    startPoint.x=event.changedTouches[0].pageX;
    startPoint.y=event.changedTouches[0].pageY;
    ldelay=new Date();
}

document.ontouchend = function(event) {
    console.log('end')
    var pdelay=new Date();
    nowPoint=event.changedTouches[0];
    var xAbs = Math.abs(startPoint.x - nowPoint.pageX);
    console.log(xAbs)
    var yAbs = Math.abs(startPoint.y - nowPoint.pageY);
    console.log(yAbs)
    if ((xAbs > 20 || yAbs > 20) && (pdelay.getTime()>ldelay.getTime())) {
        if (xAbs > yAbs) {
            if (nowPoint.pageX < startPoint.x){
                moveLeft();
            }
            else{
                moveRight();
            }
        }
        else {
            if (nowPoint.pageY < startPoint.y){
                moveUp();
            }
            else{
                moveDown();
            }
        }
    }
    scoreLabel.innerHTML = 'Score : ' + score;
}

function startGame() {
    result.innerHTML = '';
    createCells();
    drawAllCells();
    pasteNewCell();
    pasteNewCell();
}

function finishGame() {
    canvas.style.opacity = '0.5';
    loss = true;
    result.innerHTML = 'Game Over';
}

function drawAllCells() {
    var i, j;
    for(i = 0; i < size; i++) {
        for(j = 0; j < size; j++) {
            drawCell(cells[i][j]);
        }
    }
}

function pasteNewCell() {
    var countFree = 0;
    var i, j;
    for(i = 0; i < size; i++) {
        for(j = 0; j < size; j++) {
            if(!cells[i][j].value) {
                countFree++;
            }
        }
    }
    if(!countFree) {
        finishGame();
        return;
    }
    while(true) {
        var row = Math.floor(Math.random() * size);
        var col = Math.floor(Math.random() * size);
        if(!cells[row][col].value) {
            cells[row][col].value = 2 * Math.ceil(Math.random() * 2);
            drawAllCells();
            return;
        }
    }
}

function moveRight () {
    var i, j;
    var coll;
    for(i = 0; i < size; i++) {
        for(j = size - 2; j >= 0; j--) {
            if(cells[i][j].value) {
                coll = j;
                while (coll + 1 < size) {
                    if (!cells[i][coll + 1].value) {
                        cells[i][coll + 1].value = cells[i][coll].value;
                        cells[i][coll].value = 0;
                        coll++;
                    } else if (cells[i][coll].value === cells[i][coll + 1].value) {
                        cells[i][coll + 1].value *= 2;
                        score +=  cells[i][coll + 1].value;
                        cells[i][coll].value = 0;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    pasteNewCell();
}

function moveLeft() {
    var i, j;
    var coll;
    for(i = 0; i < size; i++) {
        for(j = 1; j < size; j++) {
            if(cells[i][j].value) {
                coll = j;
                while (coll - 1 >= 0) {
                    if (!cells[i][coll - 1].value) {
                        cells[i][coll - 1].value = cells[i][coll].value;
                        cells[i][coll].value = 0;
                        coll--;
                    } else if (cells[i][coll].value === cells[i][coll - 1].value) {
                        cells[i][coll - 1].value *= 2;
                        score +=   cells[i][coll - 1].value;
                        cells[i][coll].value = 0;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    pasteNewCell();
}

function moveUp() {
    var i, j, row;
    for(j = 0; j < size; j++) {
        for(i = 1; i < size; i++) {
            if(cells[i][j].value) {
                row = i;
                while (row > 0) {
                    if(!cells[row - 1][j].value) {
                        cells[row - 1][j].value = cells[row][j].value;
                        cells[row][j].value = 0;
                        row--;
                    } else if (cells[row][j].value === cells[row - 1][j].value) {
                        cells[row - 1][j].value *= 2;
                        score +=  cells[row - 1][j].value;
                        cells[row][j].value = 0;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    pasteNewCell();
}

function moveDown() {
    var i, j, row;
    for(j = 0; j < size; j++) {
        for(i = size - 2; i >= 0; i--) {
            if(cells[i][j].value) {
                row = i;
                while (row + 1 < size) {
                    if (!cells[row + 1][j].value) {
                        cells[row + 1][j].value = cells[row][j].value;
                        cells[row][j].value = 0;
                        row++;
                    } else if (cells[row][j].value === cells[row + 1][j].value) {
                        cells[row + 1][j].value *= 2;
                        score +=  cells[row + 1][j].value;
                        cells[row][j].value = 0;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    pasteNewCell();
}