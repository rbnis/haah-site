import { mqttActuator, mqttSensor, updateState } from "haah";
import { windowState } from "../../../util/enums";
import { environment } from "../../environment";

import { livingroom } from ".";

mqttSensor('zigbee2mqtt/temperature/livingroom', (payload) => {
  if ('humidity' in payload) {
    updateState(livingroom, (state) => {
      state.humidity = payload.humidity;
    });
  }
  if ('pressure' in payload) {
    updateState(livingroom, (state) => {
      state.pressure = payload.pressure;
    });
  }
  if ('temperature' in payload) {
    updateState(livingroom, (state) => {
      state.temperature = payload.temperature
    });
  }
});

mqttSensor('zigbee2mqtt/climate/livingroom', (payload) => {
  if ('local_temperature' in payload) {
    updateState(livingroom, (state) => {
      state.temperatureThermostat = payload.local_temperature;
    });
  }
});

mqttSensor('zigbee2mqtt/contact/livingroom_balcony_door', (payload) => {
  if ('contact' in payload) {
    updateState(livingroom, (state) => {
      state.window = payload.contact ? windowState.closed : windowState.open;
    });
  }
});

mqttActuator('zigbee2mqtt/climate/livingroom/set', () => {
  if (livingroom.window === windowState.closed && environment.daytime) {
    return {
      current_heating_setpoint: livingroom.temperatureThermostat + (livingroom.temperatureTarget - livingroom.temperature),
    }
  }
  return {
    current_heating_setpoint: 5,
  }
});
