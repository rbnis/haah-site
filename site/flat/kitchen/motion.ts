import { site } from "../..";
import { mqttSensor, timeSensor, updateState } from 'haah';
import { differenceInMinutes } from 'date-fns';
import { occupancyState } from '../../../util/enums';

mqttSensor('zigbee2mqtt/motion/kitchen', (payload) => {
  if (payload.occupancy === true) {
    updateState(site, (state) => {
      state.flat.kitchen.occupancy.state = occupancyState.occupied;
      state.flat.kitchen.occupancy.lastChange = new Date();
    });
  }
});

timeSensor((time) => {
  updateState(site, (state) => {
    if (state.flat.kitchen.occupancy.state === occupancyState.occupied && differenceInMinutes(new Date(time), new Date(state.flat.kitchen.occupancy.lastChange)) > 3) {
      state.flat.kitchen.occupancy.state = occupancyState.unoccupied;
      state.flat.kitchen.occupancy.lastChange = new Date();
    }
  });
});
