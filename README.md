# usbSwitch

Este proyecto es un prototipo de control de periféricos (teclado, micrófono y cámara en el caso de la demo) utilizando Firmata y Johnny-Five. Proporciona una interfaz web para encender y apagar estos dispositivos de forma remota.

## Autor

- [@robertCoder](https://www.robertcoder.com)
  
  |![RC Círculo ](https://github.com/xBlackEaglex/usbSwitch/assets/52977024/bfe89889-d2ca-42be-abed-12b4a14aa061)|![Logo IddO sin fondo](https://github.com/xBlackEaglex/usbSwitch/assets/52977024/86f0dc05-c79e-4cc8-9b10-cf0292b9a8b4)|
  |------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|

## Funcionalidades

- Control remoto de teclado, micrófono, cámara etc. a través de una interfaz web.
- Encendido y apagado de dispositivos utilizando botones en la interfaz.
- Retroalimentación visual en la interfaz para mostrar el estado actual de los dispositivos.

## Tecnologías Utilizadas

- [Node.js](https://nodejs.org/): Entorno de ejecución para JavaScript.
- [Express.js](https://expressjs.com/): Framework web para Node.js.
- [Socket.IO](https://socket.io/): Biblioteca para comunicación en tiempo real.
- [Johnny-Five](http://johnny-five.io/): Framework de robótica para Node.js.
- [Firmata](https://github.com/firmata/protocol): Protocolo de comunicación para controlar dispositivos a través de Node.js.

## Material 

  - Arduino nano (sé probo con Arduino uno y funciona bien)
  - módulo de relevadores
  - resistencias de 10k ohms, una por cada relevador a utilizar
  - Botón normalmente abierto, uno por cada relevador a utilizar

  |![material1-min](https://github.com/xBlackEaglex/usbSwitch/assets/52977024/ca17cb54-fe45-424f-917a-c116dc79e55a)|![material2-min](https://github.com/xBlackEaglex/usbSwitch/assets/52977024/e957657b-ea06-47fb-85bc-e6ff3cb397c8)|
  |----------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
  
## Diagrama 

  ![diagrama](https://github.com/xBlackEaglex/usbSwitch/assets/52977024/fad3561a-27c5-41d9-a0dc-40eab6b11b7f)


## Instalación

1. Clona este repositorio en tu máquina local.
2. Es necesario instalar Node en su versión 13.12.0 y Python versión 2.7.
3. Instala las dependencias utilizando npm:

    ```bash
    npm install
    ```

4. Conecta tu placa Arduino y asegúrate de cargar el firmware que se encuentra en la carpeta arduino.
5. Verifica el puerto al que está conectada tu placa Arduino, comprueba que el puerto coincida con el que está asignado en el código del archivo app.js, de no ser el mismo cámbialo por el puerto que tiene asignado tu Arduino.


  |![comprobarpuerto](https://github.com/xBlackEaglex/usbSwitch/assets/52977024/10982a67-06f3-4d88-a273-d8eb8c906785)|![cambiarpuerto](https://github.com/xBlackEaglex/usbSwitch/assets/52977024/e084aa4b-7cd0-418d-a8bb-b02af86b6cb4)|
  |------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|

  
7. Ejecuta la aplicación:

    ```bash
    npm start
    ```

8. Abre tu navegador web y ve a `http://localhost:8081` para acceder a la interfaz de control de periféricos.

## Uso

- Haz clic en los botones de la interfaz para encender y apagar los dispositivos.
- Observa la retroalimentación visual para saber el estado actual de los dispositivos.
- La aplicación también proporciona mensajes de consola para mostrar las acciones realizadas.

## Contribución

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Haz tus cambios y haz commit de ellos (`git commit -am 'Añade una nueva funcionalidad'`).
4. Haz push de tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Demo

![web](https://github.com/xBlackEaglex/usbSwitch/assets/52977024/7d494d95-8a18-4089-9655-55bbe0424458)

![cmd](https://github.com/xBlackEaglex/usbSwitch/assets/52977024/aa4d0e56-4956-4907-9d7a-d156ec84cf20)
