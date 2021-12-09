import { site } from "../..";
import { mqttSensor, updateState } from 'haah';
import { lightState, occupancyState } from '../../../util/enums';

mqttSensor('zigbee2mqtt/switch/hallway_door_1', (payload) => {
  if (payload.action === 'left_press') {
    updateState(site, (state) => {
      if (state.flat.hallway.lights.ceiling.state === lightState.on) {
        state.flat.hallway.lights.ceiling.state = lightState.off;
        state.flat.hallway.lights.ceiling.lastChange = new Date();
      } else if (state.flat.hallway.lights.ceiling.state === lightState.off) {
        state.flat.hallway.lights.ceiling.state = lightState.on;
        state.flat.hallway.lights.ceiling.lastChange = new Date();
      } else if (state.flat.hallway.occupancy.state === occupancyState.occupied && !state.environment.daylight) {
        state.flat.hallway.lights.ceiling.state = lightState.off;
        state.flat.hallway.lights.ceiling.lastChange = new Date();
      } else {
        state.flat.hallway.lights.ceiling.state = lightState.on;
        state.flat.hallway.lights.ceiling.lastChange = new Date();
      }
    });
  }
});
mqttSensor('zigbee2mqtt/switch/hallway_door_2', (payload) => {
  if (payload.action === 'left_press') {
    updateState(site, (state) => {
      if (state.flat.hallway.lights.ceiling.state === lightState.on) {
        state.flat.hallway.lights.ceiling.state = lightState.off;
        state.flat.hallway.lights.ceiling.lastChange = new Date();
      } else if (state.flat.hallway.lights.ceiling.state === lightState.off) {
        state.flat.hallway.lights.ceiling.state = lightState.on;
        state.flat.hallway.lights.ceiling.lastChange = new Date();
      } else if (state.flat.hallway.occupancy.state === occupancyState.occupied && !state.environment.daylight) {
        state.flat.hallway.lights.ceiling.state = lightState.off;
        state.flat.hallway.lights.ceiling.lastChange = new Date();
      } else {
        state.flat.hallway.lights.ceiling.state = lightState.on;
        state.flat.hallway.lights.ceiling.lastChange = new Date();
      }
    });
  }
});

mqttSensor('zigbee2mqtt/switch/hallway_entry', (payload) => {
  if (payload.action === 'on') {
    updateState(site, (state) => {
      state.flat.hallway.lights.ceiling.state = lightState.on;
      state.flat.hallway.lights.ceiling.lastChange = new Date();
    });
  }

  if (payload.action === 'off') {
    updateState(site, (state) => {
      state.flat.bedroom.lightOn = false;
      state.flat.hallway.lights.ceiling.state = lightState.off;
      state.flat.hallway.lights.ceiling.lastChange = new Date();
      state.flat.kitchen.lights.ceiling.state = lightState.off;
      state.flat.kitchen.lights.ceiling.lastChange = new Date();
      state.flat.livingroom.lightOn = false;
  })}
});

