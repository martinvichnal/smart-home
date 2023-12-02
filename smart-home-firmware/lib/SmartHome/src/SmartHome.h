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
 */
#ifndef SmartHome_h
#define SmartHome_h

#include <Arduino.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include "config.h"
#include <vector>
#include <algorithm>

class Variable
{
public:
    Variable(int pin, String name, char type, int minValue, int maxValue, int value);

    String toString();

    int getPin();
    String getName();
    char getType();
    int getMinValue();
    int getMaxValue();
    int getValue();

    void setValue(int newValue);

private:
    int pin;
    String name;
    char type;
    int minValue;
    int maxValue;
    int value;
};

class SmartHome
{
public:
    SmartHome(String homeName, String homeID, String userID, String serverUrl);

    String getHomeID();
    String getHomeName();
    String getUserID();
    String getServerUrl();

    void addVariableNumber(int pin, String name, int minValue, int maxValue, int value);
    void addVariableBool(int pin, String name, int value);

    int getVariableValue(String name);

    void setVariableValue(String name, int value);
    void setVariableValue(String name, char type, int minValue, int maxValue, int value);

    void validateHome();

    void push();
    void push(int interval);

    void pull(int interval);

private:
    String homeName;
    String homeID;
    String userID;
    String serverUrl;

    std::vector<Variable> variables;

    unsigned long previousPushMillis = 0;
    unsigned long previousPullMillis = 0;

    void sendToServer(String data);
    String fetchDataFromServer(String parameter);
    bool processReceivedData(String data);
};

#endif