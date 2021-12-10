import { site } from "../..";
import { mqttActuator, mqttSensor, updateState } from "haah";
import { windowState } from "../../../util/enums";
import { isTimeBetween } from "../../../util/utils";

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

function heatingFactor(time: Date) {
  if (isTimeBetween(
    new Date(new Date().setHours( 5, 0, 0, 0)),
    new Date(new Date().setHours(23, 0, 0, 0)),
    time)
  ) {
    return 1.0;
  }

  return 0.85;
}

mqttActuator('zigbee2mqtt/climate/bedroom/set', () => {
  if (site.flat.bedroom.windows.right.state === windowState.closed) {
    return {
      occupied_heating_setpoint: site.flat.bedroom.climate.temperatureThermostat
        + ((site.flat.bedroom.climate.temperatureTarget * heatingFactor(site.environment.time))
          - site.flat.bedroom.climate.temperature),
    }
  }

  return {
    occupied_heating_setpoint: 5,
  }
});
