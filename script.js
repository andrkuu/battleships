var rows = 10;
var cols = 10;
var size = 50;
var audio = new Audio('tumm.mp3');

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

    sendMessage("/refreshTable",row+":"+ col)

    if (gameBoard[row][col] == 0) {
        e.target.style.background = '#bb0609';
    } else if (gameBoard[row][col] == 1) {
        e.target.style.background = '#0dbb1f';



        hitCount++;
        if (hitCount == 17) {
            alert("deem boy, u sniper lol");
        }}}}

function epilepsy() {

    var element = document.body;
    element.classList.toggle("epic-mode");
    audio.play();

}

var mqtt;
var reconnectTimeout = 2000;
var host="90.191.120.132"; //change this
var port=9001;


function connect() {

    var name = document.getElementById("playername").value;

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
    test();
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
        let co = s.split(":");
        let row = co[0];
        let col = co[1];
        //gameBoard[row][col] = 1;
        console.log(gameBoard);


        if (gameBoard[row][col] === 0) {
            document.getElementById("s"+row+col).style.background = '#bb0609';
        } else if (gameBoard[row][col] === 1) {
            document.getElementById("s" + row+col).style.background = '#0dbb1f';
        }
    }

}

