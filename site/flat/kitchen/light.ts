import { mqttActuator, mqttSensor, updateState } from 'haah';

import { taints } from '../../../util/enums';
import { kitchen } from ".";
import { environment } from '../../environment';

let occupancyTimeout: NodeJS.Timeout;
mqttSensor('zigbee2mqtt/motion/kitchen', (payload) => {
  if (payload.occupancy === true) {
    updateState(kitchen, (state) => {
      state.occupied = true;
      });
    }

    if (occupancyTimeout) clearTimeout(occupancyTimeout);
    occupancyTimeout = setTimeout(() => {
      updateState(kitchen, (state) => {
        state.occupied = false;
      });
    }, 1000 * 60 * 5);
});

let overwriteTimeout: NodeJS.Timeout;
mqttSensor('zigbee2mqtt/switch/kitchen_door_wall', (payload) => {
  if (payload.action === 'left_press') {
    var overwriteTime = taints.none;
    updateState(kitchen, (state) => {
      overwriteTime = state.overwrite === taints.lightOn ? 5: 60 * 60;
      state.overwrite = state.overwrite === taints.lightOn ? taints.lightOff : taints.lightOn;
    });

    if (overwriteTimeout) clearTimeout(overwriteTimeout);
    overwriteTimeout = setTimeout(() => {
      updateState(kitchen, (state) => {
        state.overwrite = taints.none;
      });
    }, 1000 * overwriteTime);
  }
});

mqttActuator('zigbee2mqtt/light/kitchen_ceiling/set', () => {
  if (kitchen.overwrite === taints.lightOff) {
    return { state: 'off', transition: 0.3 }
  }

  if (kitchen.overwrite === taints.lightOn) {
    return {
      state: 'on',
      transition: 0.3,
      brightness: 255 * 0.75,
    }
  }

  if (!kitchen.occupied) {
    return { state: 'off', transition: 15 }
  }

  if (environment.daylight) {
    return { state: 'off', transition: 15 }
  }

  return {
    state: 'on',
    transition: 0.3,
    brightness: 255 * (environment.daytime ? 0.75 : 0.33),
  }
});
