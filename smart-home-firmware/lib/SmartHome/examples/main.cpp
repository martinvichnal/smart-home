#include <Arduino.h>
#include <SmartHome.h>

// Server url to send and recive API data
String url = "https://jsonplaceholder.typicode.com/todos/1";

// Creating a new smarthome object with name, homeID and server url
SmartHome room("Smart Door Lock", "asd123", url);
// If you want to create another smartHome object, you can do it again
SmartHome desk("Bedroom Lamp", "dsa321", url);

// Fucntions - This is where you declare your functions
void connectToWifi();

// Global variables - This is where you declare your variables
int var1 = 41;
bool var2 = 0;
int var3 = 24;
bool var4 = 1;

// SETUP
void setup()
{
  Serial.begin(115200);
  delay(1000);
  connectToWifi();

  // Add custom variables to your home class object with your custom values such as pin, name, type, min value, max value and value
  room.addVariableNumber(13, "temperature", 0, 100, var1);
  room.addVariableNumber(14, "humidity", 0, 100, var2);

  desk.addVariableBool(15, "light", var3);
  desk.addVariableBool(16, "led", var4);
}

void loop()
{
    // ** Do some stuff here **

    // Whenever you want to update your variables, you can do it with the following with a specific interval in milliseconds:
    // For example the room object will update its variables every 20 seconds and the desk object will update its variables every 1 second
    room.pull(20000);
    desk.pull(1000);
    // You can set your global variables to the new values of your variables with the following:
    var1 = room.getVariableValue("temperature");
    var2 = room.getVariableValue("humidity");
    var3 = desk.getVariableValue("light");
    var4 = desk.getVariableValue("led");

    // Example push event
    if(var1 > 50)
    {
        room.push();
    }

    // ** Do some stuff here **

    // You can set your variables to the new values of your global variables with the following:
    room.setVariableValue("temperature", var1);
    room.setVariableValue("humidity", var2);
    desk.setVariableValue("light", var3);
    desk.setVariableValue("led", var4);

    // At the end of your loop, or whenever you want you can push your data to the server with the following:
    // (even with a given interval in milliseconds)
    room.push(10000);
    desk.push();
}

void connectToWifi()
{
    // Connect to wifi
}