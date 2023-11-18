#include "SmartHome.h"
SmartHome::SmartHome(byte pin) {
  this->pin = pin;
  init();
}
void SmartHome::init() {
  pinMode(pin, OUTPUT);
  off();
}
void SmartHome::on() {
  digitalWrite(pin, HIGH);
}
void SmartHome::off() {
  digitalWrite(pin, LOW);
}