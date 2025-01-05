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
- [Fundamental Operation](#fundamental-operation)
- [Features](#features)
- [Hardware Requirements](#hardware-requirements)
- [Software Dependencies](#software-dependencies)
- [Diagrams ](#diagrams)
   * [Diagram color code](#diagram-color-code)
   * [System diagram](#system-diagram)
   * [IoT device diagram](#iot-device-diagram)
   * [Webapp diagram](#webapp-diagram)
- [Installation](#installation)
   * [Create an IoT device](#create-an-iot-device)
   * [WebApp](#webapp)
   * [Servers](#servers)
      + [WebSocket](#websocket)
      + [API](#api)
      + [MSSQL](#mssql)
- [Configuration](#configuration)
      + [Kubernetes and docker](#kubernetes-and-docker)
         - [How to create:](#how-to-create)
         - [Docker](#docker)
         - [Good to know docker parancsok](#good-to-know-docker-parancsok)
         - [Kubernetes](#kubernetes)
         - [Kubernetes Dashboard](#kubernetes-dashboard)
         - [Update Server from git](#update-server-from-git)
- [How it works ?](#how-it-works-)
   * [System](#system)
   * [User Interface - Webapp](#user-interface---webapp)
      + [Hooks](#hooks)
         - [useAddData](#useadddata)
         - [useDeleteData](#usedeletedata)
         - [useGetData](#usegetdata)
         - [useGetUserInfo](#usegetuserinfo)
   * [IoT Device](#iot-device)
   * [Servers](#servers-1)
      + [Websocket](#websocket-1)
      + [WebSocket API Documentation](#websocket-api-documentation)
         - [Connection](#connection)
         - [Joining](#joining)
         - [Sending Messages](#sending-messages)
         - [Receiving Messages](#receiving-messages)
         - [Connection Status](#connection-status)
         - [Disconnecting](#disconnecting)
      + [REST API](#rest-api)
         - [Database](#database)
- [Acknowledgements / Source](#acknowledgements--source)

---
# Fundamental Operation
This is the section for the basics of how it works and explaining through diagrams

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
- On the Webapp side you can find the dependencies in the package.json file

---
# Diagrams 

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
# Installation
1. Clone the repository
2. Configure and install the components
## Create an IoT device
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

## WebApp
```
npm run dev
```
## Servers
For running the servers you need to build then execute it on the docker app
### WebSocket
```
docker build . -t smart-home-websocket
docker run -p 5000:5000 smart-home-websocket
```
### API
```
docker build . -t smart-home-api
docker run -p 8080:8080 smart-home-api
```
### MSSQL
Pulling the Microsoft SQL database docker images from Microsoft
```
docker pull mcr.microsoft.com/mssql/server:2022-latest
```
Creating docker container from the image with cusomt name `--name iot-database` and password `"MSSQL_SA_PASSWORD=ThisIsThePassword!24"` (A strong system administrator (SA) password: At least 8 characters including uppercase, lowercase letters, base-10 digits and/or non-alphanumeric symbols.)
```
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=ThisIsThePassword!24" -p 1433:1433 -d --name iot-database mcr.microsoft.com/mssql/server:2022-latest
```
Demo data injection
```sql
-- Create the devices table
CREATE TABLE devices (
    did VARCHAR(255),
    dn VARCHAR(255),
    dd VARCHAR(MAX),
    uid VARCHAR(255)
);

-- Insert data into the devices table
INSERT INTO devices (did, dn, dd, uid)
VALUES 
    ('1001', 'Device1', 'property1-n-0-100-50--property2-b-0-1-0--', '1124'),
    ('1002', 'Device2', 'setting1-b-0-1-1--setting2-n-0-10-5--', '1124'),
    ('1003', 'Device3', 'temperature-n-0-50-25--humidity-n-0-100-75--', '1124'),
    ('1004', 'Device4', 'state-b-0-1-1--brightness-n-0-255-128--', '1124');
```

---
# Configuration
In order to use the system you have to configure the webapp and the ESP32 to connect to the servers via IP and their port and also you have to set your wifi `ssid` and `password` credentials in your ESP32 project

---
### Kubernetes and docker
#### How to create:

#### Docker

- Pull registry

```
docker pull registry
Using default tag: latest
latest: Pulling from library/registry
Digest: sha256:543dade69668e02e5768d7ea2b0aa4fae6aa7384c9a5a8dbecc2be5136079ddb
Status: Image is up to date for registry:latest
docker.io/library/registry:latest
```

- Run the registry:

```
docker run -d -p 5000:5000 --restart=always --name registry registry
```

- Tag the desired image

```
docker tag websocket-server:latest localhost:5000/websocket-server:latest
```

- Push the desired image to registry

```
docker push localhost:5000/websocket-server:latest
```

- Checking if the image is pushed:

```
curl http://localhost:5000/v2/_catalog
```

#### Good to know docker parancsok

```
docker images
docker images -a
docker ps
docker rm …
docker rmi -f 7b44d932df87
```

#### Kubernetes

- Set the [localhost](http://localhost) registry

```
sudo nano /etc/rancher/k3s/registries.yaml
```

```
mirrors:
  "localhost:5000":
    endpoint:
      - "http://localhost:5000"
```

- Restart

```
 sudo systemctl restart k3s
```

- Delete pod

```
sudo kubectl delete pod -l app=websocket-server
```

- Make the deployment file

```
nano websocket-deployment.yaml 
```

yaml:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: websocket-server
spec:
  replicas: 1
  selector:
    matchLabels:
      app: websocket-server
  template:
    metadata:
      labels:
        app: websocket-server
    spec:
      containers:
      - name: websocket-server
        image: localhost:5000/websocket-server:latest
        imagePullPolicy: Always
        ports:
        - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: websocket-service
spec:
  selector:
    app: websocket-server
  ports:
  - protocol: TCP
    port: 8080
    targetPort: 8080
  type: NodePort
```

- Run the deployment file

```
sudo kubectl apply -f websocket-deployment.yaml
```

- Checking the pods and services

```
sudo kubectl get pods
sudo kubectl get services
```

- Reset kubernetes:

```
/usr/local/bin/k3s-killall.sh
sudo systemctl stop k3s
sudo systemctl start k3s
sudo systemctl status k3s
```

#### Kubernetes Dashboard

- Apply dashboard
```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml
```

- Get dashboard pods
```
kubectl get pods -n kubernetes-dashboard
```

- Edit dashboard service
```
kubectl -n kubernetes-dashboard edit service kubernetes-dashboard
```

- Change the type to NodePort:
```
spec:
  type: NodePort
```

- Get port
```
kubectl -n kubernetes-dashboard get service kubernetes-dashboard
```

- Acces the dashboard
```
https://192.168.1.133:NodePort
```

- Create the token
dashboard-admin.yaml
```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard
```

- Apply token
```
kubectl apply -f dashboard-admin.yaml
```

- Get token
```
kubectl -n kubernetes-dashboard create token admin-user
```
#### Update Server from git

- Pull from GitHub
```
git pull origin main
```
- Build image
```
sudo docker build -t localhost:5000/ws-server:latest .
```
- Push to local storage
```
docker push localhost:5000/ws-server:latest
```
- Restart deployment
```
sudo kubectl rollout restart deployment ws-server
```
- Apply deployment
```
sudo kubectl apply -f kub-deployment.yaml
```
- Get token
```
kubectl -n kubernetes-dashboard create token admin-user
```


---
# How it works ?

---
## System



---
## User Interface - Webapp

### Hooks
I created some custom hooks to make the overall code easily readable and accessable. These hooks can be seen below:

---

#### useAddData
This hook is just containing a simple function
```tsx
const addData = async ({ uid, uName, uIsAuth }: userInfoType) => {}
```
that adds values to the database whith the following parameters:
```tsx
export type userInfoType = {
    id?: string // id: id from Firebase database
    uid?: string // uid: uid from Firebase authentication
    uName?: string // uName: name from Firebase authentication
    uIsAuth?: boolean // uIsAuth: isAuth from Firebase authentication
}
```

---

#### useDeleteData

---

#### useGetData
This is the main hook for fetching the data from the database. This diagram below shows how the hook should be used:

[<img src="https://github.com/martinvichnal/smart-home/blob/main/doc/useGetData.png" width=500/>](https://github.com/martinvichnal/smart-home/blob/main/doc/useGetData.png.png)

This hook contains the following variables and fucntions:
Variables
```tsx
const [devices, setDevices] = useState<deviceInfoType[]>([])
const [users, setUsers] = useState<userInfoType[]>([])
const [data, setData] = useState<userInfoType[]>([])
```
And fucntios
```tsx
const getUserData = async () => {}
const getDeviceData = async () => {}
```
All the fucntions and main variables are available with this hook.

This hook has also 3 useEffect react hooks in order to fix sync issues with React structure.

The getUserData is the first thing this hook is calling. It gets user data from database with the given dataQuery `(Where the uid is equal to the current user's uid)` and sets the user state to the fetched data. This function Is called only on mount or when getUserData is called. With the help of a useEffect we wait for the user state to set its value then calling the getDeviceData. This fucntion gets data from the database when the database data has changed and sets the device state to the fetched data. This getDoc uses a sub collection reference. This fucntion also subscribing on the database change so we dont need to call it again.

---

#### useGetUserInfo
This is a simple custom hook that gets user information from the local web storage. The data is added every time the user is in the authentication page.

Example:
```tsx
const { uid, uIsAuth } = useGetUserInfo()
```

The user info from the local storage looks like this:
```JSON
{
    "uid": "jfE3189r5Gsjac8763VsahEfgj",
    "uName": "John Doe",
    "uPhoto": "*url from google*",
    "uIsAuth": false
    "id": "Yq4Qt1S1muRZuBzEuYhL"
}
```



---
## IoT Device



---
## Servers

### Websocket
At the top, the necessary modules are imported. Express is a web application framework for Node.js, designed for building web applications and APIs. Socket.IO is a JavaScript library for real-time web applications. It enables real-time, bidirectional, and event-based communication between the browser and the server.

The `connectedClients` Map is used to keep track of all connected clients. Each client is identified by a unique `clientId` which is a combination of the user's `userId`, `deviceId`, `clientType`, and the socket's `id`.

The `sendConnectionStatusEvent` function is used to send a `connectionStatus` event to a specific socket. It sends an object containing an array of `connectedDevices` for a specific `userId`.

The `io.on("connection", (socket) => {...})` block is where the server handles a new client connection. Inside this block, several event listeners are set up on the `socket` object to handle different types of events.

The `join` event is used when a client wants to join the server. The client sends its `userId`, `deviceId`, and `clientType` to the server. The server then stores this information in the `socket` object and the `connectedClients` Map.

If the `clientType` is `webapp`, the server sets up a `webMessage` event listener on the `socket`. When a `webMessage` event is received, the server tries to find the target device's socket and sends a `message` event to it.

If the `clientType` is `device`, the server sets up a `deviceMessage` event listener on the `socket`. When a `deviceMessage` event is received, the server sends a message event to all webapp `sockets` associated with the `userId`.

The `disconnect` event is used when a client disconnects from the server. The server removes the client's information from the `connectedClients` Map.

Finally, the server starts listening on a specific port for incoming connections.

### WebSocket API Documentation

#### Connection

To connect to the WebSocket server, create a new WebSocket instance in your client-side JavaScript:

```jsx
const socket = io('<http://localhost:5000>');
```

Replace `'<http://localhost:5000>'` with the URL of your WebSocket server.

#### Joining

After connecting, you should emit a "join" event to the server. This event should include your user ID, device ID, and client type:

```jsx
socket.emit('join', userId, deviceId, clientType);
```

- `userId` (string): The ID of the user.
- `deviceId` (string): The ID of the device. This is not required for webapp clients.
- `clientType` (string): The type of the client. This should be either "webapp" or "device".

#### Sending Messages

To send a message, emit a `${clientType}Message` event to the server. This event should include the target device ID and the message:

```jsx
socket.emit(`${clientType}Message`, targetDeviceId, message);
```

- `targetDeviceId` (string): The ID of the target device. This is required for webapp clients.
- `message` (string): The message to send.

#### Receiving Messages

To receive messages, listen for the "message" event:

```jsx
socket.on('message', (message) => {
  console.log('Received message:', message);
});
```

#### Connection Status

To receive updates about the connection status, listen for the "connectionStatus" event:

```jsx
socket.on('connectionStatus', (data) => {
  console.log('Connected devices:', data.connectedDevices);
});

```

#### Disconnecting

To disconnect from the server, use the `disconnect` method:

```jsx
socket.disconnect();
```

Please note that this is a basic API documentation. Depending on your application's requirements, you might need to add more events or data fields.

### REST API

#### Database


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
