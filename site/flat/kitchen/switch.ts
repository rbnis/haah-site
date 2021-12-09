import { site } from "../..";
import { mqttSensor, updateState } from 'haah';
import { lightState, occupancyState } from '../../../util/enums';

mqttSensor('zigbee2mqtt/switch/kitchen_door_wall', (payload) => {
  if (payload.action === 'left_press') {
    updateState(site, (state) => {
      if (state.flat.kitchen.lights.ceiling.state === lightState.lightOn) {
        state.flat.kitchen.lights.ceiling.state = lightState.lightOff;
        state.flat.kitchen.lights.ceiling.lastChange = new Date();
      } else if (state.flat.kitchen.lights.ceiling.state === lightState.lightOff) {
        state.flat.kitchen.lights.ceiling.state = lightState.lightOn;
        state.flat.kitchen.lights.ceiling.lastChange = new Date();
      } else if (state.flat.kitchen.occupancy.state === occupancyState.occupied && !state.environment.daylight) {
        state.flat.kitchen.lights.ceiling.state = lightState.lightOff;
        state.flat.kitchen.lights.ceiling.lastChange = new Date();
      } else {
        state.flat.kitchen.lights.ceiling.state = lightState.lightOn;
        state.flat.kitchen.lights.ceiling.lastChange = new Date();
      }
    });
  }
});
