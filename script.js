var rows = 3;
var cols = 3;
var size = 100;
var BoardContainer = document.getElementById("gameboard");


var mqtt;
var reconnectTimeout = 2000;
var host="www.kuuskaru.ee"; //change this
var port=9001;
var name;
var turn;

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
    [2,2,2],
    [2,2,2],
    [2,2,2]
]

BoardContainer.addEventListener("click", move, false);
//BoardContainer.addEventListener("mouseover", hover, false);


function paintBoard(){




    for (i = 0; i < cols; i++) {
        for (j = 0; j < rows; j++) {
            if (gameBoard[i][j] === 0) {
                document.getElementById("s"+i+j).style.background = '#bb0609';
            } else if (gameBoard[i][j] === 1) {
                document.getElementById("s" + i+j).style.background = '#0dbb1f';
            } else if (gameBoard[i][j] === 2) {
                document.getElementById("s" + i+j).style.background = '#9e9ca0';
            }
        }
    }



}

function move(e) {

    if (e.target !== e.currentTarget) {
        var row = e.target.id.substring(1, 2);
        var col = e.target.id.substring(2, 3);

        sendMessage("/move", name + "-"+row + ":" + col)

        /*
        if (gameBoard[row][col] == 0) {
            e.target.style.background = '#bb0609';
        } else if (gameBoard[row][col] == 1) {
            e.target.style.background = '#0dbb1f';



            hitCount++;
            if (hitCount == 17) {
                alert("deem boy, u sniper lol");
            }}}*/
    }
}

function epilepsy() {

    var element = document.body;
    element.classList.toggle("epic-mode");
    audio.play();

}



function connect() {

    name = document.getElementById("playername").value;

    client = new Paho.MQTT.Client(host, Number(port), name);

    // set callback handlers

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // connect the client
    client.connect({onSuccess:onConnect});

}

function sendMessage(topic,message) {
    message = new Paho.MQTT.Message(message);
    message.destinationName = topic;
    client.send(message);
}

function test() {
    var msg = document.getElementById("message").value;
    message = new Paho.MQTT.Message(msg);
    message.destinationName = "/World";
    client.send(message);
}

// called when the client connects
function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    client.subscribe("/World");
    client.subscribe("/refreshTable");

    client.subscribe("/playerJoined");
    client.subscribe("/startGame");
    client.subscribe("/setTurn");

    message = new Paho.MQTT.Message(name);
    message.destinationName = "/playerJoined";
    client.send(message);

    //test();
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost: "+responseObject.errorMessage);
    }
}

// called when a message arrives
function onMessageArrived(message) {
    console.log("onMessageArrived: "+message.destinationName + " - "+message.payloadString);


    if(message.destinationName === "/refreshTable"){

        let s = message.payloadString;
        let arr1 = s.split("-");
        //gameBoard = arr1[1];

        let arr2 = arr1[1].split(",");
        let index = 0;
        for (let i = 0; i <=2 ; i++) {
            gameBoard[0][i] = parseInt(arr2[i]);
        }

        for (let i = 3; i <=5 ; i++) {
            gameBoard[1][i-3] = parseInt(arr2[i]);
        }

        for (let i = 6; i <=8 ; i++) {
            gameBoard[2][i-6] = parseInt(arr2[i]);
        }

        console.log(gameBoard);
        /*
        if (turn === name){
            console.log(turn + " = " + name);
            gameBoard[row][col] = 1;
        }else{
            gameBoard[row][col] = 0;
            console.log(turn + " != " + name);
        }*/
       // gameBoard[row][col] = ships[row][col];
        paintBoard();
        /*
        let co = s.split(":");
        let row = co[0];
        let col = co[1];
        //gameBoard[row][col] = 1;

        console.log(gameBoard);


        gameBoard[row][col] = ships[row][col];
        paintBoard();
        /*
        if (gameBoard[row][col] === 0) {
            document.getElementById("s"+row+col).style.background = '#bb0609';
        } else if (gameBoard[row][col] === 1) {
            document.getElementById("s" + row+col).style.background = '#0dbb1f';
        }*/
    }
    else if(message.destinationName === "/startGame"){
        console.log("Start");
    }
    else if(message.destinationName === "/setTurn"){
        turn = message.payloadString;
        document.getElementById("turnLabel").innerText = message.payloadString + " KORD";
    }



}



