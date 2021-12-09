import { site, settings } from "../..";
import { mqttActuator, timeSensor, updateState } from 'haah';
import { differenceInMinutes } from 'date-fns';
import { lightState, occupancyState } from '../../../util/enums';

const localSettings = {
  brightness: {
    day: 0.8,
    night: 0.33,
  },
  transition: {
    short: 0.3,
    long: 15,
  },
  timeout: {
    lightOn: 60,
    lightOff: 5,
  },
}

function kitchenCeilingLight() {
  return () => {
    if (site.flat.kitchen.lights.ceiling.state === lightState.lightOff) {
      return {
        state: 'off',
        transition: localSettings.transition.short,
      }
    }

    if (site.flat.kitchen.lights.ceiling.state === lightState.lightOn) {
      return {
        state: 'on',
        transition: localSettings.transition.short,
        brightness: 255 * localSettings.brightness.day,
        color_temp: settings.colortemperature.default,
      }
    }

    if (site.flat.kitchen.occupancy.state !== occupancyState.occupied) {
      return {
        state: 'off',
        transition: localSettings.transition.long,
      }
    }

    if (site.environment.daylight) {
      return {
        state: 'off',
        transition: localSettings.transition.long,
      }
    }

    return {
      state: 'on',
      transition: localSettings.transition.short,
      brightness: 255 * (site.environment.daytime ? localSettings.brightness.day : localSettings.brightness.night),
      color_temp: settings.colortemperature.default,
    }
  }
}

mqttActuator('zigbee2mqtt/light/kitchen_ceiling/set', kitchenCeilingLight());

timeSensor((time) => {
  updateState(site, (state) => {
    if (state.flat.kitchen.lights.ceiling.state === lightState.lightOff && differenceInMinutes(new Date(time), new Date(state.flat.kitchen.lights.ceiling.lastChange)) > localSettings.timeout.lightOff) {
      state.flat.kitchen.occupancy.state = occupancyState.unoccupied;
      state.flat.kitchen.occupancy.lastChange = new Date();
      state.flat.kitchen.lights.ceiling.state = lightState.inherit;
      state.flat.kitchen.lights.ceiling.lastChange = new Date();
    } else if (state.flat.kitchen.lights.ceiling.state === lightState.lightOn && differenceInMinutes(new Date(time), new Date(state.flat.kitchen.lights.ceiling.lastChange)) > localSettings.timeout.lightOn) {
      state.flat.kitchen.lights.ceiling.state = lightState.inherit;
      state.flat.kitchen.lights.ceiling.lastChange = new Date();
    }
  });
});
