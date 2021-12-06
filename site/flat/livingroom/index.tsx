import { state, updateState, webuiWidget } from 'haah';
import { LabeledSwitch, LabeledSlider } from '../../../util/frontend';
import React from 'react';

import { windowState } from '../../../util/enums';

export const livingroom = state('livingroom', {
  lightOn: false,
  brightness: 1.0,
  productive: false,
  window: windowState.open,
  humidity: 0.00,
  pressure: 0.0,
  temperature: 0.00,
  temperatureTarget: 21.00,
  temperatureThermostat: 0.00,
});

webuiWidget('Living Room', () => {
  const temperatureMarks = {
    10: '10°C',
    21: '21°C',
    30: '30°C'
  };

  const brightnessMarks = {
    0: '0%',
    0.5: '50%',
    0.8: '80%',
    1.0: '100%'
  };

  return (
    <>
      <LabeledSwitch
        label={"Lights"}
        checked={livingroom.lightOn}
        onChange={(checked) =>
          updateState(livingroom, (state) => {
            state.lightOn = checked;
          })
        }
      />
      <LabeledSwitch
        label={"Productive"}
        checked={livingroom.productive}
        onChange={(checked) =>
          updateState(livingroom, (state) => {
            state.productive = checked;
          })
        }
      />
      <LabeledSlider
        label={"Brightness"}
        value={livingroom.brightness}
        min={0}
        step={0.05}
        max={1.0}
        marks={brightnessMarks}
        onChange={(brightness: number) =>
          updateState(livingroom, (state) => {
            state.brightness = brightness;
          })
        }
      />
      <LabeledSlider
        label={"Temperature"}
        value={livingroom.temperatureTarget}
        min={10}
        step={0.5}
        max={30}
        marks={temperatureMarks}
        onChange={(temperatureTarget: number) =>
          updateState(livingroom, (state) => {
            state.temperatureTarget = temperatureTarget;
          })
        }
      />
    </>
  );
});
