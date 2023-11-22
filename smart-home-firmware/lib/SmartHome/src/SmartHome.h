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
#include <Arduino_JSON.h> 
#include "config.h"
#include <vector>
#include <algorithm>

class Variable {
public:
    Variable(int pin, const String& name, char type, int minValue, int maxValue, int value);

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

class SmartHome {
public:
    SmartHome(const String& homeName, const String& homeID);

    String getHomeID() const;
    String getHomeName() const;

    void addVariableNumber(int pin, const String& name, int minValue, int maxValue, int value);
    void addVariableBool(int pin, const String& name, int value);

    void setVariableValue(const String& name, int value);
    void setVariableValue(const String& variableName, char variableType, int variableMinValue, int variableMaxValue, int variableValue);

    void push();
    void update(int interval);

private:
    String homeName;
    String homeID;
    std::vector<Variable> variables;
    unsigned long previousMillis = 0;

    void sendToServer(const String& data);
    String fetchDataFromServer();
    void processReceivedData(const String& data);

};

#endif