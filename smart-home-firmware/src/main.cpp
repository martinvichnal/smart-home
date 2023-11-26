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

String url = "https://smart-home-green.vercel.app/api/db/device";
// Creating a new smarthome object
SmartHome smartDoorLock("Smart Door Lock", "89c44c3dbab948faa265ecd787743f15", url);
// SmartHome bedRoomLamp("Bedroom Lamp", "72ca9db90d31439dbf540c48b07abdb6");

// Fucntions
void connectToWifi();
// String fetchDataFromServer();
// void processReceivedData(const String& data);

// Global variables
int battery = 0;
bool locked = 0;

// SETUP
void setup()
{
  Serial.begin(115200);
  delay(1000);
  connectToWifi();

  // Add variables to my smartHome
  // smartHome.addVariableNumber(13, "temperature", 0, 100, temp);
  // smartHome.addVariableNumber(14, "humidity", 0, 100, hum);
  // smartHome.addVariableBool(15, "light", light);
  // smartHome.addVariableBool(16, "led", led);
  smartDoorLock.addVariableNumber(16, "battery", 0, 100, battery);
  smartDoorLock.addVariableBool(15, "locked", locked);
}

void loop()
{
  smartDoorLock.pull(20000);
  smartDoorLock.setVariableValue("battery", 24);
  smartDoorLock.setVariableValue("locked", 1);
  smartDoorLock.push(10000);
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