/**
 * @file SmartHome.cpp
 * @author Martin Vichnál
 * @page https://github.com/martinvichnal/smart-home
 * @brief Custom ESP32 library for my SmartHome project
 * @version v1.0.0
 * @date 2023-11-22
 * 
 * @copyright Copyright (c) 2023
 * 
 * @note This library is not finished yet
 * @todo Implement HTTP GET and POST requests
 * @todo Implement validation check for maximum and minimum values and types
 */

#include "SmartHome.h"


/*

 /$$    /$$                    /$$           /$$       /$$          
| $$   | $$                   |__/          | $$      | $$          
| $$   | $$ /$$$$$$   /$$$$$$  /$$  /$$$$$$ | $$$$$$$ | $$  /$$$$$$ 
|  $$ / $$/|____  $$ /$$__  $$| $$ |____  $$| $$__  $$| $$ /$$__  $$
 \  $$ $$/  /$$$$$$$| $$  \__/| $$  /$$$$$$$| $$  \ $$| $$| $$$$$$$$
  \  $$$/  /$$__  $$| $$      | $$ /$$__  $$| $$  | $$| $$| $$_____/
   \  $/  |  $$$$$$$| $$      | $$|  $$$$$$$| $$$$$$$/| $$|  $$$$$$$
    \_/    \_______/|__/      |__/ \_______/|_______/ |__/ \_______/

*/
Variable::Variable(int pin, const String& name, char type, int minValue, int maxValue, int value)
    : pin(pin), name(name), type(type), minValue(minValue), maxValue(maxValue), value(value) {}

/**
 * @brief Stringify the variable to send to the database
 * @return String 
 */
String Variable::toString() const {
    return name + "-" + type + "-" + String(minValue) + "-" + String(maxValue) + "-" + String(value);
}

/**
 * @brief Getting variable pin number
 * @return int 
 */
int Variable::getPin() const {
    return pin;
}

/**
 * @brief Getting variable name
 * @return String 
 */
String Variable::getName() const {
    return name;
}

/**
 * @brief Getting variable type
 * @return char 
 */
char Variable::getType() const {
    return type;
}

/**
 * @brief Getting variable minimum value
 * @return int 
 */
int Variable::getMinValue() const {
    return minValue;
}

/**
 * @brief Getting variable maximum value
 * @return int 
 */
int Variable::getMaxValue() const {
    return maxValue;
}

/**
 * @brief Getting variable value
 * @return int 
 */
int Variable::getValue() const {
    return value;
}

/**
 * @brief Setting variable value
 * @todo Add validation for other types
 * @param newValue 
 */
void Variable::setValue(int newValue) {
  value = newValue;
}


/*

  /$$$$$$                                      /$$           /$$   /$$                                  
 /$$__  $$                                    | $$          | $$  | $$                                  
| $$  \__/ /$$$$$$/$$$$   /$$$$$$   /$$$$$$  /$$$$$$        | $$  | $$  /$$$$$$  /$$$$$$/$$$$   /$$$$$$ 
|  $$$$$$ | $$_  $$_  $$ |____  $$ /$$__  $$|_  $$_/        | $$$$$$$$ /$$__  $$| $$_  $$_  $$ /$$__  $$
 \____  $$| $$ \ $$ \ $$  /$$$$$$$| $$  \__/  | $$          | $$__  $$| $$  \ $$| $$ \ $$ \ $$| $$$$$$$$
 /$$  \ $$| $$ | $$ | $$ /$$__  $$| $$        | $$ /$$      | $$  | $$| $$  | $$| $$ | $$ | $$| $$_____/
|  $$$$$$/| $$ | $$ | $$|  $$$$$$$| $$        |  $$$$/      | $$  | $$|  $$$$$$/| $$ | $$ | $$|  $$$$$$$
 \______/ |__/ |__/ |__/ \_______/|__/         \___/        |__/  |__/ \______/ |__/ |__/ |__/ \_______/
                                                                                                        
                                                                
*/                                                                
SmartHome::SmartHome(const String& deviceName, const String& deviceID)
  : deviceName(deviceName), deviceID(deviceID) {}

/**
 * @brief Adding new NUMBER variable to the SmartHome class
 * @param pin 
 * @param name 
 * @param minValue 
 * @param maxValue 
 * @param value 
 */
void SmartHome::addVariableNumber(int pin, const String& name, int minValue, int maxValue, int value) {
    variables.push_back(Variable(pin, name, 'n', minValue, maxValue, value));
}

/**
 * @brief Adding new BOOLEAN variable to the SmartHome class
 * @param pin 
 * @param name 
 * @param value 
 */
void SmartHome::addVariableBool(int pin, const String& name, int value) {
    variables.push_back(Variable(pin, name, 'b', 0, 0, value));
}

/**
 * @brief Setting variable value by name
 * @param name 
 * @param value 
 */
void SmartHome::setVariableValue(const String& name, int value) {
    auto variableIt = std::find_if(
        variables.begin(), variables.end(),
        [name](const Variable& variable) { return variable.getName() == name; });

    if (variableIt != variables.end()) {
        // Update the value of the found variable
        variableIt->setValue(value);
    } else {
        Serial.println("Variable not found!");
    }
}

/**
 * @brief Pushing data to the server
 */
void SmartHome::push() {
    String data;
    for (const auto& variable : variables) {
        data += variable.toString() + "--";
    }
    Serial.print("Sending data to server: ");
    Serial.println(data);
    // sendToServer(data);
}

/**
 * @brief Updating data from the server within a specific interval (in milliseconds) (not implemented yet)
 * @param interval in ms
 */
void SmartHome::update(int interval) {
    unsigned long currentMillis = millis();
    if (currentMillis - previousMillis >= interval) {
        String receivedData = fetchDataFromServer();
        processReceivedData(receivedData);

        previousMillis = currentMillis;
    }
}

/**
 * @brief Sending data to the server with HTTP API POST request (not implemented yet)
 * @todo Implement HTTP POST request
 * @param data 
 */
void SmartHome::sendToServer(const String& data) {
    // Implement HTTP POST request
    HTTPClient http;
    http.begin("");
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");

    String payload = "deviceID=" + deviceID + "&data=" + data;

    int httpResponseCode = http.POST(payload);
    if (httpResponseCode > 0) {
        Serial.printf("HTTP POST success, response code: %d\n", httpResponseCode);
    } else {
        Serial.printf("HTTP POST failed, response code: %d\n", httpResponseCode);
    }

    http.end();
}

/**
 * @brief Fetching data from the server with HTTP API GET request (not implemented yet)
 * @todo Implement HTTP GET request
 * @return String 
 */
String SmartHome::fetchDataFromServer() {
    // Implement HTTP GET request
    HTTPClient http;
    http.begin("" + deviceID);

    int httpResponseCode = http.GET();
    if (httpResponseCode == HTTP_CODE_OK) {
        String response = http.getString();
        Serial.printf("HTTP GET success, response: %s\n", response.c_str());
        return response;
    } else {
        Serial.printf("HTTP GET failed, response code: %d\n", httpResponseCode);
        return "";
    }

    http.end();
}

/**
 * @brief Processing received data from the server (not implemented yet)
 * @todo Implement logic to process received data
 * @todo Parse the data and update variables
 * @todo Validation check
 * @param data 
 */
void SmartHome::processReceivedData(const String& data) {
    // Implement logic to process received data
    // Example: Parse the data and update variables
}
