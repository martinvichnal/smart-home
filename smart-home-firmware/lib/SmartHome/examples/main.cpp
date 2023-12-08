#include <Arduino.h>
#include <SmartHome.h>

// Creating a new smarthome object with name, homeID, userID and server url
SmartHome desk("Desk", "123", "1124", "http://server:8080");
// If you want to create another smartHome object, you can do it again
SmartHome therm("Thermostat", "456", "1124", "http://server:8080");
SmartHome bed("Bed", "789", "1124", "http://server:8080");

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

    // Add custom variables to your home class object with your custom values 
    // such as pin, name, type, min value, max value and value
    desk.addVariableBool(16, "led", var1);
    therm.addVariableNumber(13, "temperature", 0, 100, var2);
    therm.addVariableNumber(14, "humidity", 0, 100, var3);
    bed.addVariableBool(15, "light", var4);

    // Validate your home with the server
    desk.validateHome();
    therm.validateHome();
    bed.validateHome();
}

void loop()
{
    // ** Do some stuff here **

    // Whenever you want to update your variables, you can do it with the following with a specific interval in milliseconds:
    // For example the room object will update its variables every 20 seconds and the desk object will update its variables every 1 second
    desk.pull();
    therm.pull(1000);
    bed.pull(20000);

    // You can set your global variables to the new values of your variables with the following:
    var1 = desk.getVariableValue("led");
    var2 = therm.getVariableValue("temperature");
    var3 = therm.getVariableValue("humidity");
    var4 = bed.getVariableValue("light");

    // Example push event
    if (var1 > 50)
    {
        therm.push();
    }

    // ** Do some stuff here **

    // You can set your variables to the new values of your global variables with the following:
    desk.setVariableValue("led", var1);
    therm.setVariableValue("temperature", var2);
    therm.setVariableValue("humidity", var3);
    bed.setVariableValue("light", var4);

    // At the end of your loop, or whenever you want you can push your data to the server with the following:
    // (even with a given interval in milliseconds)
    desk.push(10000);
    bed.push();
}

void connectToWifi()
{
    // Connect to wifi
}