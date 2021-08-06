import { mqttActuator } from 'haah';
import { environment } from '../../environment';
import { taints } from '../../../util/enums';

import { kitchen } from ".";

mqttActuator('zigbee2mqtt/light/kitchen_ceiling/set', () => {
  if (kitchen.overwrites.ceiling === taints.lightOff) {
    return { state: 'off', transition: 0.3 }
  }

  if (kitchen.overwrites.ceiling === taints.lightOn) {
    return {
      state: 'on',
      transition: 0.3,
      brightness: 255 * 0.75,
    }
  }

  if (!kitchen.occupied) {
    return { state: 'off', transition: 15 }
  }

  if (environment.daylight) {
    return { state: 'off', transition: 15 }
  }

  return {
    state: 'on',
    transition: 0.3,
    brightness: 255 * (environment.daytime ? 0.75 : 0.33),
  }
});
