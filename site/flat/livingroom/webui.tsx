import { site } from "../..";
import { updateState, webuiWidget } from 'haah';
import { windowState } from '../../../util/enums';

import React from 'react';
import { LabeledSwitch, LabeledSlider, LabeledLabel } from '../../../util/frontend';

webuiWidget('Living Room', () => {
  const temperatureMarks = {
    10: '10°C',
    21: '21°C',
    30: '30°C'
  };

  const brightnessMarks = {
    0.05: '5%',
    0.5: '50%',
    0.8: '80%',
    1.0: '100%'
  };

  return (
    <>
      <LabeledSwitch
        label={"Lights"}
        checked={site.flat.livingroom.lightOn}
        onChange={(checked) =>
          updateState(site, (state) => {
            state.flat.livingroom.lightOn = checked;
          })
        }
      />
      <LabeledSwitch
        label={"Productive"}
        checked={site.flat.livingroom.productive}
        onChange={(checked) =>
          updateState(site, (state) => {
            state.flat.livingroom.productive = checked;
          })
        }
      />
      <LabeledSlider
        label={"Brightness"}
        value={site.flat.livingroom.brightness}
        min={0.05}
        step={0.05}
        max={1.0}
        marks={brightnessMarks}
        onChange={(brightness: number) =>
          updateState(site, (state) => {
            state.flat.livingroom.brightness = brightness;
          })
        }
      />
      <LabeledSlider
        label={"Temperature"}
        value={site.flat.livingroom.climate.temperatureTarget}
        min={10}
        step={0.5}
        max={30}
        marks={temperatureMarks}
        onChange={(temperatureTarget: number) =>
          updateState(site, (state) => {
            state.flat.livingroom.climate.temperatureTarget = temperatureTarget;
          })
        }
      />
      <LabeledLabel
        label={"Temperature"}
        value={site.flat.livingroom.climate.temperature + " °C"}
      />
      <LabeledLabel
        label={"Humidity"}
        value={site.flat.livingroom.climate.humidity + " %"}
      />
      <LabeledLabel
        label={"Balcony door"}
        value={site.flat.livingroom.windows.balcony.state === windowState.closed ? "Closed" : "Open"}
      />
    </>
  );
});
