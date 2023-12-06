# Smart home system

![](https://img.shields.io/github/v/release/martinvichnal/smart-home)
![](https://img.shields.io/github/last-commit/martinvichnal/smart-home)
![](https://img.shields.io/github/issues/martinvichnal/smart-home)

---

# Introduction

This is the repository of my custom built smart home system.
This system is a dynamically changeable smart home system built with React TypeScript, firabase and ESP32 devices.

-   _Feel free to **improve, use or fork** this repository in your own projects :)_
-   _For any bugs or improvements feel free to make an [issue](https://github.com/martinvichnal/pomodoro/issues) or make a [pull request](https://github.com/martinvichnal/pomodoro/pulls)_

---

# Table of Contents

-   [Smart home system](#smart-home-system)
-   [Introduction](#introduction)
-   [Table of Contents](#table-of-contents)
-   [Fundamental Operation](#fundamental-operation)
    -   [Diagram color code](#diagram-color-code)
    -   [System diagram](#system-diagram)
    -   [IoT device diagram](#iot-device-diagram)
    -   [Webapp diagram](#webapp-diagram)
-   [Software](#software)
    -   [Dataflow](#dataflow)
    -   [Webapp](#webapp)
        -   [API](#api)
        -   [Data Structures](#data-structures)
    -   [IoT Devices (Software of the ESP32)](#iot-devices-software-of-the-esp32)
-   [Acknowledgements / Source](#acknowledgements--source)

---

# Fundamental Operation

This is the section for the basics of how it works and explaining through diagrams

## Diagram color code

All the diagrams that are shown below are color coded with the following code rule:

[<img src="https://github.com/martinvichnal/smart-home/blob/main/doc/Color-codes.png"/>](https://github.com/martinvichnal/smart-home/blob/main/doc/Color-codes.png)

## System diagram

This is the basic system connection diagram.

[<img src="https://github.com/martinvichnal/smart-home/blob/main/doc/System-Diagram.png"/>](https://github.com/martinvichnal/smart-home/blob/main/doc/System-Diagram.png)

## IoT device diagram

This is the basic IoT devices diagram.

[<img src="https://github.com/martinvichnal/smart-home/blob/main/doc/IoT-Devices-Diagram.png"/>](https://github.com/martinvichnal/smart-home/blob/main/doc/IoT-Devices-Diagram.png)

## Webapp diagram

[<img src="https://github.com/martinvichnal/smart-home/blob/main/doc/Webapp-Diagram.png"/>](https://github.com/martinvichnal/smart-home/blob/main/doc/Webapp-Diagram.png)

---

# Software

In this project the software side is the main picture. The hardware side is just a simple group of wires to connect the sensors or extensions so I am basically focusing on the software side only.

## Dataflow

Here is some basic sketch of how should the data flow from one platform to another

[<img src="https://github.com/martinvichnal/smart-home/blob/main/doc/Data-flow.png"/>](https://github.com/martinvichnal/smart-home/blob/main/doc/Data-flow.png)

---

## Webapp

---

### API

Awailable APIs:

DEVICES:

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


### Data Structures

Structure of the data communication example in JSON format:

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

## IoT Devices (Software of the ESP32)

---

# Acknowledgements / Source

-   [React](https://react.dev/learn)
-   [NextJS](https://nextjs.org/)
-   [Microsoft Azure](https://azure.microsoft.com/en-us/)
-   [NextJS Docker Example](https://github.com/vercel/next.js/tree/canary/examples/with-docker-multi-env)
-   [MsSQL example](https://github.com/hohoaisan/simple-dockerized-nextjs-mssql)
-   [API Guidelines](https://github.com/microsoft/api-guidelines)
-   [PlatformIO](https://platformio.org/)
