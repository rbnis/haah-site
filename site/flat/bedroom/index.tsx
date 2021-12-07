import { state, updateState, webuiWidget } from 'haah';
import { LabeledSwitch, LabeledSlider, LabeledLabel } from '../../../util/frontend';
import React from 'react';

import { taints, windowState } from '../../../util/enums';

export const bedroom = state('bedroom', {
  lightOn: false,
  brightness: 0.8,
  overwrites: {
    ceiling: taints.none,
    readingLeft: taints.none,
    readingRight: taints.none,
  },
  window: windowState.open,
  humidity : 0.00,
  temperature: 0.00,
  temperatureTarget: 21.00,
  temperatureThermostat: 0.00,
});

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
        checked={bedroom.lightOn}
        onChange={(checked) =>
          updateState(bedroom, (state) => {
            state.lightOn = checked;
            state.overwrites.readingLeft = (state.overwrites.readingLeft === taints.lightOn && checked)
              || (state.overwrites.readingLeft === taints.lightOff && !checked)
                ? taints.none
                : state.overwrites.readingLeft
            state.overwrites.readingRight = (state.overwrites.readingRight === taints.lightOn && checked)
              || (state.overwrites.readingRight === taints.lightOff && !checked)
                ? taints.none
                : state.overwrites.readingRight
          })
        }
      />
      <LabeledSwitch
        label={"Reading Light Left"}
        checked={((bedroom.lightOn && bedroom.overwrites.readingLeft !== taints.lightOff) || bedroom.overwrites.readingLeft === taints.lightOn)}
        onChange={(checked) =>
          updateState(bedroom, (state) => {
            state.overwrites.readingLeft = state.overwrites.readingLeft === taints.lightOn
              || (state.lightOn && state.overwrites.readingLeft === taints.none)
                ? taints.lightOff
                : taints.lightOn;
            state.overwrites.readingLeft = (state.lightOn && checked)
              || (!state.lightOn && !checked)
                ? taints.none
                : checked
                  ? taints.lightOn
                  : taints.lightOff
          })
        }
      />
      <LabeledSwitch
        label={"Reading Light Right"}
        checked={((bedroom.lightOn && bedroom.overwrites.readingRight !== taints.lightOff) || bedroom.overwrites.readingRight === taints.lightOn)}
        onChange={(checked) =>
          updateState(bedroom, (state) => {
            state.overwrites.readingRight = state.overwrites.readingRight === taints.lightOn
              || (state.lightOn && state.overwrites.readingRight === taints.none)
                ? taints.lightOff
                : taints.lightOn;
            state.overwrites.readingRight = (state.lightOn && checked)
              || (!state.lightOn && !checked)
                ? taints.none
                : checked
                  ? taints.lightOn
                  : taints.lightOff
          })
        }
      />
      <LabeledSlider
        label={"Brightness"}
        value={bedroom.brightness}
        min={0.05}
        step={0.05}
        max={1.0}
        marks={brightnessMarks}
        onChange={(brightness: number) =>
          updateState(bedroom, (state) => {
            state.brightness = brightness;
          })
        }
      />
      <LabeledSlider
        label={"Temperature"}
        value={bedroom.temperatureTarget}
        min={10}
        step={0.5}
        max={30}
        marks={temperatureMarks}
        onChange={(temperatureTarget: number) =>
          updateState(bedroom, (state) => {
            state.temperatureTarget = temperatureTarget;
          })
        }
      />
      <LabeledLabel
        label={"Temperature"}
        value={bedroom.temperature + " °C"}
      />
      <LabeledLabel
        label={"Humidity"}
        value={bedroom.humidity + " %"}
      />
      <LabeledLabel
        label={"Window"}
        value={bedroom.window == windowState.closed ? "Closed" : "Open"}
      />
    </>
  );
});
