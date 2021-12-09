import { site } from "../..";
import { mqttActuator, mqttSensor, updateState } from "haah";
import { windowState } from "../../../util/enums";

mqttSensor('zigbee2mqtt/temperature/bedroom', (payload) => {
  if ('humidity' in payload) {
    updateState(site, (state) => {
      state.flat.bedroom.climate.humidity = payload.humidity;
    });
  }
  if ('temperature' in payload) {
    updateState(site, (state) => {
      state.flat.bedroom.climate.temperature = payload.temperature
    });
  }
});

mqttSensor('zigbee2mqtt/climate/bedroom', (payload) => {
  if ('local_temperature' in payload) {
    updateState(site, (state) => {
      state.flat.bedroom.climate.temperatureThermostat = payload.local_temperature;
    });
  }
});

mqttSensor('zigbee2mqtt/contact/bedroom_window_right', (payload) => {
  if ('contact' in payload) {
    updateState(site, (state) => {
      state.flat.bedroom.windows.right.state = payload.contact ? windowState.closed : windowState.open;
      state.flat.bedroom.windows.right.lastChange = new Date();
    });
  }
});

mqttActuator('zigbee2mqtt/climate/bedroom/set', () => {
  if (site.flat.bedroom.windows.right.state === windowState.closed && site.environment.daytime) {
    return {
      occupied_heating_setpoint: site.flat.bedroom.climate.temperatureThermostat
        + (site.flat.bedroom.climate.temperatureTarget
          - site.flat.bedroom.climate.temperature),
    }
  }
  return {
    occupied_heating_setpoint: 5,
  }
});
