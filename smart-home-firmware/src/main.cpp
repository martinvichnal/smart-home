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

// const char *wsServerAddress = "http://192.168.0.53";
// const int wsPort = 3001;
// WebSocketsClient webSocket;

// String url = "https://smart-home-green.vercel.app/api/db/device";
// String url2 = "http://192.168.0.53:8080/api/devices";
// http://192.168.0.53:8080/api/devices/v1?did=b330e7fc-e85f-4057-b39c-953ce556c9dc

// Creating a new smarthome object
SmartHome desk("Desk", "b330e7fc-e85f-4057-b39c-953ce556c9dc", "80ff2b60-bf4b-42fe-8de4-d21734a393c8", "http://192.168.0.53:8080");
// SmartHome therm("Thermostat", "05b31779-14ee-4233-8c9a-2749e81d3ccb", "80ff2b60-bf4b-42fe-8de4-d21734a393c8", "http://192.168.0.53:8080/api/devices/device");
// SmartHome bed("Bed", "93645a58-d45e-498e-80b1-aaf50e290924", "80ff2b60-bf4b-42fe-8de4-d21734a393c8", "http://192.168.0.53:8080/api/devices/device");

// Fucntions
void connectToWifi();     // Connecting to WiFi
void parseVariableData(); // Parsing data from variables for clear code
// void webSocketEvent(WStype_t type, uint8_t *payload, size_t length);

// Global variables
// Desk:
bool lampState = 0;
int lampBrightness = 0;
bool monitor = 0;

#define NUM_LEDS 10
#define DATA_PIN 5

CRGB leds[NUM_LEDS];

// SETUP
void setup()
{
  Serial.begin(115200);
  delay(1000);
  connectToWifi();
  FastLED.addLeds<WS2812B, DATA_PIN, RGB>(leds, NUM_LEDS); // GRB ordering is typical
  FastLED.setBrightness(100);

  // webSocket.begin("192.168.0.53", 5000);
  // webSocket.onEvent(webSocketEvent);

  // Add variables to my smartHome devices
  desk.addVariableBool(13, "lampState", lampState);
  desk.addVariableNumber(14, "lampBrightness", 0, 100, lampBrightness);
  desk.addVariableBool(15, "monitor", monitor);

  // Validate home
  desk.validateHome();

  // Setting global variables to values fetched from server
  parseVariableData();
}

// LOOP
void loop()
{
  // // webSocket.loop();
  // // // Getting data from server every minute
  // desk.pull(5000);

  // // Getting the latest values from server
  // parseVariableData();
  // // Serial.println(lampBrightness);

  // fill_solid(leds, 10, CRGB(255, 68, 221));
  // FastLED.setBrightness(lampBrightness * 2.55);
  // FastLED.show();
  // // Serial.println("Brightness: " + lampBrightness);

  // // Setting SmartHome values to corresponding variables
  // // desk.setVariableValue("lampState", lampState);
  // // desk.setVariableValue("lampBrightness", lampBrightness);
  // // desk.setVariableValue("monitor", monitor);

  // // // // Doing something
  // // desk.push(5000); // Update every 10 seconds
}

void parseVariableData()
{
  lampState = desk.getVariableValue("lampState");
  lampBrightness = desk.getVariableValue("lampBrightness");
  monitor = desk.getVariableValue("monitor");
  Serial.println("Brightness: " + lampBrightness);
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

// void webSocketEvent(WStype_t type, uint8_t *payload, size_t length) {
//   switch (type) {
//     case WStype_CONNECTED:
//       Serial.println("Connected to server");
//       break;
//     case WStype_TEXT:
//       // Handle received text message
//       Serial.printf("Received: %s\n", payload);
//       break;
//     case WStype_DISCONNECTED:
//       Serial.println("Disconnected from server");
//       break;
//   }
// }