import { site } from "../..";
import { mqttSensor, updateState } from 'haah';
import { differenceInMilliseconds } from 'date-fns';
import { clamp } from '../../../util/utils';

const localSettings = {
  brightness: {
    bright: 0.8,
    dim: 0.3,
  },
}

let lastPress: Date;
let pressCount = 0;
mqttSensor('zigbee2mqtt/switch/livingroom_door_wall', (payload) => {
  if (payload.action === 'left_press') {
    if (lastPress && differenceInMilliseconds(new Date(), new Date(lastPress)) <= 350) {
      pressCount++;
    } else {
      pressCount = 0;
    }
    lastPress = new Date();

    if (pressCount === 0) {
      updateState(site, (state) => {
        state.flat.livingroom.lightOn = !state.flat.livingroom.lightOn;
      });
    } else if (pressCount == 1) {
      updateState(site, (state) => {
        state.flat.livingroom.lightOn = true;
        state.flat.livingroom.brightness = localSettings.brightness.bright;
        state.flat.livingroom.productive = true;
      });
    } else if (pressCount == 2) {
      updateState(site, (state) => {
        state.flat.livingroom.lightOn = true;
        state.flat.livingroom.brightness = localSettings.brightness.dim;
        state.flat.livingroom.productive = false;
      });
    }
  }
});

mqttSensor('zigbee2mqtt/switch/livingroom_door', (payload) => {
  if (payload.action === 'toggle') {
    updateState(site, (state) => {
      state.flat.livingroom.lightOn = !state.flat.livingroom.lightOn;
      state.flat.livingroom.brightness = localSettings.brightness.bright;
      state.flat.livingroom.productive = false;
    });
  }

  if (payload.action === 'arrow_left_click') {
    updateState(site, (state) => {
      state.flat.livingroom.lightOn = true;
      state.flat.livingroom.brightness = localSettings.brightness.bright;
      state.flat.livingroom.productive = true;
    });
  }

  if (payload.action === 'arrow_right_click') {
    updateState(site, (state) => {
      state.flat.livingroom.lightOn = true;
      state.flat.livingroom.brightness = localSettings.brightness.dim;
      state.flat.livingroom.productive = false;
    });
  }

  if (payload.action === 'brightness_up_click') {
    updateState(site, (state) => {
      state.flat.livingroom.brightness = clamp(0.1, 1.0)(state.flat.livingroom.brightness + 0.1);
    });
  }

  if (payload.action === 'brightness_down_click') {
    updateState(site, (state) => {
      state.flat.livingroom.brightness = clamp(0.1, 1.0)(state.flat.livingroom.brightness - 0.1);
    });
  }
});

mqttSensor('zigbee2mqtt/switch/livingroom_remote', (payload) => {
  if (payload.action === 'on_press') {
    updateState(site, (state) => {
      state.flat.livingroom.lightOn = true;
      state.flat.livingroom.productive = false;
      state.flat.livingroom.brightness = localSettings.brightness.bright;
    });
  }

  if (payload.action === 'on_hold') {
    updateState(site, (state) => {
      state.flat.livingroom.lightOn = true;
      state.flat.livingroom.productive = true;
      state.flat.livingroom.brightness = localSettings.brightness.bright;
    });
  }

  if (payload.action === 'down_hold') {
    updateState(site, (state) => {
      state.flat.livingroom.lightOn = true;
      state.flat.livingroom.brightness = localSettings.brightness.dim;
      state.flat.livingroom.productive = false;
    });
  }

  if (payload.action === 'up_press') {
    updateState(site, (state) => {
      state.flat.livingroom.lightOn = true;
      state.flat.livingroom.brightness = clamp(0.1, 1.0)(state.flat.livingroom.brightness + 0.1);
    });
  }

  if (payload.action === 'down_press') {
    updateState(site, (state) => {
      state.flat.livingroom.lightOn = true;
      state.flat.livingroom.brightness = clamp(0.1, 1.0)(state.flat.livingroom.brightness - 0.1);
    });
  }

  if (payload.action === 'off_press') {
    updateState(site, (state) => {
      state.flat.livingroom.lightOn = false;
    });
  }
});
