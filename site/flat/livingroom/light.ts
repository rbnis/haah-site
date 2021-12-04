import { mqttActuator } from 'haah';
import { environment } from '../../environment';

import { livingroom } from ".";

function livingroomCeilingLight() {
  return () => {
    if (!livingroom.lightOn) {
      return { state: 'off', transition: 0.3 }
    }

    return {
      state: 'on',
      transition: 0.3,
      brightness: 255 * livingroom.brightness,
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
    brightness: (environment.daylight ? 230 : 180) * livingroom.brightness,
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
    brightness: livingroom.productive ? 150 : (environment.daylight ? 230 : 180) * livingroom.brightness,
    color: livingroom.productive
      ? { r: 255, g: 226, b: 162 }
      : { r: 104, g: 0,   b: 231 },
  }
});
