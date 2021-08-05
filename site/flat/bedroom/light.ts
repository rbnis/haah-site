import { mqttActuator } from 'haah';
import { taints } from '../../../util/enums';

import { bedroom } from ".";

function bedroomCeilingLight() {
  return () => {
    if (bedroom.overwrites.ceiling === taints.lightOff) {
      return { state: 'off', transition: 0.3 }
    }

    if (bedroom.overwrites.ceiling === taints.lightOn) {
      return {
        state: 'on',
        transition: 0.3,
        brightness: 190 * bedroom.brightness,
      }
    }

    if (!bedroom.lightOn) {
      return { state: 'off', transition: 0.3 }
    }

    return {
      state: 'on',
      transition: 0.3,
      brightness: 190 * bedroom.brightness,
    }
  }
}

mqttActuator('zigbee2mqtt/light/bedroom_ceiling_1/set', bedroomCeilingLight());
mqttActuator('zigbee2mqtt/light/bedroom_ceiling_2/set', bedroomCeilingLight());

mqttActuator('zigbee2mqtt/light/bedroom_bed_left/set', () => {
  if (bedroom.overwrites.readingLeft === taints.lightOff) {
    return { state: 'off', transition: 0.3 }
  }

  if (bedroom.overwrites.readingLeft === taints.lightOn) {
    return {
      state: 'on',
      transition: 0.3,
      brightness: 190 * bedroom.brightness
    }
  }

  if (!bedroom.lightOn) {
    return { state: 'off', transition: 0.3 }
  }

  return {
    state: 'on',
    transition: 0.3,
    brightness: 190 * bedroom.brightness,
  }
});

mqttActuator('zigbee2mqtt/light/bedroom_bed_right/set', () => {
  if (bedroom.overwrites.readingRight === taints.lightOff) {
    return { state: 'off', transition: 0.3 }
  }

  if (bedroom.overwrites.readingRight === taints.lightOn) {
    return {
      state: 'on',
      transition: 0.3,
      brightness: 190 * bedroom.brightness
    }
  }

  if (!bedroom.lightOn) {
    return { state: 'off', transition: 0.3 }
  }

  return {
    state: 'on',
    transition: 0.3,
    brightness: 190 * bedroom.brightness,
  }
});
