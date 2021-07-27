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

    if (occupancyTimeout) {
      clearTimeout(occupancyTimeout);
    }
    occupancyTimeout = setTimeout(() => {
      updateState(kitchen, (state) => {
        state.occupied = false;
      });
    }, 1000 * 60 * 5);
});

let overwriteTimeout: NodeJS.Timeout;
mqttSensor('zigbee2mqtt/switch/kitchen_door', (payload) => {
  if (payload.action === 'on')  {
    updateState(kitchen, (state) => {
      state.overwrite = taints.lightOn;
    });

    if (overwriteTimeout) {
      clearTimeout(overwriteTimeout);
    }
    overwriteTimeout = setTimeout(() => {
      updateState(kitchen, (state) => {
        state.overwrite = taints.none;
      });
    }, 1000 * 60 * 60);
  }

  if (payload.action === 'off') {
    updateState(kitchen, (state) => {
      state.overwrite = taints.lightOff;
    });

    if (overwriteTimeout) {
      clearTimeout(overwriteTimeout);
    }
    overwriteTimeout = setTimeout(() => {
      updateState(kitchen, (state) => {
        state.overwrite = taints.none;
      });
    }, 1000 * 5);
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
