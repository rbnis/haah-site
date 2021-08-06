import { mqttSensor, updateState } from 'haah';
import { taints } from '../../../util/enums';

import { kitchen } from ".";

let overwriteTimeout: NodeJS.Timeout;
mqttSensor('zigbee2mqtt/switch/kitchen_door_wall', (payload) => {
  if (payload.action === 'left_press') {
    var overwriteTime = taints.none;
    updateState(kitchen, (state) => {
      overwriteTime = state.overwrites.ceiling === taints.lightOn ? 5: 60 * 60;
      state.occupied = state.overwrites.ceiling === taints.lightOn ? false : state.occupied;
      state.overwrites.ceiling = state.overwrites.ceiling === taints.lightOn
        || (state.occupied && state.overwrites.ceiling === taints.none)
          ? taints.lightOff
          : taints.lightOn;
    });

    if (overwriteTimeout) clearTimeout(overwriteTimeout);
    overwriteTimeout = setTimeout(() => {
      updateState(kitchen, (state) => {
        state.overwrites.ceiling = taints.none;
      });
    }, 1000 * overwriteTime);
  }
});
