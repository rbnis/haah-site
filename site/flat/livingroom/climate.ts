import { site } from "../..";
import { mqttActuator, mqttSensor, updateState } from "haah";
import { windowState } from "../../../util/enums";

mqttSensor('zigbee2mqtt/temperature/livingroom', (payload) => {
  if ('humidity' in payload) {
    updateState(site, (state) => {
      state.flat.livingroom.climate.humidity = payload.humidity;
    });
  }
  if ('pressure' in payload) {
    updateState(site, (state) => {
      state.flat.livingroom.climate.pressure = payload.pressure;
    });
  }
  if ('temperature' in payload) {
    updateState(site, (state) => {
      state.flat.livingroom.climate.temperature = payload.temperature
    });
  }
});

mqttSensor('zigbee2mqtt/climate/livingroom', (payload) => {
  if ('local_temperature' in payload) {
    updateState(site, (state) => {
      state.flat.livingroom.climate.temperatureThermostat = payload.local_temperature;
    });
  }
});

mqttSensor('zigbee2mqtt/contact/livingroom_balcony_door', (payload) => {
  if ('contact' in payload) {
    updateState(site, (state) => {
      state.flat.livingroom.windows.balcony.state = payload.contact ? windowState.closed : windowState.open;
      state.flat.livingroom.windows.balcony.lastChange = new Date();
    });
  }
});

mqttActuator('zigbee2mqtt/climate/livingroom/set', () => {
  if (site.flat.livingroom.windows.balcony.state === windowState.closed && site.environment.daytime) {
    return {
      current_heating_setpoint: site.flat.livingroom.climate.temperatureThermostat
        + (site.flat.livingroom.climate.temperatureTarget
          - site.flat.livingroom.climate.temperature),
    }
  }
  return {
    current_heating_setpoint: 5,
  }
});
