import { state, updateState, webuiWidget } from 'haah';
import { LabeledLabel, LabeledSlider } from '../../../util/frontend';
import React from 'react';

import { windowState } from '../../../util/enums';

export const bathroom = state('bathroom', {
  window: windowState.open,
  humidity : 0.00,
  temperature: 0.00,
  temperatureTarget: 21.00,
  temperatureThermostat: 0.00,
});

webuiWidget('Bathroom', () => {
  const temperatureMarks = {
    10: '10°C',
    21: '21°C',
    30: '30°C'
  };

  return (
    <>
     <LabeledSlider
        label={"Temperature"}
        value={bathroom.temperatureTarget}
        min={10}
        step={0.5}
        max={30}
        marks={temperatureMarks}
        onChange={(temperatureTarget: number) =>
          updateState(bathroom, (state) => {
            state.temperatureTarget = temperatureTarget;
          })
        }
      />
      <LabeledLabel
        label={"Temperature"}
        value={bathroom.temperature + " °C"}
      />
      <LabeledLabel
        label={"Humidity"}
        value={bathroom.humidity + " %"}
      />
      <LabeledLabel
        label={"Window"}
        value={bathroom.window == windowState.closed ? "Closed" : "Open"}
      />
    </>
  );
});