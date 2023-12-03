/**
 * @file main.cpp
 * @author Martin Vichnál
 * @page https://github.com/martinvichnal/smart-home
 * @brief ESP32 firmware for my SmartHome project using my custom library
 * @version v1.1.1.1
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

#include <WebSocketsClient.h>
#include <SocketIOclient.h>

// Fucntions
void connectToWifi(); // Connecting to WiFi
void webSocketEvents(socketIOmessageType_t type, uint8_t *payload, size_t length);

// Socket.IO functions
SocketIOclient ws;

// SETUP
void setup()
{
  Serial.begin(115200);
  delay(1000);
  connectToWifi();

  // server address, port and URL
  ws.begin(webSocketServerAddress, webSocketServerPort, "/socket.io/?EIO=4");
  // event handler
  ws.onEvent(webSocketEvents);
}

int count = 0;
unsigned long messageTimestamp = 0;

// LOOP
void loop()
{
  ws.loop();

  uint64_t now = millis();

  if (now - messageTimestamp > 2000)
  {
    messageTimestamp = now;
    // Creating json object
    DynamicJsonDocument doc(1024);
    JsonArray array = doc.to<JsonArray>();

    // add event name
    array.add("deviceMessage");

    // add payload (parameters) for the event
    JsonObject param1 = array.createNestedObject();
    param1["now"] = (uint32_t)now;

    // JSON to String (serializion)
    String output;
    serializeJson(doc, output);

    // Send event
    ws.sendEVENT(output);

    // Print JSON for debugging
    Serial.println(output);
  }
}

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
    // [IOc] get event: ["webMessage","device data"]
    // [IOc] get event: ["deviceMessage","web data"]
    // If the incoming message is "fromServer", do something
    if (strcmp((char *)payload, "deviceMessage") == 0)
    {
      // Do something when the "fromServer" message is received
      Serial.println("fromServer");
    }
    // Serial.println(payload);
    break;
  }
}