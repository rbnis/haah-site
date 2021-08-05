import { mqttSensor, updateState } from 'haah';

import { livingroom } from ".";

mqttSensor('zigbee2mqtt/switch/livingroom_door_wall', (payload) => {
  if (payload.action === 'left_press') {
    updateState(livingroom, (state) => {
      state.lightOn = !state.lightOn;
    });
  }
});

mqttSensor('zigbee2mqtt/switch/livingroom_door', (payload) => {
  if (payload.action === 'toggle') {
    updateState(livingroom, (state) => {
      state.lightOn = !state.lightOn;
      state.brightness = 1.0;
      state.productive = false;
    });
  }

  if (payload.action === 'arrow_left_click') {
    updateState(livingroom, (state) => {
      state.lightOn = true;
      state.brightness = 1.0;
      state.productive = true;
    });
  }

  if (payload.action === 'arrow_right_click') {
    updateState(livingroom, (state) => {
      state.lightOn = true;
      state.brightness = 0.5;
      state.productive = false;
    });
  }

  if (payload.action === 'brightness_up_click') {
    updateState(livingroom, (state) => {
      state.brightness = state.brightness >= 1.0 ? 1.0 : state.brightness+0.1;
    });
  }

  if (payload.action === 'brightness_down_click') {
    updateState(livingroom, (state) => {
      state.brightness = state.brightness <= 0.1 ? 0.1 : state.brightness-0.1;
    });
  }
});

mqttSensor('zigbee2mqtt/switch/livingroom_remote', (payload) => {
  if (payload.action === 'on_press') {
    updateState(livingroom, (state) => {
      state.lightOn = true;
      state.brightness = 1.0;
      state.productive = false;
    });
  }

  if (payload.action === 'up_press') {
    updateState(livingroom, (state) => {
      state.lightOn = true;
      state.brightness = 1.0;
      state.productive = true;
    });
  }

  if (payload.action === 'down_press') {
    updateState(livingroom, (state) => {
      state.lightOn = true;
      state.brightness = 0.5;
      state.productive = false;
    });
  }

  if (payload.action === 'off_press') {
    updateState(livingroom, (state) => {
      state.lightOn = false;
    });
  }
});
