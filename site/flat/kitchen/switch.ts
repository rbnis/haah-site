import { mqttSensor } from 'haah';
import { switchToggleMotionOverwrite } from '../../../util/motion';

import { kitchen } from ".";

let overwriteTimeout: NodeJS.Timeout;
mqttSensor('zigbee2mqtt/switch/kitchen_door_wall', (payload) => {
  if (payload.action === 'left_press') {
    switchToggleMotionOverwrite(kitchen, overwriteTimeout, 5, 60 * 60)
  }
});
