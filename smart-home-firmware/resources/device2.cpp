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

#include "DHT.h"

#define DHTPIN 4
#define DHTTYPE DHT11 // DHT 11

SmartHome led("Led", "4", "1124", "http://158.220.110.116:8080");
SmartHome tmp("DHT11", "5", "1124", "http://158.220.110.116:8080");

// Desk variables:
bool ledVariable = 0;
int temp = 0;
int hum = 0;

void parseVariableData();  // Parsing data from variables for clear code
void setGlobalVariables(); // Setting variables to values to fetch them to the server

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

DHT dht(DHTPIN, DHTTYPE);

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

  pinMode(LED_BUILTIN, OUTPUT);
  dht.begin();

  led.addVariableBool(LED_BUILTIN, "ledVariable", ledVariable);
  tmp.addVariableNumber(1, "temp", 0, 100, temp);
  tmp.addVariableNumber(0, "hum", 0, 100, hum);

  // Validate homes
  tmp.validateHome();
  led.validateHome();
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
const unsigned long interval = 2000; // Delay interval in milliseconds

void loop()
{

  ws.loop();
  parseVariableData();
  setGlobalVariables();

  if (ledVariable == 1)
  {
    digitalWrite(LED_BUILTIN, HIGH);
  }
  else if (ledVariable == 0)
  {
    digitalWrite(LED_BUILTIN, LOW);
  }

  if (millis() - previousMillis >= interval)
  {
    previousMillis = millis();

    float h = dht.readHumidity();
    float t = dht.readTemperature();
    tmp.setVariableValue("temp", t);
    tmp.setVariableValue("hum", h);
    Serial.print("Humidity: ");
    Serial.println(h);
    Serial.print("Temperature: ");
    Serial.println(t);
    String dataTmp = tmp.prepareWebSocketData();

    ws.sendEVENT(dataTmp);
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
  ledVariable = led.getVariableValue("ledVariable");
  temp = tmp.getVariableValue("temp");
  hum = tmp.getVariableValue("hum");
}

void setGlobalVariables()
{
  // Setting global variables to values to fetch them to the server
  led.setVariableValue("ledVariable", ledVariable);
  tmp.setVariableValue("temp", temp);
  tmp.setVariableValue("hum", hum);
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

    if (deviceName == "Led")
    {
      led.processDeviceData(doc[1]);
    }
    else if (deviceName == "DHT11")
    {
      tmp.processDeviceData(doc[1]);
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