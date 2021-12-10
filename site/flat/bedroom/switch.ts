import { site } from "../..";
import { mqttSensor, updateState } from 'haah';
import { differenceInMilliseconds } from 'date-fns';
import { lightState } from '../../../util/enums';
import { clamp } from '../../../util/utils';

let lastPress: Date;
let pressCount = 0;
mqttSensor('zigbee2mqtt/switch/bedroom_door_wall', (payload) => {
  if (payload.action === 'left_press') {
    if (lastPress && differenceInMilliseconds(new Date(), new Date(lastPress)) <= 350) {
      pressCount++;
    } else {
      pressCount = 0;
    }
    lastPress = new Date();

    if (pressCount === 0) {
      updateState(site, (state) => {
        if (state.flat.bedroom.lightOn && state.flat.bedroom.lights.ceiling.state === lightState.on) {
          state.flat.bedroom.lights.ceiling.state = lightState.inherit;
          state.flat.bedroom.lights.ceiling.lastChange = new Date();
        }
        if (!state.flat.bedroom.lightOn && state.flat.bedroom.lights.ceiling.state === lightState.off) {
          state.flat.bedroom.lights.ceiling.state = lightState.inherit;
          state.flat.bedroom.lights.ceiling.lastChange = new Date();
        }

        if (state.flat.bedroom.lightOn && state.flat.bedroom.lights.readingLeft.state === lightState.on) {
          state.flat.bedroom.lights.readingLeft.state = lightState.inherit;
          state.flat.bedroom.lights.readingLeft.lastChange = new Date();
        }
        if (!state.flat.bedroom.lightOn && state.flat.bedroom.lights.readingLeft.state === lightState.off) {
          state.flat.bedroom.lights.readingLeft.state = lightState.inherit;
          state.flat.bedroom.lights.readingLeft.lastChange = new Date();
        }

        if (state.flat.bedroom.lightOn && state.flat.bedroom.lights.readingRight.state === lightState.on) {
          state.flat.bedroom.lights.readingRight.state = lightState.inherit;
          state.flat.bedroom.lights.readingRight.lastChange = new Date();
        }
        if (!state.flat.bedroom.lightOn && state.flat.bedroom.lights.readingRight.state === lightState.off) {
          state.flat.bedroom.lights.readingRight.state = lightState.inherit;
          state.flat.bedroom.lights.readingRight.lastChange = new Date();
        }

        state.flat.bedroom.lightOn = !state.flat.bedroom.lightOn;
        state.flat.bedroom.color = false;
      });
    } else if (pressCount == 1) {
      updateState(site, (state) => {
        state.flat.bedroom.lightOn = true;
        state.flat.bedroom.brightness = 1.0;
        state.flat.bedroom.color = false;
      });
    } else if (pressCount == 2) {
      updateState(site, (state) => {
        state.flat.bedroom.lightOn = true;
        state.flat.bedroom.brightness = 0.1;
        state.flat.bedroom.color = false;
      });
    } else if (pressCount == 5) {
      updateState(site, (state) => {
        state.flat.bedroom.lightOn = true;
        state.flat.bedroom.brightness = 0.3;
        state.flat.bedroom.color = true;
        state.flat.bedroom.lights.readingLeft.state = lightState.off;
        state.flat.bedroom.lights.readingLeft.lastChange = new Date();
        state.flat.bedroom.lights.readingRight.state = lightState.off;
        state.flat.bedroom.lights.readingRight.lastChange = new Date();
        state.flat.hallway.lights.ceiling.state = lightState.off;
        state.flat.hallway.lights.ceiling.lastChange = new Date();
        state.flat.kitchen.lights.ceiling.state = lightState.off;
        state.flat.kitchen.lights.ceiling.lastChange = new Date();
      });
    }
  }
});

function bedroomBedSwitch(payload: any) {
  if (payload.action === 'toggle') {
    updateState(site, (state) => {
      if ( state.flat.bedroom.lightOn ||
        [
          state.flat.bedroom.lights.ceiling.state,
          state.flat.bedroom.lights.readingLeft.state,
          state.flat.bedroom.lights.readingRight.state,
        ].some(flag => flag === lightState.on) ) {
          if (state.flat.bedroom.lights.ceiling.state === lightState.on) {
            state.flat.bedroom.lights.ceiling.state = lightState.inherit;
            state.flat.bedroom.lights.ceiling.lastChange = new Date();
          }
          if (state.flat.bedroom.lights.readingLeft.state === lightState.on) {
            state.flat.bedroom.lights.readingLeft.state = lightState.inherit;
            state.flat.bedroom.lights.readingLeft.lastChange = new Date();
          }
          if (state.flat.bedroom.lights.readingRight.state === lightState.on) {
            state.flat.bedroom.lights.readingRight.state = lightState.inherit;
            state.flat.bedroom.lights.readingRight.lastChange = new Date();
          }

          state.flat.bedroom.lightOn = false;
        } else {
          if (state.flat.bedroom.lights.ceiling.state === lightState.off) {
            state.flat.bedroom.lights.ceiling.state = lightState.inherit;
            state.flat.bedroom.lights.ceiling.lastChange = new Date();
          }
          if (state.flat.bedroom.lights.readingLeft.state === lightState.off) {
            state.flat.bedroom.lights.readingLeft.state = lightState.inherit;
            state.flat.bedroom.lights.readingLeft.lastChange = new Date();
          }
          if (state.flat.bedroom.lights.readingRight.state === lightState.off) {
            state.flat.bedroom.lights.readingRight.state = lightState.inherit;
            state.flat.bedroom.lights.readingRight.lastChange = new Date();
          }

          state.flat.bedroom.lightOn = true;
        }
        state.flat.bedroom.color = false;
    });
  }

  if (payload.action === 'arrow_left_click') {
    updateState(site, (state) => {
      if (state.flat.bedroom.lightOn) {
        if (state.flat.bedroom.lights.readingLeft.state === lightState.off) {
          state.flat.bedroom.lights.readingLeft.state = lightState.inherit;
        } else {
          state.flat.bedroom.lights.readingLeft.state = lightState.off;
        }
      } else {
        if (state.flat.bedroom.lights.readingLeft.state === lightState.on) {
          state.flat.bedroom.lights.readingLeft.state = lightState.inherit;
        } else {
          state.flat.bedroom.lights.readingLeft.state = lightState.on;
        }
      }
    });
  }

  if (payload.action === 'arrow_right_click') {
    updateState(site, (state) => {
      if (state.flat.bedroom.lightOn) {
        if (state.flat.bedroom.lights.readingRight.state === lightState.off) {
          state.flat.bedroom.lights.readingRight.state = lightState.inherit;
        } else {
          state.flat.bedroom.lights.readingRight.state = lightState.off;
        }
      } else {
        if (state.flat.bedroom.lights.readingRight.state === lightState.on) {
          state.flat.bedroom.lights.readingRight.state = lightState.inherit;
        } else {
          state.flat.bedroom.lights.readingRight.state = lightState.on;
        }
      }
    });
  }

  if (payload.action === 'brightness_up_click') {
    updateState(site, (state) => {
      state.flat.bedroom.brightness = clamp(0.1, 1.0)(state.flat.bedroom.brightness + 0.1);
    });
  }

  if (payload.action === 'brightness_down_click') {
    updateState(site, (state) => {
      state.flat.bedroom.brightness = clamp(0.1, 1.0)(state.flat.bedroom.brightness - 0.1);
    });
  }
}

mqttSensor('zigbee2mqtt/switch/bedroom_bed_left', (payload) => bedroomBedSwitch(payload));
mqttSensor('zigbee2mqtt/switch/bedroom_bed_right', (payload) => bedroomBedSwitch(payload));
