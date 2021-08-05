import { mqttSensor, updateState } from 'haah';

import { kitchen } from ".";

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
