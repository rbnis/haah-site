import { mqttSensor, updateState } from 'haah';

import { hallway } from ".";

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
