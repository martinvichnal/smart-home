#include <Arduino.h>
#include <SmartHome.h>

void setup()
{

  // Creating a new smarthome object
  char[] deviceName = "Bedroom switch";
  char[] deviceID = "d7b072ca90c48abdb9031436db9dbf54";
  SmartHome smartHome(deviceName, deviceID);

  // Setting server and WiFi credentials
  char[] wifiSSID = "ssid";
  char[] wifiPassword = "password";
  char[] serverName = "server";
  char[] serverLink = "serverLink";
  int serverPort = 80;

  smarthome.setServer(serverLink, serverPort);
  smarthome.setCredentials("username", "password");
  smartHome.setWifi(wifiSSID, wifiPassword);

  // Setting Variables along with their types and limits
  // Types: n - number, b - boolean
  // Limits: for numbers - min, max, for boolean - none
  smartHome.addVariableNumber("temperature", n, 0, 100);
  smartHome.addVariableNumber("humidity", n, 0, 100);
  smartHome.addVariableBool("light", b);
  smartHome.addVariableBool("led", b);

}

void loop()
{

  // DO STUFF HERE

  // Update the smarthome variables and sending to server
  smartHome.update();
  smartHome.push();
}