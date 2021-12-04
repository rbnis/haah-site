import { mqttSensor, updateState } from 'haah';
import { clamp } from '../../../util/helper';

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
      state.brightness = 0.8;
      state.productive = false;
    });
  }

  if (payload.action === 'arrow_left_click') {
    updateState(livingroom, (state) => {
      state.lightOn = true;
      state.brightness = 0.8;
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
      state.brightness = clamp(0.1, 1.0)(state.brightness + 0.1);
    });
  }

  if (payload.action === 'brightness_down_click') {
    updateState(livingroom, (state) => {
      state.brightness = clamp(0.1, 1.0)(state.brightness - 0.1);
    });
  }
});

mqttSensor('zigbee2mqtt/switch/livingroom_remote', (payload) => {
  if (payload.action === 'on_press') {
    updateState(livingroom, (state) => {
      state.lightOn = true;
      state.productive = false;
      state.brightness = 0.8;
    });
  }

  if (payload.action === 'on_hold') {
    updateState(livingroom, (state) => {
      state.lightOn = true;
      state.productive = true;
      state.brightness = 0.8;
    });
  }

  if (payload.action === 'down_hold') {
    updateState(livingroom, (state) => {
      state.lightOn = true;
      state.brightness = 0.3;
      state.productive = false;
    });
  }

  if (payload.action === 'up_press') {
    updateState(livingroom, (state) => {
      state.lightOn = true;
      state.brightness = clamp(0.1, 1.0)(state.brightness + 0.1);
    });
  }

  if (payload.action === 'down_press') {
    updateState(livingroom, (state) => {
      state.lightOn = true;
      state.brightness = clamp(0.1, 1.0)(state.brightness - 0.1);
    });
  }

  if (payload.action === 'off_press') {
    updateState(livingroom, (state) => {
      state.lightOn = false;
    });
  }
});
