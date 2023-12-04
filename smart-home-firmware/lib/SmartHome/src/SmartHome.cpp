/**
 * @file SmartHome.cpp
 * @author Martin Vichnál
 * @page https://github.com/martinvichnal/smart-home
 * @brief Custom ESP32 library for my SmartHome project
 * @version v1.2.0.0
 * @date 2023-12-04
 *
 * @copyright Copyright (c) 2023
 *
 * @note This library is not finished yet
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
/**
 * @brief Constructor
 * @param pin Variable physical pin
 * @param name Variable name
 * @param type Variable type
 * @param minValue Minimum variable value
 * @param maxValue Maximum variable value
 * @param value Variable value
 * @todo Implement validation check for maximum and minimum values and types
 */
Variable::Variable(int pin, String name, char type, int minValue, int maxValue, int value)
    : pin(pin), name(name), type(type), minValue(minValue), maxValue(maxValue), value(value) {}

/**
 * @brief Stringify the variable to send to the database
 * @return String - variable string
 */
String Variable::toString()
{
    String n = getName();
    String t = String(getType());
    String min = String(getMinValue());
    String max = String(getMaxValue());
    String v = String(getValue());

    return n + "-" + t + "-" + min + "-" + max + "-" + v;
}

/**
 * @brief Getting variable pin number
 * @return int - variable pin number
 */
int Variable::getPin()
{
    return pin;
}

/**
 * @brief Getting variable name
 * @return String - variable name
 */
String Variable::getName()
{
    return name;
}

/**
 * @brief Getting variable type
 * @return char - 'n' for number, 'b' for boolean
 */
char Variable::getType()
{
    return type;
}

/**
 * @brief Getting variable minimum value
 * @return int - variable minimum value
 */
int Variable::getMinValue()
{
    return minValue;
}

/**
 * @brief Getting variable maximum value
 * @return int - variable maximum value
 */
int Variable::getMaxValue()
{
    return maxValue;
}

/**
 * @brief Getting variable value
 * @return int - variable value
 */
int Variable::getValue()
{
    return value;
}

/**
 * @brief Setting variable value
 * @param newValue new variable value
 */
void Variable::setValue(int newValue)
{
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

/**
 * @brief Constructor
 * @param homeName Home name
 * @param homeID Home ID
 * @param userID User ID
 * @param serverUrl Server URL
 */
SmartHome::SmartHome(String homeName, String homeID, String userID, String serverUrl)
    : homeName(homeName), homeID(homeID), userID(userID), serverUrl(serverUrl) {}

/**
 * @brief Getting home ID
 * @return String - homeID
 */
String SmartHome::getHomeID()
{
    return homeID;
}

/**
 * @brief Getting home name
 * @return String - homeName
 */
String SmartHome::getHomeName()
{
    return homeName;
}

/**
 * @brief Getting the home's owner userID
 * @return String - userID
 */
String SmartHome::getUserID()
{
    return userID;
}

/**
 * @brief Getting serverUrl where the API is fetched from
 * @return String - serverUrl
 */
String SmartHome::getServerUrl()
{
    return serverUrl;
}

/**
 * @brief Adding new NUMBER variable to the SmartHome class
 * @param pin Variable physical pin
 * @param name Variable name
 * @param minValue Minimum variable value
 * @param maxValue Maximum variable value
 * @param value Variable value
 */
void SmartHome::addVariableNumber(int pin, String name, int minValue, int maxValue, int value)
{
    variables.push_back(Variable(pin, name, 'n', minValue, maxValue, value));
}

/**
 * @brief Adding new BOOLEAN variable to the SmartHome class
 * @param pin Variable physical pin
 * @param name Variable name
 * @param value Variable value
 */
void SmartHome::addVariableBool(int pin, String name, int value)
{
    variables.push_back(Variable(pin, name, 'b', 0, 0, value));
}

/**
 * @brief Get the variable vale by name
 * @param name Variable name
 * @return int - Variable value
 */
int SmartHome::getVariableValue(String variableName)
{
    auto variableIt = std::find_if(
        variables.begin(), variables.end(), [variableName](Variable variable)
        { return variable.getName() == variableName; });

    if (variableIt != variables.end())
    {
        // Return the value of the found variable
        return variableIt->getValue();
    }
    else
    {
        Serial.println("getVariableValue - ERROR! - Variable not found: " + variableName);
        return -1; // Or another value indicating an error
    }
}

/**
 * @brief Get the variables string
 * @return String - DeviceData string
 */
String SmartHome::getVariablesString()
{
    String data;
    for (auto variable : variables)
    {
        data += variable.toString() + "--";
    }
    return data;
}

/**
 * @brief Setting variable value by name
 * @param name - Variable name
 * @param value - Variable value
 */
void SmartHome::setVariableValue(String name, int value)
{
    auto variableIt = std::find_if(
        variables.begin(), variables.end(),
        [name](Variable variable)
        { return variable.getName() == name; });

    if (variableIt != variables.end())
    {
        // Update the value of the found variable
        variableIt->setValue(value);
    }
    else
    {
        Serial.println("setVariableValue - ERROR! - Variable not found: " + name);
    }
}

/**
 * @brief Validating home. Checks if the device is already in the database. If not it creates a new device in the database
 */
void SmartHome::validateHome()
{
    if (processDeviceData(fetchDataFromServer(getHomeID())) == false)
    {
        Serial.println("VALIDATE - Device not found in database... Creating new device in database");

        String data;
        for (auto variable : variables)
        {
            data += variable.toString() + "--";
        }

        HTTPClient http;
        http.begin(serverUrl + "/api/devices");
        http.addHeader("Content-Type", "application/json");

        String did = getHomeID();
        String dn = getHomeName();
        String dd = data;
        String uid = getUserID();

        String jsonOutput = "{\"did\":\"" + did + "\",\"dn\":\"" + dn + "\",\"dd\":\"" + dd + "\",\"uid\":\"" + uid + "\"}";
        Serial.println("VALIDATE - " + serverUrl + "/api/devices" + " body: " + jsonOutput);

        int httpResponseCode = http.POST(String(jsonOutput));
        if (httpResponseCode > 0)
        {
            Serial.printf("VALIDATE - HTTP POST success, response code: %d\n", httpResponseCode);
        }
        else
        {
            Serial.printf("VALIDATE - ERROR! - HTTP POST failed, response code: %d\n", httpResponseCode);
        }

        http.end();
        Serial.println();
    }
    else
    {
        Serial.println("VALIDATE - Device found in database... Proceedeing startup and fetching data from server");
    }

    // Not needed because the beggining of the if it is 100% that calls this.
    // processDeviceData(fetchDataFromServer(getHomeID()));
}

/**
 * @brief Pulling data from the server and setting the variables to the received data
 */
void SmartHome::pull()
{
    processDeviceData(fetchDataFromServer(getHomeID()));
}

/**
 * @brief Pulling data from the server within a specific interval (in milliseconds)
 * @param interval in ms
 */
void SmartHome::pull(int interval)
{
    if (millis() - previousPullMillis >= interval)
    {
        processDeviceData(fetchDataFromServer(getHomeID()));
        previousPullMillis = millis();
    }
}

/**
 * @brief Creates DD string and pushes to the server
 */
void SmartHome::push()
{
    String data;
    for (auto variable : variables)
    {
        data += variable.toString() + "--";
    }
    Serial.println("PUSH - Sending data to server: " + data);
    Serial.println();
    sendToServer(data);
}

/**
 * @brief Creates DD string and pushes to the server within a specific interval (in milliseconds)
 * @param interval in ms
 */
void SmartHome::push(int interval)
{
    if (millis() - previousPushMillis >= interval)
    {
        String data;
        for (auto variable : variables)
        {
            data += variable.toString() + "--";
        }
        Serial.println();
        Serial.print("PUSH - Sending data to server: ");
        Serial.println(data);
        Serial.println();
        sendToServer(data);

        previousPushMillis = millis();
    }
}

/**
 * @brief Sending data to the server with HTTP API POST request (not implemented yet)
 * @todo Implement HTTP POST request
 * @param data device data
 */
void SmartHome::sendToServer(String data)
{
    Serial.println("API SEND - Sending data to server");

    HTTPClient http;
    http.begin(serverUrl + "/api/devices/deviceDID");
    http.addHeader("Content-Type", "application/json");

    String did = getHomeID();
    String dn = getHomeName();
    String dd = data;
    String uid = getUserID();

    String jsonOutput = "{\"did\":\"" + did + "\",\"dn\":\"" + dn + "\",\"dd\":\"" + dd + "\",\"uid\":\"" + uid + "\"}";
    Serial.println("API SEND - " + serverUrl + "/api/devices" + " body: " + jsonOutput);

    int httpResponseCode = http.PUT(String(jsonOutput));
    if (httpResponseCode > 0)
    {
        Serial.printf("API SEND - HTTP PUT success, response code: %d\n", httpResponseCode);
    }
    else
    {
        Serial.printf("API SEND - ERROR! - HTTP PUT failed, response code: %d\n", httpResponseCode);
    }

    http.end();
    Serial.println();
}

/**
 * @brief Fetching data from the server with HTTP API GET request
 * @todo Implement HTTP GET request
 * @return String - received data from the server
 * @param parameter device ID
 */
String SmartHome::fetchDataFromServer(String parameter)
{
    Serial.println("API FETCH - Fetching data from server");

    HTTPClient http;
    http.begin(serverUrl + "/api/devices/deviceDID?did=" + parameter);
    Serial.println("API FETCH - Requesting on: " + serverUrl + "/api/devices/deviceDID?did=" + parameter);

    int httpResponseCode = http.GET();
    if (httpResponseCode == HTTP_CODE_OK)
    {
        String response = http.getString();
        Serial.printf("API FETCH - HTTP GET success, response: %s\n", response.c_str());
        return response;
    }
    else
    {
        Serial.printf("API FETCH - ERROR! - HTTP GET failed, response code: %d\n", httpResponseCode);
        return "";
    }

    http.end();
}

/**
 * @brief Process device data into their corresponding variables and pushes it to the SQL server using API
 * @param data DeviceData string
 * @return true - if data is processed or has something in it.
 * @return false - if data is empty
 */
bool SmartHome::processDeviceData(String data)
{
    Serial.println();
    DynamicJsonDocument jsonData(1024);
    DeserializationError error = deserializeJson(jsonData, data);

    if (error == DeserializationError::Ok)
    {
        if (jsonData.is<JsonArray>())
        {
            JsonArray devices = jsonData.as<JsonArray>();
            if (devices.size() == 0)
            {
                return false;
            }
            else
            {
                for (auto device : devices)
                {
                    String deviceId = device["did"].as<String>();
                    String deviceName = device["dn"].as<String>();
                    String deviceData = device["dd"].as<String>();
                    String userId = device["uid"].as<String>();

                    Serial.println("processDeviceData - Parsed data from server:");
                    Serial.println("processDeviceData - Device ID: " + deviceId);
                    Serial.println("processDeviceData - Device name: " + deviceName);
                    Serial.println("processDeviceData - Device data: " + deviceData);
                    Serial.println("processDeviceData - User ID: " + userId);

                    // TODO: process device data into their corresponding variables
                    int startIndex = 0;

                    while (startIndex < deviceData.length())
                    {
                        int endIndex = deviceData.indexOf("--", startIndex);

                        if (endIndex == -1)
                        {
                            endIndex = deviceData.length();
                        }

                        String variableData = deviceData.substring(startIndex, endIndex);

                        // Split the variable data using the '-' delimiter
                        // GETTING VARIABLE NAME
                        int dashIndex = variableData.indexOf("-");
                        String variableName = variableData.substring(0, dashIndex);
                        variableData.remove(0, dashIndex + 1);
                        // GETTING VARIABLE TYPE
                        dashIndex = variableData.indexOf("-");
                        String variableType = variableData.substring(0, dashIndex);
                        variableData.remove(0, dashIndex + 1);
                        // GETTING VARIABLE MIN VALUE
                        dashIndex = variableData.indexOf("-");
                        int variableMinValue = variableData.substring(0, dashIndex).toInt();
                        variableData.remove(0, dashIndex + 1);
                        // GETTING VARIABLE MAX VALUE
                        dashIndex = variableData.indexOf("-");
                        int variableMaxValue = variableData.substring(0, dashIndex).toInt();
                        variableData.remove(0, dashIndex + 1);
                        // GETTING VARIABLE VALUE
                        int variableValue = 0;
                        if (variableType == "b")
                        {
                            if(variableData == "false" || variableData == "0")
                            {
                                variableValue = 0;
                            }
                            else if(variableData == "true" || variableData == "1")
                            {
                                variableValue = 1;
                            }
                        }
                        else if (variableType == "n")
                        {
                            variableValue = variableData.toInt();
                        }
                        
                        

                        // Set the variables using the setVariableValue function
                        // setVariableValue(variableName, variableType.charAt(0), variableMinValue, variableMaxValue, variableValue);
                        Serial.println("processDeviceData - Parsed variable data:");
                        Serial.println("processDeviceData - Variable name: " + variableName + ", Variable type: " + variableType + ", Variable min value: " + String(variableMinValue) + ", Variable max value: " + String(variableMaxValue) + ", Variable value: " + String(variableValue));
                        // Set variable
                        setVariableValue(variableName, variableValue);

                        startIndex = endIndex + 2; // "--"
                    }
                }
                // Update SQL server using API
                // push();
                return true;
            }
        }
        else
        {
            Serial.println("processDeviceData - ERROR! - Invalid JSON format");
        }
    }
    else
    {
        Serial.println("processDeviceData - ERROR! - Deserialization error: " + String(error.c_str()));
    }
    Serial.println();
}

/**
 * @brief Prepareing Device Message for WebSocket server
 *
 * @return String - Stringified JSON
 */
String SmartHome::prepareWebSocketData()
{
    // Creating json object
    DynamicJsonDocument doc(1024);
    JsonArray array = doc.to<JsonArray>();

    String data;
    String output;

    for (auto variable : variables)
    {
        data += variable.toString() + "--";
    }

    String did = getHomeID();
    String dn = getHomeName();
    String dd = data;
    String uid = getUserID();

    String jsonOutput = "{\"did\":\"" + did + "\",\"dn\":\"" + dn + "\",\"dd\":\"" + dd + "\",\"uid\":\"" + uid + "\"}";

    array.add("deviceMessage"); // WS event name
    array.add(jsonOutput);      // WS event data
    serializeJson(doc, output);

    Serial.println("WS - Creating JSON for WebSocket: " + output);
    return output;
}