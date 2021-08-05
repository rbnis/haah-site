import { mqttSensor, updateState } from 'haah';
import { taints } from '../../../util/enums';

import { kitchen } from ".";

let overwriteTimeout: NodeJS.Timeout;
mqttSensor('zigbee2mqtt/switch/kitchen_door_wall', (payload) => {
  if (payload.action === 'left_press') {
    var overwriteTime = taints.none;
    updateState(kitchen, (state) => {
      overwriteTime = state.overwrite === taints.lightOn ? 5: 60 * 60;
      state.occupied = state.overwrite === taints.lightOn ? false : state.occupied;
      state.overwrite = state.overwrite === taints.lightOn || state.occupied ? taints.lightOff : taints.lightOn;
    });

    if (overwriteTimeout) clearTimeout(overwriteTimeout);
    overwriteTimeout = setTimeout(() => {
      updateState(kitchen, (state) => {
        state.overwrite = taints.none;
      });
    }, 1000 * overwriteTime);
  }
});
