import { mqttSensor, updateState } from 'haah';
import { switchToggleMotionOverwrite } from '../../../util/motion';
import { taints } from '../../../util/enums'

import { hallway } from ".";
import { kitchen } from "../kitchen";
import { livingroom } from "../livingroom";
import { bedroom } from "../bedroom";

let overwriteTimeout: NodeJS.Timeout;
mqttSensor('zigbee2mqtt/switch/hallway_door_1', (payload) => {
  if (payload.action === 'left_press') {
    switchToggleMotionOverwrite(hallway, overwriteTimeout, 5, 60 * 30);
  }
});
mqttSensor('zigbee2mqtt/switch/hallway_door_2', (payload) => {
  if (payload.action === 'left_press') {
    switchToggleMotionOverwrite(hallway, overwriteTimeout, 5, 60 * 30);
  }
});

let overwriteTimeoutKitchen: NodeJS.Timeout;
mqttSensor('zigbee2mqtt/switch/hallway_entry', (payload) => {
  if (payload.action === 'on') {
    updateState(hallway, (state) => {
      state.overwrites.ceiling = taints.lightOn;
    });

    if (overwriteTimeout) {
      clearTimeout(overwriteTimeout);
    }
    overwriteTimeout = setTimeout(() => {
      updateState(hallway, (state) => {
        state.overwrites.ceiling = taints.none;
      });
    }, 1000 * 60 * 30);
  }

  if (payload.action === 'off') {
    updateState(bedroom, (state) => {
      state.lightOn = false;
    });
    updateState(livingroom, (state) => {
      state.lightOn = false;
    });
    updateState(hallway, (state) => {
      state.overwrites.ceiling = taints.lightOff;
    });
    updateState(kitchen, (state) => {
      state.overwrites.ceiling = taints.lightOff;
    });

    if (overwriteTimeout) clearTimeout(overwriteTimeout);
    if (overwriteTimeoutKitchen) clearTimeout(overwriteTimeoutKitchen);
    overwriteTimeout = setTimeout(() => {
      updateState(hallway, (state) => {
        state.overwrites.ceiling = taints.none;
      });
    }, 1000 * 60 * 5);
    overwriteTimeoutKitchen = setTimeout(() => {
      updateState(kitchen, (state) => {
        state.overwrites.ceiling = taints.none;
      });
    }, 1000 * 60 * 5);
  }
});
