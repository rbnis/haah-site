import { mqttSensor, updateState } from 'haah';
import { taints } from '../../../util/enums';

import { bedroom } from ".";

mqttSensor('zigbee2mqtt/switch/bedroom_door_wall', (payload) => {
  if (payload.action === 'left_press') {
    updateState(bedroom, (state) => {
      state.overwrites.readingLeft = (state.lightOn && state.overwrites.readingLeft === taints.lightOn)
        || (!state.lightOn && state.overwrites.readingLeft === taints.lightOff)
          ? taints.none
          : state.overwrites.readingLeft;
      state.overwrites.readingRight = (state.lightOn && state.overwrites.readingRight === taints.lightOn)
        || (!state.lightOn && state.overwrites.readingRight === taints.lightOff)
          ? taints.none
          : state.overwrites.readingRight;
      state.lightOn = !state.lightOn;
    });
  }
});

function bedroomBedSwitch(payload: any) {
  if (payload.action === 'toggle') {
    updateState(bedroom, (state) => {
      state.overwrites.readingLeft = (state.lightOn && state.overwrites.readingLeft === taints.lightOn)
        || (!state.lightOn && state.overwrites.readingLeft === taints.lightOff)
          ? taints.none
          : state.overwrites.readingLeft;
      state.overwrites.readingRight = (state.lightOn && state.overwrites.readingRight === taints.lightOn)
        || (!state.lightOn && state.overwrites.readingRight === taints.lightOff)
          ? taints.none
          : state.overwrites.readingRight;
      state.lightOn = !state.lightOn;
    });
  }

  if (payload.action === 'arrow_left_click') {
    updateState(bedroom, (state) => {
      state.overwrites.readingLeft = state.overwrites.readingLeft === taints.lightOn
        || (state.lightOn && state.overwrites.readingLeft === taints.none)
          ? taints.lightOff
          : taints.lightOn;
        });
      }

  if (payload.action === 'arrow_right_click') {
    updateState(bedroom, (state) => {
      state.overwrites.readingRight = state.overwrites.readingRight === taints.lightOn
        || (state.lightOn && state.overwrites.readingRight === taints.none)
          ? taints.lightOff
          : taints.lightOn;
    });
  }

  if (payload.action === 'brightness_up_click') {
    updateState(bedroom, (state) => {
      state.brightness = state.brightness >= 1.0 ? 1.0 : state.brightness+0.1;
    });
  }

  if (payload.action === 'brightness_down_click') {
    updateState(bedroom, (state) => {
      state.brightness = state.brightness <= 0.1 ? 0.1 : state.brightness-0.1;
    });
  }
}

mqttSensor('zigbee2mqtt/switch/bedroom_bed_left', (payload) => bedroomBedSwitch(payload));
mqttSensor('zigbee2mqtt/switch/bedroom_bed_right', (payload) => bedroomBedSwitch(payload));
