import { state } from 'haah';
import { lightState, occupancyState, windowState } from '../util/enums';

export const settings = {
  colortemperature: {
    default: 350,
    productive: 300,
  },
  transition: {
    short: 0.3,
    long: 15,
  },
}

export const site = state('site', {
  environment: {
    time: new Date(),
    weather: null,
    daytime: false,
    daylight: false,
  },
  settings: {
    colors: {
      accent:     { r: 250, g: 120, b: 64  },
      productive: { r: 255, g: 226, b: 162 },
      uhlala:     { r: 177, g: 21,  b: 41  },
      rc3:        { r: 104, g: 0,   b: 231 },
    },
  },
  flat: {
    bathroom: {
      windows: {
        window: {
          state: windowState.open,
          lastChange: new Date (),
        },
      },
      climate: {
        humidity : 0.00,
        temperature: 0.00,
        temperatureTarget: 21.00,
        temperatureThermostat: 0.00,
      },
    },
    bedroom: {
      lightOn: false,
      brightness: 0.8,
      color: false,
      lights: {
        ceiling: {
          state: lightState.inherit,
          lastChange: new Date(),
        },
        readingLeft: {
          state: lightState.inherit,
          lastChange: new Date(),
        },
        readingRight: {
          state: lightState.inherit,
          lastChange: new Date(),
        },
      },
      windows: {
        right: {
          state: windowState.open,
          lastChange: new Date(),
        },
      },
      climate: {
        humidity : 0.00,
        temperature: 0.00,
        temperatureTarget: 21.00,
        temperatureThermostat: 0.00,
      },
    },
    hallway: {
      occupancy: {
        state: occupancyState.unoccupied,
        lastChange: new Date(),
      },
      lights: {
        ceiling: {
          state: lightState.inherit,
          lastChange: new Date(),
        },
      },
    },
    kitchen: {
      occupancy: {
        state: occupancyState.unoccupied,
        lastChange: new Date(),
      },
      lights: {
        ceiling: {
          state: lightState.inherit,
          lastChange: new Date(),
        },
      },
    },
    livingroom: {
      lightOn: false,
      brightness: 0.8,
      productive: false,
      windows: {
        balcony: {
          state: windowState.open,
          lastChange: new Date(),
        },
      },
      climate: {
        humidity: 0.00,
        pressure: 0.0,
        temperature: 0.00,
        temperatureTarget: 21.00,
        temperatureThermostat: 0.00,
      },
    }
  }
});
