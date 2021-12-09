import { site } from "../..";
import { updateState, webuiWidget } from 'haah';
import { windowState } from '../../../util/enums';

import React from 'react';
import { LabeledLabel, LabeledSlider } from '../../../util/frontend';

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
        value={site.flat.bathroom.climate.temperatureTarget}
        min={10}
        step={0.5}
        max={30}
        marks={temperatureMarks}
        onChange={(temperatureTarget: number) =>
          updateState(site, (state) => {
            state.flat.bathroom.climate.temperatureTarget = temperatureTarget;
          })
        }
      />
      <LabeledLabel
        label={"Temperature"}
        value={site.flat.bathroom.climate.temperature + " °C"}
      />
      <LabeledLabel
        label={"Humidity"}
        value={site.flat.bathroom.climate.humidity + " %"}
      />
      <LabeledLabel
        label={"Window"}
        value={site.flat.bathroom.windows.window.state === windowState.closed ? "Closed" : "Open"}
      />
    </>
  );
});
