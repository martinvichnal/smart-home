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
// #include <Arduino_JSON.h>
#include <SmartHome.h>
#include "config.h"

// String url = "https://smart-home-green.vercel.app/api/db/device";
// String url2 = "http://192.168.0.53:8080/api/devices";

// Creating a new smarthome object
SmartHome desk("Desk", "b330e7fc-e85f-4057-b39c-953ce556c9dc", "80ff2b60-bf4b-42fe-8de4-d21734a393c8", "http://192.168.0.53:8080/api/devices/device");
// SmartHome therm("Thermostat", "05b31779-14ee-4233-8c9a-2749e81d3ccb", "80ff2b60-bf4b-42fe-8de4-d21734a393c8", url2);
// SmartHome bed("Bed", "93645a58-d45e-498e-80b1-aaf50e290924", "80ff2b60-bf4b-42fe-8de4-d21734a393c8", url2);

// Fucntions
void connectToWifi();     // Connecting to WiFi
void parseVariableData(); // Parsing data from variables for clear code

// Global variables
// Desk:
bool lampState = 0;
int lampBrightness = 0;
bool monitor = 0;
// // Thermostat:
// int temperature = 0;
// int humidity = 0;
// bool state = 0;
// // Bed:
// bool light = 0;
// bool led = 0;

// SETUP
void setup()
{
  Serial.begin(115200);
  delay(1000);
  connectToWifi();

  // Add variables to my smartHome devices
  desk.addVariableBool(13, "lampState", lampState);
  desk.addVariableNumber(14, "lampBrightness", 0, 100, lampBrightness);
  desk.addVariableBool(15, "monitor", monitor);

  // therm.addVariableNumber(13, "temperature", 0, 100, temperature);
  // therm.addVariableNumber(14, "humidity", 0, 100, humidity);
  // therm.addVariableBool(15, "state", state);

  // bed.addVariableBool(13, "light", light);
  // bed.addVariableBool(14, "led", led);

  // Validate home
  desk.validateHome();
  // therm.validateHome();
  // bed.validateHome();

  // Setting global variables to values fetched from server
  parseVariableData();
}

void loop()
{
  // Getting data from server every minute
  desk.pull(60000);
  // therm.pull(60000);
  // bed.pull(60000);

  // Changing global variables to random numbers
  lampState = random(0, 2);
  lampBrightness = random(0, 100);
  monitor = random(0, 2);
  // temperature = random(0, 100);
  // humidity = random(0, 100);
  // state = random(0, 2);
  // light = random(0, 2);
  // led = random(0, 2);

  // Setting SmartHome values to corresponding variables
  desk.setVariableValue("lampState", lampState);
  desk.setVariableValue("lampBrightness", lampBrightness);
  desk.setVariableValue("monitor", monitor);
  // therm.setVariableValue("temperature", temperature);
  // therm.setVariableValue("humidity", humidity);
  // therm.setVariableValue("state", state);
  // bed.setVariableValue("light", light);
  // bed.setVariableValue("led", led);

  // Doing something
  desk.push(10000); // Update every 10 seconds
  // therm.push(60000);  // Update every 60 seconds
  // bed.push(30000);    // Update every 30 seconds
}

void parseVariableData()
{
  lampState = desk.getVariableValue("lampState");
  lampBrightness = desk.getVariableValue("lampBrightness");
  monitor = desk.getVariableValue("monitor");

  // temperature = therm.getVariableValue("temperature");
  // humidity = therm.getVariableValue("humidity");
  // state = therm.getVariableValue("state");

  // light = bed.getVariableValue("light");
  // led = bed.getVariableValue("led");
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