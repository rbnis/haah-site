import { site } from "../..";
import { mqttSensor, updateState } from 'haah';
import { lightState, occupancyState } from '../../../util/enums';

mqttSensor('zigbee2mqtt/switch/hallway_door_1', (payload) => {
  if (payload.action === 'left_press') {
    updateState(site, (state) => {
      if (state.flat.hallway.lights.ceiling.state === lightState.lightOn) {
        state.flat.hallway.lights.ceiling.state = lightState.lightOff;
        state.flat.hallway.lights.ceiling.lastChange = new Date();
      } else if (state.flat.hallway.lights.ceiling.state === lightState.lightOff) {
        state.flat.hallway.lights.ceiling.state = lightState.lightOn;
        state.flat.hallway.lights.ceiling.lastChange = new Date();
      } else if (state.flat.hallway.occupancy.state === occupancyState.occupied && !state.environment.daylight) {
        state.flat.hallway.lights.ceiling.state = lightState.lightOff;
        state.flat.hallway.lights.ceiling.lastChange = new Date();
      } else {
        state.flat.hallway.lights.ceiling.state = lightState.lightOff;
        state.flat.hallway.lights.ceiling.lastChange = new Date();
      }
    });
  }
});
mqttSensor('zigbee2mqtt/switch/hallway_door_2', (payload) => {
  if (payload.action === 'left_press') {
    updateState(site, (state) => {
      if (state.flat.hallway.lights.ceiling.state === lightState.lightOn) {
        state.flat.hallway.lights.ceiling.state = lightState.lightOff;
        state.flat.hallway.lights.ceiling.lastChange = new Date();
      } else if (state.flat.hallway.lights.ceiling.state === lightState.lightOff) {
        state.flat.hallway.lights.ceiling.state = lightState.lightOn;
        state.flat.hallway.lights.ceiling.lastChange = new Date();
      } else if (state.flat.hallway.occupancy.state === occupancyState.occupied && !state.environment.daylight) {
        state.flat.hallway.lights.ceiling.state = lightState.lightOff;
        state.flat.hallway.lights.ceiling.lastChange = new Date();
      } else {
        state.flat.hallway.lights.ceiling.state = lightState.lightOff;
        state.flat.hallway.lights.ceiling.lastChange = new Date();
      }
    });
  }
});

/*
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
*/
