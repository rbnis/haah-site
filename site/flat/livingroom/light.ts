import { mqttActuator, mqttSensor, updateState } from 'haah';
import { environment } from '../../environment';

import { livingroom } from ".";

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

function livingroomCeilingLight() {
  return () => {
    if (!livingroom.lightOn) {
      return { state: 'off', transition: 0.3 }
    }

    return {
      state: 'on',
      transition: 0.3,
      brightness: 190 * livingroom.brightness,
    }
  }
}

mqttActuator('zigbee2mqtt/light/livingroom_ceiling_1/set', livingroomCeilingLight());
mqttActuator('zigbee2mqtt/light/livingroom_ceiling_2/set', livingroomCeilingLight());
mqttActuator('zigbee2mqtt/light/livingroom_ceiling_3/set', livingroomCeilingLight());

mqttActuator('zigbee2mqtt/light/livingroom_desk/set', () => {
  if (!livingroom.lightOn) {
    return { state: 'off', transition: 0.3 }
  }

  return {
    state: 'on',
    transition: 0.3,
    brightness: (environment.daylight ? 180 : 130) * livingroom.brightness,
    color: livingroom.productive
      ? { r: 255, g: 226, b: 162 }
      : { r: 104, g: 0,   b: 231 },
  }
});

mqttActuator('zigbee2mqtt/light/livingroom_couch/set', () => {
  if (!livingroom.lightOn) {
    return { state: 'off', transition: 0.3 }
  }

  return {
    state: 'on',
    transition: 0.3,
    brightness: livingroom.productive
      ? (environment.daylight ? 100 : 80)
      : (environment.daylight ? 220 : 170)
      * livingroom.brightness,
    color: livingroom.productive
      ? { r: 255, g: 226, b: 162 }
      : { r: 104, g: 0,   b: 231 },
  }
});
