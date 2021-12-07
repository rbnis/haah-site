import { mqttActuator, mqttSensor, updateState } from "haah";
import { windowState } from "../../../util/enums";
import { environment } from "../../environment";

import { bedroom } from ".";

mqttSensor('zigbee2mqtt/temperature/bedroom', (payload) => {
  if ('humidity' in payload) {
    updateState(bedroom, (state) => {
      state.humidity = payload.humidity;
    });
  }
  if ('temperature' in payload) {
    updateState(bedroom, (state) => {
      state.temperature = payload.temperature
    });
  }
});

mqttSensor('zigbee2mqtt/climate/bedroom', (payload) => {
  if ('local_temperature' in payload) {
    updateState(bedroom, (state) => {
      state.temperatureThermostat = payload.local_temperature;
    });
  }
});

mqttSensor('zigbee2mqtt/contact/bedroom_window_right', (payload) => {
  if ('contact' in payload) {
    updateState(bedroom, (state) => {
      state.window = payload.contact ? windowState.closed : windowState.open;
    });
  }
});

mqttActuator('zigbee2mqtt/climate/bedroom/set', () => {
  if (bedroom.window === windowState.closed && environment.daytime) {
    return {
      current_heating_setpoint: bedroom.temperatureThermostat + (bedroom.temperatureTarget - bedroom.temperature),
    }
  }
  return {
    current_heating_setpoint: 5,
  }
});
