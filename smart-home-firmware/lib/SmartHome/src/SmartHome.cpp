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
Variable::Variable(int pin, const String name, char type, int minValue, int maxValue, int value)
    : pin(pin), name(name), type(type), minValue(minValue), maxValue(maxValue), value(value) {}

/**
 * @brief Stringify the variable to send to the database
 * @return String
 */
String Variable::toString() const
{
    return name + "-" + type + "-" + String(minValue) + "-" + String(maxValue) + "-" + String(value);
}

/**
 * @brief Getting variable pin number
 * @return int
 */
int Variable::getPin() const
{
    return pin;
}

/**
 * @brief Getting variable name
 * @return String
 */
String Variable::getName() const
{
    return name;
}

/**
 * @brief Getting variable type
 * @return char
 */
char Variable::getType() const
{
    return type;
}

/**
 * @brief Getting variable minimum value
 * @return int
 */
int Variable::getMinValue() const
{
    return minValue;
}

/**
 * @brief Getting variable maximum value
 * @return int
 */
int Variable::getMaxValue() const
{
    return maxValue;
}

/**
 * @brief Getting variable value
 * @return int
 */
int Variable::getValue() const
{
    return value;
}

/**
 * @brief Setting variable value
 * @todo Add validation for other types
 * @param newValue
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
 * @param homeName
 * @param homeID
 * @param userID
 * @param serverUrl
 */
SmartHome::SmartHome(const String homeName, const String homeID, const String userID, const String serverUrl)
    : homeName(homeName), homeID(homeID), userID(userID), serverUrl(serverUrl) {}

/**
 * @brief Getting home ID
 * @return String
 */
String SmartHome::getHomeID() const
{
    return homeID;
}

/**
 * @brief Getting home name
 * @return String
 */
String SmartHome::getHomeName() const
{
    return homeName;
}

/**
 * @brief Getting the home's owner userID
 * @return String
 */
String SmartHome::getUserID() const
{
    return userID;
}

/**
 * @brief Getting serverUrl where the API is fetched from
 * @return String
 */
String SmartHome::getServerUrl() const
{
    return serverUrl;
}

/**
 * @brief Adding new NUMBER variable to the SmartHome class
 * @param pin
 * @param name
 * @param minValue
 * @param maxValue
 * @param value
 */
void SmartHome::addVariableNumber(int pin, const String name, int minValue, int maxValue, int value)
{
    variables.push_back(Variable(pin, name, 'n', minValue, maxValue, value));
}

/**
 * @brief Adding new BOOLEAN variable to the SmartHome class
 * @param pin
 * @param name
 * @param value
 */
void SmartHome::addVariableBool(int pin, const String name, int value)
{
    variables.push_back(Variable(pin, name, 'b', 0, 0, value));
}

/**
 * @brief Get the variable vale by name
 * @param name
 * @return int
 */
int SmartHome::getVariableValue(const String variableName)
{
    auto variableIt = std::find_if(
        variables.begin(), variables.end(), [variableName](const Variable variable)
        { return variable.getName() == variableName; });

    if (variableIt != variables.end())
    {
        // Return the value of the found variable
        return variableIt->getValue();
    }
    else
    {
        Serial.println("ERROR! - Variable not found: " + variableName);
        return -1; // Or another value indicating an error
    }
}

/**
 * @brief Setting variable value by name
 * @param name
 * @param value
 */
void SmartHome::setVariableValue(const String name, int value)
{
    auto variableIt = std::find_if(
        variables.begin(), variables.end(),
        [name](const Variable variable)
        { return variable.getName() == name; });

    if (variableIt != variables.end())
    {
        // Update the value of the found variable
        variableIt->setValue(value);
    }
    else
    {
        Serial.println("ERROR! - Variable not found: " + name);
    }
}

/**
 * @brief Setting variable value by name
 *
 * @param variableName
 * @param variableType
 * @param variableMinValue
 * @param variableMaxValue
 * @param variableValue
 */
void SmartHome::setVariableValue(const String name, char type, int minValue, int maxValue, int value)
{
    auto variableIt = std::find_if(
        variables.begin(), variables.end(),
        [name](const Variable variable)
        { return variable.getName() == name; });

    if (variableIt != variables.end())
    {
        // Update the value of the found variable
        variableIt->setValue(value);
    }
    else
    {
        Serial.println("ERROR! - Variable not found: " + name);
    }
}

/**
 * @brief Validating home. Checks if the device is already in the database. If not it creates a new device in the database
 * @todo Improve efficiency
 */
void SmartHome::validateHome()
{
    if (processReceivedData(fetchDataFromServer(getHomeID())) == false)
    {
        Serial.println("VALIDATE - Device not found in database... Creating new device in database");

        String data;
        for (const auto variable : variables)
        {
            data += variable.toString() + "--";
        }

        HTTPClient http;
        http.begin(serverUrl);
        http.addHeader("Content-Type", "application/json");

        String did = getHomeID();
        String dn = getHomeName();
        String dd = data;
        String uid = getUserID();

        String jsonOutput = "{\"did\":\"" + did + "\",\"dn\":\"" + dn + "\",\"dd\":\"" + dd + "\",\"uid\":\"" + uid + "\"}";
        Serial.println("VALIDATE - Custom JSON output: " + jsonOutput);

        int httpResponseCode = http.POST(String(jsonOutput));
        if (httpResponseCode > 0)
        {
            Serial.printf("VALIDATE - HTTP POST success, response code: %d\n", httpResponseCode);
        }
        else
        {
            Serial.printf("ERROR! VALIDATE - HTTP POST failed, response code: %d\n", httpResponseCode);
        }

        http.end();
        Serial.println();
    }
    else
    {
        Serial.println("VALIDATE - Device found in database... Proceedeing startup and fetching data from server");
    }

    processReceivedData(fetchDataFromServer(getHomeID()));
}

/**
 * @brief Pushing data to the server
 */
void SmartHome::push()
{
    String data;
    for (const auto variable : variables)
    {
        data += variable.toString() + "--";
    }
    Serial.println("PUSH - Sending data to server: " + data);
    Serial.println();
    sendToServer(data);
}

/**
 * @brief Pushing data to the server
 * @param interval in ms
 */
void SmartHome::push(int interval)
{
    if (millis() - previousPushMillis >= interval)
    {
        String data;
        for (const auto variable : variables)
        {
            data += variable.toString() + "--";
        }
        Serial.println();
        Serial.print("Sending data to server: ");
        Serial.println(data);
        Serial.println();
        sendToServer(data);

        previousPushMillis = millis();
    }
}

/**
 * @brief Pulling data from the server within a specific interval (in milliseconds)
 * @param interval in ms
 */
void SmartHome::pull(int interval)
{
    if (millis() - previousPullMillis >= interval)
    {
        processReceivedData(fetchDataFromServer(getHomeID()));
        previousPullMillis = millis();
    }
}

/**
 * @brief Sending data to the server with HTTP API POST request (not implemented yet)
 * @todo Implement HTTP POST request
 * @param data - device data
 */
void SmartHome::sendToServer(const String data)
{
    Serial.println("SEND - Sending data to server");

    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    String did = getHomeID();
    String dn = getHomeName();
    String dd = data;
    String uid = getUserID();

    String jsonOutput = "{\"did\":\"" + did + "\",\"dn\":\"" + dn + "\",\"dd\":\"" + dd + "\",\"uid\":\"" + uid + "\"}";
    Serial.println("SEND - Custom JSON output: " + jsonOutput);

    int httpResponseCode = http.PUT(String(jsonOutput));
    if (httpResponseCode > 0)
    {
        Serial.printf("SEND - HTTP PUT success, response code: %d\n", httpResponseCode);
    }
    else
    {
        Serial.printf("ERROR! SEND - HTTP PUT failed, response code: %d\n", httpResponseCode);
    }

    http.end();
    Serial.println();
}

/**
 * @brief Fetching data from the server with HTTP API GET request
 * @todo Implement HTTP GET request
 * @return String - received data from the server
 * @param parameter - device ID
 */
String SmartHome::fetchDataFromServer(const String parameter)
{
    Serial.println("FETCH - Fetching data from server");

    HTTPClient http;
    http.begin(serverUrl + "?did=" + parameter);
    Serial.println("Requesting on: " + serverUrl + "?did=" + parameter);

    int httpResponseCode = http.GET();
    if (httpResponseCode == HTTP_CODE_OK)
    {
        String response = http.getString();
        Serial.printf("FETCH - HTTP GET success, response: %s\n", response.c_str());
        return response;
    }
    else
    {
        Serial.printf("ERROR! FETCH - HTTP GET failed, response code: %d\n", httpResponseCode);
        return "";
    }

    http.end();
    Serial.println();
}

/**
 * @brief Processing received data from the server (not implemented yet)
 * @todo Process device data into their corresponding variables
 * @param data
 * @return true - if data is processed or has something in it.
 * @return false - if data is empty
 */
bool SmartHome::processReceivedData(const String data)
{
    Serial.println();
    DynamicJsonDocument jsonData(2048);
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
                for (const auto device : devices)
                {
                    String deviceId = device["DID"].as<String>();
                    String deviceName = device["DN"].as<String>();
                    String deviceData = device["DD"].as<String>();
                    String userId = device["UID"].as<String>();

                    Serial.println("Parsed data from server:");
                    Serial.println("Device ID: " + deviceId);
                    Serial.println("Device name: " + deviceName);
                    Serial.println("Device data: " + deviceData);
                    Serial.println("User ID: " + userId);

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
                        int dashIndex = variableData.indexOf("-");
                        String variableName = variableData.substring(0, dashIndex);
                        variableData.remove(0, dashIndex + 1);

                        dashIndex = variableData.indexOf("-");
                        String variableType = variableData.substring(0, dashIndex);
                        variableData.remove(0, dashIndex + 1);

                        // Check for variable type. The two (number and boolean) variables are different in data structure
                        int variableMinValue = 0;
                        int variableMaxValue = 0;
                        if (variableType.charAt(0) == 'n')
                        {
                            dashIndex = variableData.indexOf("-");
                            variableMinValue = variableData.substring(0, dashIndex).toInt();
                            variableData.remove(0, dashIndex + 1);

                            dashIndex = variableData.indexOf("-");
                            variableMaxValue = variableData.substring(0, dashIndex).toInt();
                            variableData.remove(0, dashIndex + 1);
                        }

                        int variableValue = variableData.toInt();

                        // Set the variables using the setVariableValue function
                        setVariableValue(variableName, variableType.charAt(0), variableMinValue, variableMaxValue, variableValue);

                        Serial.println();
                        Serial.println("Parsed variable data:");
                        Serial.println("Variable name: " + variableName + ", Variable type: " + variableType + ", Variable min value: " + String(variableMinValue) + ", Variable max value: " + String(variableMaxValue) + ", Variable value: " + String(variableValue));

                        // "--"
                        startIndex = endIndex + 2;
                    }
                }
                return true;
            }
        }
        else
        {
            Serial.println("ERROR! - Invalid JSON format");
        }
    }
    else
    {
        Serial.println("ERROR! - Deserialization error: " + String(error.c_str()));
    }
    Serial.println();
}