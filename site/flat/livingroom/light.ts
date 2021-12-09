import { site, settings } from '../..';
import { mqttActuator } from 'haah';

const localSettings = {
  brightness: {
    bright: 0.8,
    dim: 0.3,
  },
}

function livingroomCeilingLight() {
  return () => {
    if (!site.flat.livingroom.lightOn) {
      return {
        state: 'off',
        transition: settings.transition.short,
      }
    }

    return {
      state: 'on',
      transition: settings.transition.short,
      brightness: 255 * site.flat.livingroom.brightness,
      color_temp: settings.colortemperature.default,
    }
  }
}

mqttActuator('zigbee2mqtt/light/livingroom_ceiling_1/set', livingroomCeilingLight());
mqttActuator('zigbee2mqtt/light/livingroom_ceiling_2/set', livingroomCeilingLight());
mqttActuator('zigbee2mqtt/light/livingroom_ceiling_3/set', livingroomCeilingLight());

mqttActuator('zigbee2mqtt/light/livingroom_desk/set', () => {
  if (!site.flat.livingroom.lightOn) {
    return {
      state: 'off',
      transition: settings.transition.short,
    }
  }

  return {
    state: 'on',
    transition: settings.transition.short,
    brightness: 200 * site.flat.livingroom.brightness,
    color: site.flat.livingroom.productive
      ? settings.colors.productive
      : settings.colors.accent,
  }
});

mqttActuator('zigbee2mqtt/light/livingroom_couch/set', () => {
  if (!site.flat.livingroom.lightOn) {
    return {
      state: 'off',
      transition: settings.transition.short,
    }
  }

  return {
    state: 'on',
    transition: settings.transition.short,
    brightness: site.flat.livingroom.productive ? 150 : 230 * site.flat.livingroom.brightness,
    color: site.flat.livingroom.productive
      ? settings.colors.productive
      : settings.colors.accent,
  }
});
