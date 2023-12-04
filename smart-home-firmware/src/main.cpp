/**
 * @file main.cpp
 * @author Martin Vichnál
 * @page https://github.com/martinvichnal/smart-home
 * @brief ESP32 firmware for my SmartHome project using my custom library
 * @version v1.2.0.0
 * @date 2023-12-03
 *
 * @copyright Copyright (c) 2023
 *
 */
#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <SmartHome.h>
#include <FastLED.h>
#include "config.h"
#include <vector>
#include <sstream>
#include <WebSocketsClient.h>
#include <SocketIOclient.h>

SmartHome desk("Desk", "123", "1124", "http://158.220.110.116:8080");
void parseVariableData(); // Parsing data from variables for clear code
// Desk variables:
bool deskLamp = 0;
int deskLampBrightness = 0; // 0 - 255
bool deskMonitor = 0;

/*
Functions declarations
*/
void connectToWifi(); // Connecting to WiFi
void webSocketEvents(socketIOmessageType_t type, uint8_t *payload, size_t length);
void handleWebSocketEvent(uint8_t *payload, size_t length);
void handleWebSocketPayloadData(String data);
void sendWebSocketData(String data);

// Socket.IO functions
SocketIOclient ws;

/*
  /$$$$$$  /$$$$$$$$ /$$$$$$$$ /$$   /$$ /$$$$$$$
 /$$__  $$| $$_____/|__  $$__/| $$  | $$| $$__  $$
| $$  \__/| $$         | $$   | $$  | $$| $$  \ $$
|  $$$$$$ | $$$$$      | $$   | $$  | $$| $$$$$$$/
 \____  $$| $$__/      | $$   | $$  | $$| $$____/
 /$$  \ $$| $$         | $$   | $$  | $$| $$
|  $$$$$$/| $$$$$$$$   | $$   |  $$$$$$/| $$
 \______/ |________/   |__/    \______/ |__/
*/
void setup()
{
  Serial.begin(115200);
  delay(1000);
  connectToWifi();

  desk.addVariableBool(13, "deskLamp", deskLamp);
  desk.addVariableNumber(14, "deskLampBrightness", 0, 255, deskLampBrightness);
  desk.addVariableBool(15, "deskMonitor", deskMonitor);

  // desk.validateHome();
  // parseVariableData();
  desk.prepareWebSocketData();

  // server address, port and URL
  ws.begin(webSocketServerAddress, webSocketServerPort, "/socket.io/?EIO=4");
  // event handler
  ws.onEvent(webSocketEvents);
}

int count = 0;
unsigned long messageTimestamp = 0;

/*
 /$$        /$$$$$$   /$$$$$$  /$$$$$$$
| $$       /$$__  $$ /$$__  $$| $$__  $$
| $$      | $$  \ $$| $$  \ $$| $$  \ $$
| $$      | $$  | $$| $$  | $$| $$$$$$$/
| $$      | $$  | $$| $$  | $$| $$____/
| $$      | $$  | $$| $$  | $$| $$
| $$$$$$$$|  $$$$$$/|  $$$$$$/| $$
|________/ \______/  \______/ |__/
*/
unsigned long previousMillis = 0;
const unsigned long interval = 5000; // Delay interval in milliseconds

void loop()
{
  ws.loop();

  if (millis() - previousMillis >= interval)
  {
    previousMillis = millis();

    deskLamp = random(0, 2);
    deskLampBrightness = random(0, 256);
    deskMonitor = random(0, 2);
    desk.setVariableValue("deskLamp", deskLamp);
    desk.setVariableValue("deskLampBrightness", deskLampBrightness);
    desk.setVariableValue("deskMonitor", deskMonitor);
    parseVariableData();

    String data = desk.prepareWebSocketData();
    ws.sendEVENT(data);
  }
}

/*
 /$$$$$$$$ /$$   /$$ /$$   /$$  /$$$$$$  /$$$$$$$$ /$$$$$$  /$$$$$$  /$$   /$$  /$$$$$$
| $$_____/| $$  | $$| $$$ | $$ /$$__  $$|__  $$__/|_  $$_/ /$$__  $$| $$$ | $$ /$$__  $$
| $$      | $$  | $$| $$$$| $$| $$  \__/   | $$     | $$  | $$  \ $$| $$$$| $$| $$  \__/
| $$$$$   | $$  | $$| $$ $$ $$| $$         | $$     | $$  | $$  | $$| $$ $$ $$|  $$$$$$
| $$__/   | $$  | $$| $$  $$$$| $$         | $$     | $$  | $$  | $$| $$  $$$$ \____  $$
| $$      | $$  | $$| $$\  $$$| $$    $$   | $$     | $$  | $$  | $$| $$\  $$$ /$$  \ $$
| $$      |  $$$$$$/| $$ \  $$|  $$$$$$/   | $$    /$$$$$$|  $$$$$$/| $$ \  $$|  $$$$$$/
|__/       \______/ |__/  \__/ \______/    |__/   |______/ \______/ |__/  \__/ \______/
*/

/**
 * @brief Connects to WiFi
 *
 */
void connectToWifi()
{
  WiFi.mode(WIFI_STA); // Optional
  WiFi.begin(ssid, password);
  Serial.println("\nConnecting");

  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(100);
  }

  Serial.println("\nConnected to the WiFi network");
  Serial.print("Local ESP32 IP: ");
  Serial.println(WiFi.localIP());
}

void parseVariableData()
{
  // Parsing data from server to global variables
  deskLamp = desk.getVariableValue("deskLamp");
  deskLampBrightness = desk.getVariableValue("deskLampBrightness");
  deskMonitor = desk.getVariableValue("deskMonitor");
}

/**
 * @brief Handling the event from WebSocket server
 * @param payload
 * @param length
 */
void handleWebSocketEvent(uint8_t *payload, size_t length)
{
  // Deserializing EVENT payload into EVENT NAME and EVENT DATA
  char *sptr = NULL;
  int id = strtol((char *)payload, &sptr, 10);
  Serial.printf("[IOc] get event: %s id: %d\n", payload, id);
  if (id)
  {
    payload = (uint8_t *)sptr;
  }
  DynamicJsonDocument doc(1024);
  DeserializationError errorDoc = deserializeJson(doc, payload, length);
  if (errorDoc)
  {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(errorDoc.c_str());
    return;
  }

  String eventName = doc[0];
  Serial.printf("[IOc] event name: %s\n", eventName.c_str());
  Serial.printf("[IOc] payload: %s\n", doc[1].as<String>().c_str());

  if (eventName == "deviceMessage")
  {
    DynamicJsonDocument jsonData(1024);
    DeserializationError errorJson = deserializeJson(jsonData, doc[1]);
    if (errorJson)
    {
      Serial.print(F("deserializeJson() failed: "));
      Serial.println(errorJson.c_str());
      return;
    }
    JsonObject device = jsonData[0];
    String deviceName = device["DN"].as<String>();

    if (deviceName == "Desk")
    {
      desk.processDeviceData(doc[1]);
    }
    else
    {
      Serial.println("Unknown device name");
      return;
    }
    // else if (deviceName == "Bed")
    // {
    //   // bed.processReceivedData(doc[1]);
    // }
    // else if (deviceName == "Thermostat")
    // {
    //   // therm.processReceivedData(doc[1]);
    // }
  }
  else
  {
    Serial.println("Unknown event name");
  }
}

/**
 * @brief WebSocket event handler
 * @param type
 * @param payload
 * @param length
 */
void webSocketEvents(socketIOmessageType_t type, uint8_t *payload, size_t length)
{
  switch (type)
  {
  case sIOtype_DISCONNECT:
    Serial.printf("[IOc] Disconnected!\n");
    break;
  case sIOtype_CONNECT:
    Serial.printf("[IOc] Connected to url: %s\n", payload);

    // join default namespace (no auto join in Socket.IO V3)
    ws.send(sIOtype_CONNECT, "/");
    break;
  case sIOtype_EVENT:
    Serial.printf("[IOc] get event: %s\n", payload);
    handleWebSocketEvent(payload, length);
    break;
    break;
  case sIOtype_ACK:
    Serial.printf("[IOc] get ack: %u\n", length);
    break;
  case sIOtype_ERROR:
    Serial.printf("[IOc] get error: %u\n", length);
    break;
  case sIOtype_BINARY_EVENT:
    Serial.printf("[IOc] get binary: %u\n", length);
    break;
  case sIOtype_BINARY_ACK:
    Serial.printf("[IOc] get binary ack: %u\n", length);
    break;
  }
}