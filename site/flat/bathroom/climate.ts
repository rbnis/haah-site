import { site } from "../..";
import { mqttActuator, mqttSensor, updateState } from "haah";
import { windowState } from "../../../util/enums";

mqttSensor('zigbee2mqtt/temperature/bathroom', (payload) => {
  if ('humidity' in payload) {
    updateState(site, (state) => {
      state.flat.bathroom.climate.humidity = payload.humidity;
    });
  }
  if ('temperature' in payload) {
    updateState(site, (state) => {
      state.flat.bathroom.climate.temperature = payload.temperature
    });
  }
});

mqttSensor('zigbee2mqtt/climate/bathroom', (payload) => {
  if ('local_temperature' in payload) {
    updateState(site, (state) => {
      state.flat.bathroom.climate.temperatureThermostat = payload.local_temperature;
    });
  }
});

mqttSensor('zigbee2mqtt/contact/bathroom_window', (payload) => {
  if ('contact' in payload) {
    updateState(site, (state) => {
      state.flat.bathroom.windows.window.state = payload.contact ? windowState.closed : windowState.open;
      state.flat.bathroom.windows.window.lastChange = new Date();
    });
  }
});

mqttActuator('zigbee2mqtt/climate/bathroom/set', () => {
  if (site.flat.bathroom.windows.window.state === windowState.closed && site.environment.daytime) {
    return {
      occupied_heating_setpoint: site.flat.bathroom.climate.temperatureThermostat
        + (site.flat.bathroom.climate.temperatureTarget
          - site.flat.bathroom.climate.temperature),
    }
  }
  return {
    occupied_heating_setpoint: 5,
  }
});
