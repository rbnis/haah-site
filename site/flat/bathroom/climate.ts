import { mqttActuator, mqttSensor, updateState } from "haah";
import { windowState } from "../../../util/enums";
import { environment } from "../../environment";

import { bathroom } from '.';

mqttSensor('zigbee2mqtt/temperature/bathroom', (payload) => {
  if ('humidity' in payload) {
    updateState(bathroom, (state) => {
      state.humidity = payload.humidity;
    });
  }
  if ('temperature' in payload) {
    updateState(bathroom, (state) => {
      state.temperature = payload.temperature
    });
  }
});

mqttSensor('zigbee2mqtt/climate/bathroom', (payload) => {
  if ('local_temperature' in payload) {
    updateState(bathroom, (state) => {
      state.temperatureThermostat = payload.local_temperature;
    });
  }
});

mqttSensor('zigbee2mqtt/contact/bathroom_window', (payload) => {
  if ('contact' in payload) {
    updateState(bathroom, (state) => {
      state.window = payload.contact ? windowState.closed : windowState.open;
    });
  }
});

mqttActuator('zigbee2mqtt/climate/bathroom/set', () => {
  if (bathroom.window === windowState.closed && environment.daytime) {
    return {
      occupied_heating_setpoint: bathroom.temperatureThermostat + (bathroom.temperatureTarget - bathroom.temperature),
    }
  }
  return {
    occupied_heating_setpoint: 5,
  }
});
