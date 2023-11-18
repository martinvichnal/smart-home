#ifndef SMARTHOME_H
#define SMARTHOME_H
#include <Arduino.h>
class SmartHome {
  
  private:
    byte pin;
    
  public:
    // Setup pin LED and call init()
    SmartHome(byte pin);
    // Setup the pin led as OUTPUT
    // and power off the LED - default state
    void init();
    
    // Power on the LED
    void on();
    // Power off the LED
    void off();
};
#endif