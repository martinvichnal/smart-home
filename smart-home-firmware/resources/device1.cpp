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

SmartHome desk("Desk", "1", "1124", "http://158.220.110.116:8080");
SmartHome therm("Thermostat", "2", "1124", "http://158.220.110.116:8080");
SmartHome bed("Bed", "3", "1124", "http://158.220.110.116:8080");

// Desk variables:
bool deskLamp = 0;
int deskLampBrightness = 0; // 0 - 255
bool deskMonitor = 0;

// Thermostat:
int thermostatTemperature = 0; // 0 - 100
int thermostatHumidity = 0;    // 0 - 100
bool thermostatPower = 0;

// Bed:
bool bedLamp = 0;
int bedLampBrightness = 0; // 0 - 255

void parseVariableData();  // Parsing data from variables for clear code
void setGlobalVariables(); // Setting variables to values to fetch them to the server

#define NUM_LEDS 10
#define DATA_PIN 5

CRGB leds[NUM_LEDS];

/*
Functions declarations
*/
void connectToWifi(); // Connecting to WiFi
void webSocketEvents(socketIOmessageType_t type, uint8_t *payload, size_t length);
void handleWebSocketEvent(uint8_t *payload, size_t length);

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

  FastLED.addLeds<WS2812B, DATA_PIN, RGB>(leds, NUM_LEDS); // GRB ordering is typical
  FastLED.setBrightness(100);

  desk.addVariableBool(13, "deskLamp", deskLamp);
  desk.addVariableNumber(14, "deskLampBrightness", 0, 255, deskLampBrightness);
  desk.addVariableBool(15, "deskMonitor", deskMonitor);

  therm.addVariableNumber(16, "thermostatTemperature", 0, 100, thermostatTemperature);
  therm.addVariableNumber(17, "thermostatHumidity", 0, 100, thermostatHumidity);
  therm.addVariableBool(18, "thermostatPower", thermostatPower);

  bed.addVariableBool(19, "bedLamp", bedLamp);
  bed.addVariableNumber(20, "bedLampBrightness", 0, 255, bedLampBrightness);

  // Validate homes
  desk.validateHome();
  therm.validateHome();
  bed.validateHome();
  parseVariableData();

  // WebSocket initialization
  ws.begin(webSocketServerAddress, webSocketServerPort, "/socket.io/?EIO=4");
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
const unsigned long interval = 10000; // Delay interval in milliseconds

void loop()
{
  ws.loop();
  parseVariableData();
  setGlobalVariables();

  fill_solid(leds, 10, CRGB(255, 0, 0));

  if (deskLamp)
    FastLED.setBrightness(deskLampBrightness);
  else
    FastLED.setBrightness(0);

  FastLED.show();

  if (millis() - previousMillis >= interval)
  {
    previousMillis = millis();

    deskMonitor = random(0, 2);
    thermostatTemperature = random(0, 101);
    thermostatHumidity = random(0, 101);
    thermostatPower = random(0, 2);

    bedLamp = random(0, 2);
    bedLampBrightness = random(0, 256);
    setGlobalVariables();

    String dataDesk = desk.prepareWebSocketData();
    String dataTherm = therm.prepareWebSocketData();
    String dataBed = bed.prepareWebSocketData();

    ws.sendEVENT(dataDesk);
    ws.sendEVENT(dataTherm);
    ws.sendEVENT(dataBed);
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

  thermostatTemperature = therm.getVariableValue("thermostatTemperature");
  thermostatHumidity = therm.getVariableValue("thermostatHumidity");
  thermostatPower = therm.getVariableValue("thermostatPower");

  bedLamp = bed.getVariableValue("bedLamp");
  bedLampBrightness = bed.getVariableValue("bedLampBrightness");
}


void setGlobalVariables()
{
  // Setting global variables to values to fetch them to the server
  desk.setVariableValue("deskLamp", deskLamp);
  desk.setVariableValue("deskLampBrightness", deskLampBrightness);
  desk.setVariableValue("deskMonitor", deskMonitor);

  therm.setVariableValue("thermostatTemperature", thermostatTemperature);
  therm.setVariableValue("thermostatHumidity", thermostatHumidity);
  therm.setVariableValue("thermostatPower", thermostatPower);

  bed.setVariableValue("bedLamp", bedLamp);
  bed.setVariableValue("bedLampBrightness", bedLampBrightness);
}

/**
 * @brief Handles a WebSocket event.
 *
 * This function is responsible for deserializing the payload of a WebSocket event into
 * the event name and event data. It then performs specific actions based on the event name.
 *
 * @param payload The payload of the WebSocket event.
 * @param length The length of the payload.
 */
void handleWebSocketEvent(uint8_t *payload, size_t length)
{
  // Deserializing EVENT payload into EVENT NAME and EVENT DATA
  char *sptr = NULL;
  int id = strtol((char *)payload, &sptr, 10);
  Serial.printf("WS - [IOc] get event: %s id: %d\n", payload, id);
  if (id)
  {
    payload = (uint8_t *)sptr;
  }
  DynamicJsonDocument doc(1024);
  DeserializationError errorDoc = deserializeJson(doc, payload, length);
  if (errorDoc)
  {
    Serial.print(F("WS - deserializeJson() failed: "));
    Serial.println(errorDoc.c_str());
    return;
  }

  String eventName = doc[0];
  Serial.printf("WS - [IOc] event name: %s\n", eventName.c_str());
  Serial.printf("WS - [IOc] payload: %s\n", doc[1].as<String>().c_str());

  if (eventName == "deviceMessage")
  {
    Serial.println("WS - Deserialization of deviceMessage");
    Serial.println(doc[1].as<String>());
    DynamicJsonDocument jsonData(1024);
    DeserializationError errorJson = deserializeJson(jsonData, doc[1].as<String>());
    if (errorJson)
    {
      Serial.print(F("WS - deserializeJson() failed: "));
      Serial.println(errorJson.c_str());
      return;
    }

    JsonObject device = jsonData[0];
    String deviceName = device["dn"].as<String>();
    Serial.printf("WS - [IOc] device name: %s\n", deviceName.c_str());

    if (deviceName == "Desk")
    {
      desk.processDeviceData(doc[1]);
    }
    else if (deviceName == "Bed")
    {
      bed.processDeviceData(doc[1]);
    }
    else if (deviceName == "Thermostat")
    {
      therm.processDeviceData(doc[1]);
    }
    else
    {
      Serial.println("WS - Unknown device name");
      return;
    }
  }
  else
  {
    Serial.println("WS - Unknown event name");
  }
}

/**
 * @brief Handles WebSocket events.
 *
 * This function is called when a WebSocket event occurs. It processes different types of events
 * such as disconnection, connection, events, acknowledgments, errors, binary events, and binary acknowledgments.
 *
 * @param type The type of the WebSocket event.
 * @param payload The payload data associated with the event.
 * @param length The length of the payload data.
 */
void webSocketEvents(socketIOmessageType_t type, uint8_t *payload, size_t length)
{
  switch (type)
  {
  case sIOtype_DISCONNECT:
    Serial.printf("WS - [IOc] Disconnected!\n");
    break;
  case sIOtype_CONNECT:
    Serial.printf("WS - [IOc] Connected to url: %s\n", payload);
    ws.send(sIOtype_CONNECT, "/");
    break;
  case sIOtype_EVENT:
    Serial.printf("WS - [IOc] get event: %s\n", payload);
    handleWebSocketEvent(payload, length);
    break;
  case sIOtype_ACK:
    Serial.printf("WS - [IOc] get ack: %u\n", length);
    break;
  case sIOtype_ERROR:
    Serial.printf("WS - [IOc] get error: %u\n", length);
    break;
  case sIOtype_BINARY_EVENT:
    Serial.printf("WS - [IOc] get binary: %u\n", length);
    break;
  case sIOtype_BINARY_ACK:
    Serial.printf("WS - [IOc] get binary ack: %u\n", length);
    break;
  }
}