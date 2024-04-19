var express = require("express");
var app = express();
var io = require("socket.io")(app.listen(8081));
var five = require("johnny-five");

app.use(express.static(__dirname + "/app.js"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

var board = new five.Board({
    port: "COM5"
});

board.on("ready", function () {

    var led = new five.Led(13);

    var key = new five.Relay(2)
    var mic = new five.Relay(3)
    var cam = new five.Relay(4)

    var buttonKey = new five.Button(8)

    led.off();

    console.log("conectado a la placa Arduino ...");

    io.on("connection", function (socket) {

        var loopVar = 0;
            
        led.off();

        socket.on("offKey", function () {
            key.close();
            console.log("apagando teclado ...");
        });

        socket.on("onKey", function () {
            key.open();
            console.log("encendiendo teclado ...");
        });

        socket.on("offMic", function () {
            mic.close();
            console.log("apagando micrófono ...");
        });

        socket.on("onMic", function () {
            mic.open();
            console.log("encendiendo micrófono ...");
        });

        socket.on("offCam", function () {
            cam.close();
            console.log("apagando cámara ...");
        });

        socket.on("onCam", function () {
            cam.open();
            console.log("encendiendo cámara ...");
        });

        buttonKey.on("down", function (){
            key.toggle();
            console.log("cambio manual del estado de alimentación del teclado ...");
        })

        var loop = setInterval(() => {
            if (loopVar === 5) {
                clearInterval(loop);
            } else {
                led.toggle();
                loopVar++;
            }
        }, 500);
        
        console.log("conexión establecida con el frontend ...");
        
    });

});