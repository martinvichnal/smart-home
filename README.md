# Smart home system

![](https://img.shields.io/github/v/release/martinvichnal/smart-home)
![](https://img.shields.io/github/last-commit/martinvichnal/smart-home)
![](https://img.shields.io/github/issues/martinvichnal/smart-home)

---
# Introduction
NOTE: There are major bugs, inefficiency and security issues. This is not at all the best implementation of the system. I just flew too close to the sun and wanted to see what I am capable of.


This is the repository of my custom built smart home system.
This system is a dynamically changeable smart home system built with React TypeScript, firabase and ESP32 devices.

-   _Feel free to **improve, use or fork** this repository in your own projects :)_
-   _For any bugs or improvements feel free to make an [issue](https://github.com/martinvichnal/smart-home/issues) or make a [pull request](https://github.com/martinvichnal/smart-home/pulls)_

---
# Table of Contents

- [Smart home system](#smart-home-system)
- [Introduction](#introduction)
- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Hardware Requirements](#hardware-requirements)
- [Software Dependencies](#software-dependencies)
- [Installation and usage](#installation-and-usage)
   * [WebApp](#webapp)
   * [Create an IoT device](#create-an-iot-device)
   * [Servers](#servers)
      + [WebSocket](#websocket)
      + [API](#api)
      + [MSSQL](#mssql)
- [Configuration](#configuration)
- [How it works ?](#how-it-works-)
   * [System](#system)
   * [User Interface](#user-interface)
   * [IoT Device](#iot-device)
   * [Servers](#servers-1)
      + [Websocket](#websocket-1)
      + [REST API](#rest-api)
         - [Database](#database)
- [Acknowledgements / Source](#acknowledgements--source)

---
# Features
- Dynamically add custom variables to the system
- Fast and reliable communication
- Many virtual homes within one ESP
- Easy implementation

---
# Hardware Requirements
- Some computer to run the docker containers (preferably raspberry pi or host it on your preferable server hoster)
- Any ESP32
- Sensors or devices of your choise

---
# Software Dependencies
- Docker (running the webapp and the servers)
- [SmartHome library](https://github.com/martinvichnal/smart-home/tree/main/smart-home-firmware/lib/SmartHome) (or the following librarys if you don't want to use the dedicated library)
  - [arduinoWebSockets](https://github.com/Links2004/arduinoWebSockets)
  - [ArduinoJson](https://github.com/bblanchon/ArduinoJson)

---
# Installation and usage
1. Clone the repository
2. Configure and install the components
### Create an IoT device
- Create a virtual smart home with the SmartHome class with your server urls and device properties:
```cpp
SmartHome desk("Desk", "1", "1", "http://0.0.0.0:0000");
```
- Add custom bool or int to your SmartHome:
```cpp
desk.addVariableBool(13, "deskLamp", deskLamp);
```
- Validate the home:
  - Note: before validation the ESP32 needs to connect to your local network
```cpp
desk.validateHome();
```
- Initialize the WebSocket connection:
```cpp
ws.begin(webSocketServerAddress, webSocketServerPort, "/socket.io/?EIO=4");
ws.onEvent(webSocketEvents);
```
- Call the WebSocket loop in the loop section:
```cpp
ws.loop();
```
- Stringify the home then send it at your neede
```cpp
String dataDesk = desk.prepareWebSocketData();
ws.sendEVENT(dataDesk);
```

### WebApp
```
npm run dev
```
### Servers
For running the servers you need to build then execute it on the docker app
#### WebSocket
```
docker build . -t smart-home-websocket
docker run -p 5000:5000 smart-home-websocket
```
#### API
```
docker build . -t smart-home-api
docker run -p 8080:8080 smart-home-api
```
#### MSSQL
Pulling the Microsoft SQL database docker images from Microsoft
```
docker pull mcr.microsoft.com/mssql/server:2022-latest
```
Creating docker container from the image with cusomt name `--name iot-database` and password `"MSSQL_SA_PASSWORD=ThisIsThePassword!24"` (A strong system administrator (SA) password: At least 8 characters including uppercase, lowercase letters, base-10 digits and/or non-alphanumeric symbols.)
```
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=ThisIsThePassword!24" -p 1433:1433 -d --name iot-database mcr.microsoft.com/mssql/server:2022-latest
```

---
# Configuration
In order to use the system you have to configure the webapp and the ESP32 to connect to the servers via IP and their port and also you have to set your wifi `ssid` and `password` credentials in your ESP32 project

---
# How it works ?

---
## System

[<img src="https://github.com/martinvichnal/smart-home/blob/main/doc/Color-codes.png"/>](https://github.com/martinvichnal/smart-home/blob/main/doc/Color-codes.png)
[<img src="https://github.com/martinvichnal/smart-home/blob/main/doc/System-Diagram.png"/>](https://github.com/martinvichnal/smart-home/blob/main/doc/System-Diagram.png)
[<img src="https://github.com/martinvichnal/smart-home/blob/main/doc/Data-flow.png"/>](https://github.com/martinvichnal/smart-home/blob/main/doc/Data-flow.png)

---
## User Interface

[<img src="https://github.com/martinvichnal/smart-home/blob/main/doc/Webapp-Diagram.png"/>](https://github.com/martinvichnal/smart-home/blob/main/doc/Webapp-Diagram.png)

---
## IoT Device

[<img src="https://github.com/martinvichnal/smart-home/blob/main/doc/IoT-Devices-Diagram.png"/>](https://github.com/martinvichnal/smart-home/blob/main/doc/IoT-Devices-Diagram.png)

---
## Servers

### Websocket

### REST API

#### Database
[<img src="https://github.com/martinvichnal/smart-home/blob/main/doc/Database-Structure.png"/>](https://github.com/martinvichnal/smart-home/blob/main/doc/Database-Structure.png)


```JavaScript
/**
 * @description Get a device from the database by ID or by user ID
 * @method GET
 * @API /api/devices
 * @API /api/devices/device?did={did}
 * @API /api/device/device?uid={uid}
 * @body -
 * @returns {JSON} result
 */
export async function GET(request)

/**
 * @description Update device data in the database by ID
 * @method PUT
 * @API /api/devices/device
 * @body {JSON} {did, dd}
 * @returns {JSON} result
 */
export async function PUT(request)

/**
 * @description Add (insert) a device to the database
 * @method POST
 * @API /api/devices
 * @body {JSON} {did, dn, dd, uid}
 * @returns {JSON} result
 */
export async function POST(request)

/**
 * @description Delete a device from the database by ID
 * @method DELETE
 * @API /api/devices/device
 * @body {JSON} {did}
 * @returns {JSON} result
 */
export async function DELETE(request)
```

USERS:

```JavaScript
/**
 * @description Get all user from the database or by ID
 * @method GET
 * @API /api/users
 * @API /api/users/user?uid={uid}
 * @body -
 * @returns {JSON} result
 */
export async function GET(request)

/**
 * @description Update user data in the database by ID
 * @method PUT
 * @API /api/users/user
 * @body {JSON} {uid}
 * @returns {JSON} result
 */
export async function PUT(request)

/**
 * @description Add (insert) a user to the database
 * @method POST
 * @API /api/users
 * @body {JSON} {uid}
 * @returns {JSON} result
 */
export async function POST(request)

/**
 * @description Delete a user from the database by ID
 * @method DELETE
 * @API /api/users/user
 * @body {JSON} {uid}
 * @returns {JSON} result
 */
export async function DELETE(request)
```


Example:

```JavaScript
https://myserver.com/api/devices/device?did=05b31779-14ee-4233-8c9a-2749e81d3ccb -> GET request
-> response:
        {
            "DID": "05b31779-14ee-4233-8c9a-2749e81d3ccb",
            "DN": "Thermostat",
            "DD": "temperature-n-0-100-34--humidity-n-0-100-61--state-b-0-0-0--",
            "UID": "80ff2b60-bf4b-42fe-8de4-d21734a393c8"
        },

https://myserver.com/api/devices/device -> PUT request
-> request body:
        {
            "DID": "05b31779-14ee-4233-8c9a-2749e81d3ccb",
            "DN": "Thermostat",
            "DD": "temperature-n-0-100-34--humidity-n-0-100-61--state-b-0-0-0--",
            "UID": "80ff2b60-bf4b-42fe-8de4-d21734a393c8"
        },
-> response: "Device updated successfully"
```

```JSON
[
  {
    "did": "1111",
    "dn": "Led",
    "dd": "ledVariable-b-0-0-true--",
    "uid": "1124"
  },
  {
    "did": "123",
    "dn": "Desk",
    "dd": "deskLamp-b-0-0-true--deskLampBrightness-n-0-255-20--deskMonitor-b-0-0-true--",
    "uid": "1124"
  },
  {
    "did": "456",
    "dn": "Thermostat",
    "dd": "thermostatTemperature-n-0-100-13--thermostatHumidity-n-0-100-31--thermostatPower-b-0-0-true--",
    "uid": "1124"
  },
  {
    "did": "789",
    "dn": "Bed",
    "dd": "bedLamp-b-0-0-false--bedLampBrightness-n-0-255-225--",
    "uid": "1124"
  }
]
```
```JSON
[
  {
    "UID": "09c007bd-526b-4d8e-a9b9-96daff857759"
  },
  {
    "UID": "d480b324-d6bd-4e05-820f-c807a7a5ed7e"
  }
]
```

```JavaScript
export const user = {
    uid: "1124",
    uName: "Vichnál Martin",
    uPhoto: "https://lh3.googleusercontent.com/a/ACg8ocI5cTr4KR7TWUMmnwHdRFaBpEZw6QRUiwtVixPCTQVmuow=s96-c",
    uIsAuth: true,
}
```
---
# Acknowledgements / Source

-   [React](https://react.dev/learn)
-   [NextJS](https://nextjs.org/)
-   [Microsoft Azure](https://azure.microsoft.com/en-us/)
-   [NextJS Docker Example](https://github.com/vercel/next.js/tree/canary/examples/with-docker-multi-env)
-   [MsSQL example](https://github.com/hohoaisan/simple-dockerized-nextjs-mssql)
-   [API Guidelines](https://github.com/microsoft/api-guidelines)
-   [PlatformIO](https://platformio.org/)
