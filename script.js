var rows = 10;
var cols = 10;
var size = 50;

var BoardContainer = document.getElementById("gameboard");

for (i = 0; i < cols; i++) {
    for (j = 0; j < rows; j++) {

        var square = document.createElement("div");
        BoardContainer.appendChild(square);

        square.id = 's' + j + i;

        var topPosition = j * size;
        var leftPosition = i * size;

        square.style.top = topPosition + 'px';
        square.style.left = leftPosition + 'px';
    }
}