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
SmartHome desk("Desk", "123", "1124", "http://158.220.110.116:8080");
SmartHome therm("Thermostat", "456", "1124", "http://158.220.110.116:8080");
SmartHome bed("Bed", "789", "1124", "http://158.220.110.116:8080");

// Fucntions
void connectToWifi();      // Connecting to WiFi
void parseVariableData();  // Parsing data from variables for clear code
void setGlobalVariables(); // Setting variables to values to fetch them to the server
// void webSocketEvent(WStype_t type, uint8_t *payload, size_t length);

// Global variables
// Desk:
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

  // Setting global variables to values fetched from server
  parseVariableData();
}

// LOOP
void loop()
{
  // webSocket.loop();

  // Fetching data from server
  desk.pull(1000);
  therm.pull(30000);
  bed.pull(60000);

  parseVariableData();

  fill_solid(leds, 10, CRGB(255, 0, 0));
  FastLED.setBrightness(deskLampBrightness);
  // if (deskLamp)
  //   FastLED.setBrightness(deskLampBrightness);
  // else
  //   FastLED.setBrightness(0);

  FastLED.show();

  // Adding random values to variables for testing
  // Commenting these because I use them
  // deskLamp = random(0, 2);
  // deskLampBrightness = random(0, 256);
  deskMonitor = random(0, 2);

  thermostatTemperature = random(0, 101);
  thermostatHumidity = random(0, 101);
  thermostatPower = random(0, 2);

  bedLamp = random(0, 2);
  bedLampBrightness = random(0, 256);

  setGlobalVariables();

  desk.push(1000);
  therm.push(1500);
  bed.push(2000);
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