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

var hitCount = 0;

var gameBoard = [
    [0,0,0,1,1,1,1,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,0],
    [0,0,0,0,0,0,1,0,0,0],
    [1,0,0,0,0,0,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0],
    [1,0,0,1,0,0,0,0,0,0],
    [1,0,0,1,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0]
]

BoardContainer.addEventListener("click", fire, false);

function fire(e) {

    if (e.target !== e.currentTarget) {
        var row = e.target.id.substring(1,2);
        var col = e.target.id.substring(2,3);


    if (gameBoard[row][col] == 0) {
        e.target.style.background = '#bb0609';
    } else if (gameBoard[row][col] == 1) {
        e.target.style.background = '#0dbb1f';

        hitCount++;
        if (hitCount == 17) {
            alert("deem boy, u sniper lol");
        }
    }


}}



