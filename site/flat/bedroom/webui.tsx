import { site } from "../..";
import { updateState, webuiWidget } from 'haah';
import { lightState, windowState } from '../../../util/enums';

import React from 'react';
import { LabeledSwitch, LabeledSlider, LabeledLabel } from '../../../util/frontend';

webuiWidget('Bedroom', () => {
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
        checked={site.flat.bedroom.lightOn}
        onChange={(checked) =>
          updateState(site, (state) => {
            state.flat.bedroom.lightOn = checked;

            if (checked) {
              if (state.flat.bedroom.lights.readingLeft.state === lightState.lightOn) {
                state.flat.bedroom.lights.readingLeft.state = lightState.inherit;
              }
              if (state.flat.bedroom.lights.readingRight.state === lightState.lightOn) {
                state.flat.bedroom.lights.readingRight.state = lightState.inherit;
              }
            } else {
              if (state.flat.bedroom.lights.readingLeft.state === lightState.lightOff) {
                state.flat.bedroom.lights.readingLeft.state = lightState.inherit;
              }
              if (state.flat.bedroom.lights.readingRight.state === lightState.lightOff) {
                state.flat.bedroom.lights.readingRight.state = lightState.inherit;
              }
            }
          })
        }
      />
      <LabeledSwitch
        label={"Reading Light Left"}
        checked={site.flat.bedroom.lights.readingLeft.state === lightState.lightOn
          || (site.flat.bedroom.lightOn && site.flat.bedroom.lights.readingLeft.state !== lightState.lightOff)}
        onChange={(checked) =>
          updateState(site, (state) => {
            if (state.flat.bedroom.lightOn === checked) {
              state.flat.bedroom.lights.readingLeft.state = lightState.inherit;
            } else {
              state.flat.bedroom.lights.readingLeft.state = checked ? lightState.lightOn : lightState.lightOff;
            }
          })
        }
      />
      <LabeledSwitch
        label={"Reading Light Right"}
        checked={site.flat.bedroom.lights.readingRight.state === lightState.lightOn
          || (site.flat.bedroom.lightOn && site.flat.bedroom.lights.readingRight.state !== lightState.lightOff)}
        onChange={(checked) =>
          updateState(site, (state) => {
            if (state.flat.bedroom.lightOn === checked) {
              state.flat.bedroom.lights.readingRight.state = lightState.inherit;
            } else {
              state.flat.bedroom.lights.readingRight.state = checked ? lightState.lightOn : lightState.lightOff;
            }
          })
        }
      />
      <LabeledSlider
        label={"Brightness"}
        value={site.flat.bedroom.brightness}
        min={0.05}
        step={0.05}
        max={1.0}
        marks={brightnessMarks}
        onChange={(brightness: number) =>
          updateState(site, (state) => {
            state.flat.bedroom.brightness = brightness;
          })
        }
      />
      <LabeledSlider
        label={"Temperature"}
        value={site.flat.bedroom.climate.temperatureTarget}
        min={10}
        step={0.5}
        max={30}
        marks={temperatureMarks}
        onChange={(temperatureTarget: number) =>
          updateState(site, (state) => {
            state.flat.bedroom.climate.temperatureTarget = temperatureTarget;
          })
        }
      />
      <LabeledLabel
        label={"Temperature"}
        value={site.flat.bedroom.climate.temperature + " °C"}
      />
      <LabeledLabel
        label={"Humidity"}
        value={site.flat.bedroom.climate.humidity + " %"}
      />
      <LabeledLabel
        label={"Right window"}
        value={site.flat.bedroom.windows.right.state === windowState.closed ? "Closed" : "Open"}
      />
    </>
  );
});
