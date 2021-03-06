import { site, settings } from "../..";
import { mqttActuator, timeSensor, updateState } from 'haah';
import { differenceInMinutes } from 'date-fns';
import { lightState, occupancyState } from '../../../util/enums';

const localSettings = {
  brightness: {
    day: 0.75,
    night: 0.05,
  },
  timeout: {
    lightOn: 30,
    lightOff: 3,
  },
}

function hallwayCeilingLight() {
  return () => {
    if (site.flat.hallway.lights.ceiling.state === lightState.off) {
      return {
        state: 'off',
        transition: settings.transition.short,
      }
    }

    if (site.flat.hallway.lights.ceiling.state === lightState.on) {
      return {
        state: 'on',
        transition: settings.transition.short,
        brightness: 255 * (site.environment.daytime ? localSettings.brightness.day : localSettings.brightness.night),
        color_temp: settings.colortemperature.default,
      }
    }

    if (site.flat.hallway.occupancy.state !== occupancyState.occupied) {
      return {
        state: 'off',
        transition: settings.transition.long,
      }
    }

    if (site.environment.daylight) {
      return {
        state: 'off',
        transition: settings.transition.long,
      }
    }

    return {
      state: 'on',
      transition: settings.transition.short,
      brightness: 255 * (site.environment.daytime ? localSettings.brightness.day : localSettings.brightness.night),
      color_temp: settings.colortemperature.default,
    }
  }
}

mqttActuator('zigbee2mqtt/light/hallway_ceiling_1/set', hallwayCeilingLight());
mqttActuator('zigbee2mqtt/light/hallway_ceiling_2/set', hallwayCeilingLight());
mqttActuator('zigbee2mqtt/light/hallway_ceiling_3/set', hallwayCeilingLight());

timeSensor((time) => {
  updateState(site, (state) => {
    if (state.flat.hallway.lights.ceiling.state === lightState.off && differenceInMinutes(new Date(time), new Date(state.flat.hallway.lights.ceiling.lastChange)) > localSettings.timeout.lightOff) {
      state.flat.hallway.occupancy.state = occupancyState.unoccupied;
      state.flat.hallway.occupancy.lastChange = new Date();
      state.flat.hallway.lights.ceiling.state = lightState.inherit;
      state.flat.hallway.lights.ceiling.lastChange = new Date();
    } else if (state.flat.hallway.lights.ceiling.state === lightState.on && differenceInMinutes(new Date(time), new Date(state.flat.hallway.lights.ceiling.lastChange)) > localSettings.timeout.lightOn) {
      state.flat.hallway.lights.ceiling.state = lightState.inherit;
      state.flat.hallway.lights.ceiling.lastChange = new Date();
    }
  });
});
