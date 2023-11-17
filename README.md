
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

- [Smart home system](#smart-home-system)
- [Introduction](#introduction)
- [Table of Contents](#table-of-contents)
- [Fundamental Operation](#fundamental-operation)
   * [Diagram color code](#diagram-color-code)
   * [System diagram](#system-diagram)
   * [IoT device diagram](#iot-device-diagram)
   * [Webapp diagram](#webapp-diagram)
- [Software](#software)
   * [Dataflow](#dataflow)
   * [Webapp](#webapp)
      + [Data Structures](#data-structures)
   * [IoT Devices (Software of the ESP32)](#iot-devices-software-of-the-esp32)
- [Acknowledgements / Source](#acknowledgements--source)


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


### Data Structures
Structure of the data communication example in JSON format:

```JSON
[
  {
    "did":"72ca9db90d31439dbf540c48b07abdb6",
    "dn":"Bedroom Lamp",
    "dd":"pot-n-0-255--state-b--battery-n-0-100--brightness-n-0-100--hue-n-0-255"
  },
  {
    "did":"f33573d762614e47a0008659bb5de53e",
    "dn":"Bedroom Switcher Hub",
    "dd":"Power-b-false--battery-n-0-100-50.2--Computer-b-true--Lamp-b-true--Fan-b-false--TV-b-false--Speaker-b-true--Air Conditioner-b-false--Door-b-false--Window-b-false"
  },
  {
    "did":"a550b29757374abda73c15d29e2cd1e1",
    "dn":"Smart Thermostat",
    "dd":"temperature-n-0-100-24.4--humidity-n-0-100-69.123--state-b-true--battery-n-0-100-24"
  },
  {
    "did":"89c44c3dbab948faa265ecd787743f15",
    "dn":"Smart Door Lock",
    "dd":"locked-b-false--battery-n-0-100-98"
  }
]
```

## IoT Devices (Software of the ESP32)




---

# Acknowledgements / Source
 - [React](https://react.dev/learn)
 - [NextJS](https://nextjs.org/)
 - [Microsoft Azure](https://azure.microsoft.com/en-us/)
 - [PlatformIO](https://platformio.org/)
