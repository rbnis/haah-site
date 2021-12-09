import { site } from "../..";
import { mqttSensor, timeSensor, updateState } from 'haah';
import { differenceInMinutes } from 'date-fns';
import { occupancyState } from '../../../util/enums';

mqttSensor('zigbee2mqtt/motion/hallway', (payload) => {
  if (payload.occupancy === true) {
    updateState(site, (state) => {
      state.flat.hallway.occupancy.state = occupancyState.occupied;
      state.flat.hallway.occupancy.lastChange = new Date();
    });
  }
});

timeSensor((time) => {
  updateState(site, (state) => {
    if (state.flat.hallway.occupancy.state === occupancyState.occupied && differenceInMinutes(new Date(time), new Date(state.flat.hallway.occupancy.lastChange)) > 3) {
      state.flat.hallway.occupancy.state = occupancyState.unoccupied;
      state.flat.hallway.occupancy.lastChange = new Date();
    }
  });
});
