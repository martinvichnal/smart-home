#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <Arduino_JSON.h> 
#include <SmartHome.h>
#include "config.h"

// Fucntions
void connectToWifi();
String httpGETRequest(const char* serverName);

// Global variables

// const char * serverName = "https://jsonplaceholder.typicode.com/users";
const char * serverName = "https://smart-home-green.vercel.app/api/db/device";
// https://smart-home-green.vercel.app/api/db/device?did=89c44c3dbab948faa265ecd787743f15

// SETUP
void setup()
{
  Serial.begin(115200);
  delay(1000);
  connectToWifi();
  // Creating a new smarthome object
  // SmartHome smartHome(deviceName, deviceID);

  // Setting server and WiFi credentials
  // smarthome.setServer(serverLink, serverPort);
  // smarthome.setCredentials("username", "password");
  // smartHome.setWifi(wifiSSID, wifiPassword);

  // Setting Variables along with their types and limits
  // Types: n - number, b - boolean
  // Limits: for numbers - min, max, for boolean - none
  // smartHome.addVariableNumber({pin number}, "temperature", n, 0, 100);
  // smartHome.addVariableNumber("humidity", n, 0, 100);
  // smartHome.addVariableBool("light", b);
  // smartHome.addVariableBool("led", b);

}

String sensorReadings;

void loop()
{
  // DO STUFF HERE

  // Update the smarthome variables and sending to server
  // smartHome.update();
  // smartHome.push();
  sensorReadings = httpGETRequest(serverName);
  Serial.println(sensorReadings);
  JSONVar myObject = JSON.parse(sensorReadings);
  
  // JSON.typeof(jsonVar) can be used to get the type of the var
  if (JSON.typeof(myObject) == "undefined") {
    Serial.println("Parsing input failed!");
    return;
  }
    
  Serial.print("JSON object = ");
  Serial.println(myObject);
  delay(20000);  
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


// char* postData = "key1=value1&key2=value2";
String httpGETRequest(const char* serverName) {
  HTTPClient http;

  Serial.print(serverName);
    
  // Your Domain name with URL path or IP address with path
  http.begin("https://smart-home-green.vercel.app/api/db/device");

  // Send HTTP POST request
  int httpResponseCode = http.GET();
  
  String payload = "{}";
  
  if (httpResponseCode>0) {
    payload = http.getString();
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    Serial.print("HTTP Payload: ");
    Serial.println(payload);
  }
  else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  // Free resources
  http.end();

  return payload;
}

