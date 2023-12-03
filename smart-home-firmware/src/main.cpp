/**
 * @file main.cpp
 * @author Martin Vichnál
 * @page https://github.com/martinvichnal/smart-home
 * @brief ESP32 firmware for my SmartHome project using my custom library
 * @version v1.0.0
 * @date 2023-11-22
 *
 * @copyright Copyright (c) 2023
 *
 */

#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
// #include <WebSocketsClient.h>
// #include <Arduino_JSON.h>
#include <SmartHome.h>
#include <FastLED.h>
#include "config.h"
#include <WebSocketsClient.h>

// Fucntions
void connectToWifi(); // Connecting to WiFi

// Socket.IO functions
WebSocketsClient webSocket;

void webSocketEvent(WStype_t type, uint8_t *payload, size_t length);

char webSocketServerAddress[] = "192.168.0.53"; // Socket.IO Server Address
int webSocketServerPort = 5000;                 // Socket.IO Port Address

// SETUP
void setup()
{
  Serial.begin(115200);
  delay(1000);
  connectToWifi();

  // Setup WebSocket connection
  webSocket.begin("192.168.0.53", 5000);

  // Setup WebSocket event handler
  webSocket.onEvent(webSocketEvent);
}

int count = 0;
// LOOP
void loop()
{
  webSocket.loop();
  count++;
  if (count == 18000)
  {
    count = 0;

    // Format message as JSON
    String message = "{\"type\":\"deviceMessage\",\"data\":\"Hello from esp32!\"}";

    // Send message
    webSocket.sendTXT(message);
  }
}

void webSocketEvent(WStype_t type, uint8_t *payload, size_t length)
{
  switch (type)
  {
  case WStype_DISCONNECTED:
    Serial.printf("[WSc] Disconnected!\n");
    break;
  case WStype_CONNECTED:
    Serial.printf("[WSc] Connected to url: %s\n", payload);
    break;
  case WStype_TEXT:
    Serial.printf("[WSc] get text: %s\n", payload);

    // If the incoming message is "serverMessage", do something
    if (strcmp((char *)payload, "serverMessage") == 0)
    {
      Serial.println("Message received!" + String((char *)payload));
    }
    break;
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