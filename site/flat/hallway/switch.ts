import { mqttSensor } from 'haah';
import { switchToggleMotionOverwrite } from '../../../util/motion';

import { hallway } from ".";

let overwriteTimeout: NodeJS.Timeout;
mqttSensor('zigbee2mqtt/switch/hallway_door_1', (payload) => {
  if (payload.action === 'left_press') {
    switchToggleMotionOverwrite(hallway, overwriteTimeout, 5, 60 * 30)
  }
});
mqttSensor('zigbee2mqtt/switch/hallway_door_2', (payload) => {
  if (payload.action === 'left_press') {
    switchToggleMotionOverwrite(hallway, overwriteTimeout, 5, 60 * 30)
  }
});
