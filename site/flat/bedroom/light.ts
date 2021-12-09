import { site, settings } from '../..';
import { mqttActuator } from 'haah';
import { lightState } from '../../../util/enums';

function bedroomCeilingLight() {
  return () => {
    if (site.flat.bedroom.lights.ceiling.state === lightState.off) {
      return {
        state: 'off',
        transition: settings.transition.short,
      }
    }

    if (site.flat.bedroom.lights.ceiling.state === lightState.on) {
      return {
        state: 'on',
        transition: settings.transition.short,
        brightness: 255 * site.flat.bedroom.brightness,
        color_temp: settings.colortemperature.default,
      }
    }

    if (!site.flat.bedroom.lightOn) {
      return {
        state: 'off',
        transition: settings.transition.short,
      }
    }

    if (site.flat.bedroom.color) {
      return {
        state: 'on',
        transition: settings.transition.short,
        brightness: 255 * site.flat.bedroom.brightness,
        color: settings.colors.uhlala,
      }
    }

    return {
      state: 'on',
      transition: settings.transition.short,
      brightness: 255 * site.flat.bedroom.brightness,
      color_temp: settings.colortemperature.default,
    }
  }
}

mqttActuator('zigbee2mqtt/light/bedroom_ceiling_1/set', bedroomCeilingLight());
mqttActuator('zigbee2mqtt/light/bedroom_ceiling_2/set', bedroomCeilingLight());

mqttActuator('zigbee2mqtt/light/bedroom_bed_left/set', () => {
  if (site.flat.bedroom.lights.readingLeft.state === lightState.off) {
    return {
      state: 'off',
      transition: settings.transition.short,
    }
  }

  if (site.flat.bedroom.lights.readingLeft.state === lightState.on) {
    return {
      state: 'on',
      transition: settings.transition.short,
      brightness: 190 * site.flat.bedroom.brightness,
      color_temp: settings.colortemperature.default,
    }
  }

  if (!site.flat.bedroom.lightOn) {
    return {
      state: 'off',
      transition: settings.transition.short,
    }
  }

  return {
    state: 'on',
    transition: settings.transition.short,
    brightness: 190 * site.flat.bedroom.brightness,
    color_temp: settings.colortemperature.default,
  }
});

mqttActuator('zigbee2mqtt/light/bedroom_bed_right/set', () => {
  if (site.flat.bedroom.lights.readingRight.state === lightState.off) {
    return {
      state: 'off',
      transition: settings.transition.short,
    }
  }

  if (site.flat.bedroom.lights.readingRight.state === lightState.on) {
    return {
      state: 'on',
      transition: settings.transition.short,
      brightness: 190 * site.flat.bedroom.brightness,
      color_temp: settings.colortemperature.default,
    }
  }

  if (!site.flat.bedroom.lightOn) {
    return {
      state: 'off',
      transition: settings.transition.short,
    }
  }

  return {
    state: 'on',
    transition: settings.transition.short,
    brightness: 190 * site.flat.bedroom.brightness,
    color_temp: settings.colortemperature.default,
  }
});
