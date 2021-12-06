import { state, updateState, webuiWidget } from 'haah';
import { Slider } from 'antd';
import { LabeledSwitch } from '../../../util/frontend';
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
      <Slider
        value={livingroom.brightness}
        min={0}
        step={0.05}
        max={1.0}
        onChange={(brightness: number) =>
          updateState(livingroom, (state) => {
            state.brightness = brightness;
          })
        }
      />
      <Slider
        value={livingroom.temperatureTarget}
        min={10}
        step={0.5}
        max={30}
        onChange={(temperatureTarget: number) =>
          updateState(livingroom, (state) => {
            state.temperatureTarget = temperatureTarget;
          })
        }
      />
    </>
  );
});
