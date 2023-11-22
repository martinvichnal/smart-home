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
#include "SmartHome.h"
#include "config.h"

// Creating a new smarthome object
SmartHome smartDoorLock("Smart Door Lock", "89c44c3dbab948faa265ecd787743f15");
SmartHome bedRoomLamp("Bedroom Lamp", "72ca9db90d31439dbf540c48b07abdb6");

// Fucntions
void connectToWifi();
// String fetchDataFromServer();
// void processReceivedData(const String& data);

// Global variables

int temp = 24;
int hum = 69;
bool light = false;
bool led = true;

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
}

void loop()
{
  // smartHome.setVariableValue("temperature", temp);
  // smartHome.setVariableValue("humidity", hum);
  // temp++;
  // hum++;
  // delay(5000);
  // smartHome.push();
  // // smartHome.update(20000);
  smartDoorLock.update(10000);
  bedRoomLamp.update(20000);
  // delay(30000);
}


void connectToWifi()
{
    WiFi.mode(WIFI_STA); //Optional
    WiFi.begin(ssid, password);
    Serial.println("\nConnecting");

    while(WiFi.status() != WL_CONNECTED){
        Serial.print(".");
        delay(100);
    }

    Serial.println("\nConnected to the WiFi network");
    Serial.print("Local ESP32 IP: ");
    Serial.println(WiFi.localIP());
}