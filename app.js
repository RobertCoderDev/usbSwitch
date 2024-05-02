var express = require("express");
var app = express();
var io = require("socket.io")(app.listen(8081));
var five = require("johnny-five");

app.use(express.static(__dirname + "/src"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/src/index.html");
});

var board = new five.Board({
    port: "COM8"
});


// conexión a la placa Arduino
board.on("ready", function () {
    var led = new five.Led(13);

    var key = new five.Relay(2);
    var mic = new five.Relay(3);
    var cam = new five.Relay(4);

    var buttonKey = new five.Button(5);
    var buttonMic = new five.Button(6);
    var buttonCam = new five.Button(7);

    var switchList = new five.Switches([ 8, 9, 10 ]);
    var keyState = switchList[0];
    var micState = switchList[1];
    var camState = switchList[2];

    led.off();

    key.open();
    mic.open();
    cam.open();

    console.log("conectado a la placa Arduino ...");

    // control por push bottom
    buttonKey.on("down", function () {
        key.toggle();
        console.log("cambio manual del estado de alimentación del teclado ...");
    });

    buttonMic.on("down", function () {
        mic.toggle();
        console.log("cambio manual del estado de alimentación del micrófono ...");
    });

    buttonCam.on("down", function () {
        cam.toggle();
        console.log("cambio manual del estado de alimentación de la cámara ...");
    });

    // conexión a un cliente front end
    io.on("connection", function (socket) {
        var loopVar = 0;

        // enviar primer estado de los periféricos al front end
        if (keyState.isClosed) {
            io.emit("response", {
                device: "teclado",
                state: "on",
            });
        } else {
            io.emit("response", {
                device: "teclado",
                state: "off",
            });
        }

        if (micState.isClosed) {
            io.emit("response", {
                device: "mic",
                state: "on",
            });
        } else {
            io.emit("response", {
                device: "mic",
                state: "off",
            });
        }

        if (camState.isClosed) {
            io.emit("response", {
                device: "cam",
                state: "on",
            });
        } else {
            io.emit("response", {
                device: "cam",
                state: "off",
            });
        }


        // control por interface
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

        // revision estado de los relay y envió a la interface web
        keyState.on("close", function () {
            io.emit("response", {
                device: "teclado",
                state: "on",
            });
        });
        keyState.on("open", function () {
            io.emit("response", {
                device: "teclado",
                state: "off",
            });
        });
        micState.on("close", function () {
            io.emit("response", {
                device: "mic",
                state: "on",
            });
        });
        micState.on("open", function () {
            io.emit("response", {
                device: "mic",
                state: "off",
            });
        });
        camState.on("close", function () {
            io.emit("response", {
                device: "cam",
                state: "on",
            });
        });
        camState.on("open", function () {
            io.emit("response", {
                device: "cam",
                state: "off",
            });
        });

        // loop para encender led de estado
        var loop = setInterval(() => {
            if (loopVar === 5) {
                clearInterval(loop);
            } else {
                led.toggle();
                loopVar++;
            }
        }, 500);

        // mensaje de conexión exitosa al front end
        console.log("conexión establecida con el frontend ...");

        // led de desconexión  del front end
        socket.on("disconnect", () => {
            led.off();
            console.log("frontend desconectado ...");
        });
    });
});