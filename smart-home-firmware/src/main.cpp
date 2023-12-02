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
#include <SocketIoClient.h>

// Fucntions
void connectToWifi(); // Connecting to WiFi

// Socket.IO functions
SocketIoClient webSocket;

void wsConnect(const char *payload, size_t length);
void wsEvent(const char *payload, size_t length);
void weServerMessage(const char *payload, size_t length);

char host[] = "http://192.168.0.53";                    // Socket.IO Server Address
int port = 5000;                                 // Socket.IO Port Address
char path[] = "/socket.io/?transport=websocket"; // Socket.IO Base Path

// SETUP
void setup()
{
  Serial.begin(115200);
  delay(1000);
  connectToWifi();

  // Connect to socket.io server
  webSocket.begin(host, port, path);
  // Setup 'on' listen events
  webSocket.on("connection", wsConnect);
  webSocket.on("serverMessage", wsEvent);
  // webSocket.on("status", wsStatus);
  // webSocket.on("state_change_request", wsChange);
}

// LOOP
void loop()
{
  webSocket.loop();
  EVERY_N_SECONDS(1)
  {
    webSocket.emit("clientMessage", "esp32");
  }
}

void wsConnect(const char *payload, size_t length)
{
  Serial.println("Connected to Socket.IO server");
  webSocket.emit("join", "esp32");
}

void wsEvent(const char *payload, size_t length)
{
  Serial.print("got message: ");
  Serial.println(payload);
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