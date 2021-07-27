import { mqttActuator, mqttSensor, updateState } from 'haah';

import { taints } from '../../../util/enums';
import { hallway } from ".";
import { environment } from '../../environment';

let occupancyTimeout: NodeJS.Timeout;
mqttSensor('zigbee2mqtt/motion/hallway', (payload) => {
  if (payload.occupancy === true) {
    updateState(hallway, (state) => {
      state.occupied = true;
      });
    }

    if (occupancyTimeout) {
      clearTimeout(occupancyTimeout);
    }
    occupancyTimeout = setTimeout(() => {
      updateState(hallway, (state) => {
        state.occupied = false;
      });
    }, 1000 * 60 * 3);
});

function hallwayLight() {
  return () => {
    if (hallway.overwrite === taints.lightOff) {
      return { state: 'off', transition: 0.3 }
    }

    if (hallway.overwrite === taints.lightOn) {
      return {
        state: 'on',
        transition: 0.3,
        brightness: 255 * (environment.daytime ? 0.75 : 0.1),
      }
    }

    if (!hallway.occupied) {
      return { state: 'off', transition: 15 }
    }

    if (environment.daylight) {
      return { state: 'off', transition: 15 }
    }

    return {
      state: 'on',
      transition: 0.3,
      brightness: 255 * (environment.daytime ? 0.75 : 0.1),
    }
  }
}

mqttActuator('zigbee2mqtt/light/hallway_ceiling_1/set', hallwayLight());
mqttActuator('zigbee2mqtt/light/hallway_ceiling_2/set', hallwayLight());
mqttActuator('zigbee2mqtt/light/hallway_ceiling_3/set', hallwayLight());
