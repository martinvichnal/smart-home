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
    Variable(int pin, const String &name, char type, int minValue, int maxValue, int value);

    String toString() const;

    int getPin() const;
    String getName() const;
    char getType() const;
    int getMinValue() const;
    int getMaxValue() const;
    int getValue() const;

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
    SmartHome(const String &homeName, const String &homeID, const String &userID, const String &serverUrl);

    String getHomeID() const;
    String getHomeName() const;
    String getUserID() const;
    String getServerUrl() const;

    void addVariableNumber(int pin, const String &name, int minValue, int maxValue, int value);
    void addVariableBool(int pin, const String &name, int value);

    int getVariableValue(const String &name);

    void setVariableValue(const String &name, int value);
    void setVariableValue(const String &name, char type, int minValue, int maxValue, int value);

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

    void sendToServer(const String &data);
    String fetchDataFromServer(const String &parameter);
    bool processReceivedData(const String &data);
};

#endif