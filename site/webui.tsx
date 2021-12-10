import { site } from ".";
import { updateState, webuiWidget } from 'haah';

import React from 'react';
import { Label, LabeledColorPicker, LabeledSlider, LabeledSwitch } from '../util/frontend';
import { lightState, occupancyState, windowState } from "../util/enums";

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
      <Label
        label={"Temperature"}
        value={site.flat.livingroom.climate.temperature + " °C"}
      />
      <Label
        label={"Humidity"}
        value={site.flat.livingroom.climate.humidity + " %"}
      />
      <Label
        label={"Balcony door"}
        value={site.flat.livingroom.windows.balcony.state === windowState.closed ? "Closed" : "Open"}
      />
    </>
  );
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
        checked={site.flat.bedroom.lightOn}
        onChange={(checked) =>
          updateState(site, (state) => {
            state.flat.bedroom.lightOn = checked;

            if (checked) {
              if (state.flat.bedroom.lights.readingLeft.state === lightState.on) {
                state.flat.bedroom.lights.readingLeft.state = lightState.inherit;
              }
              if (state.flat.bedroom.lights.readingRight.state === lightState.on) {
                state.flat.bedroom.lights.readingRight.state = lightState.inherit;
              }
            } else {
              if (state.flat.bedroom.lights.readingLeft.state === lightState.off) {
                state.flat.bedroom.lights.readingLeft.state = lightState.inherit;
              }
              if (state.flat.bedroom.lights.readingRight.state === lightState.off) {
                state.flat.bedroom.lights.readingRight.state = lightState.inherit;
              }
            }
          })
        }
      />
      <LabeledSwitch
        label={"Reading Light Left"}
        checked={site.flat.bedroom.lights.readingLeft.state === lightState.on
          || (site.flat.bedroom.lightOn && site.flat.bedroom.lights.readingLeft.state !== lightState.off)}
        onChange={(checked) =>
          updateState(site, (state) => {
            if (state.flat.bedroom.lightOn === checked) {
              state.flat.bedroom.lights.readingLeft.state = lightState.inherit;
            } else {
              state.flat.bedroom.lights.readingLeft.state = checked ? lightState.on : lightState.off;
            }
          })
        }
      />
      <LabeledSwitch
        label={"Reading Light Right"}
        checked={site.flat.bedroom.lights.readingRight.state === lightState.on
          || (site.flat.bedroom.lightOn && site.flat.bedroom.lights.readingRight.state !== lightState.off)}
        onChange={(checked) =>
          updateState(site, (state) => {
            if (state.flat.bedroom.lightOn === checked) {
              state.flat.bedroom.lights.readingRight.state = lightState.inherit;
            } else {
              state.flat.bedroom.lights.readingRight.state = checked ? lightState.on : lightState.off;
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
      <Label
        label={"Temperature"}
        value={site.flat.bedroom.climate.temperature + " °C"}
      />
      <Label
        label={"Humidity"}
        value={site.flat.bedroom.climate.humidity + " %"}
      />
      <Label
        label={"Right window"}
        value={site.flat.bedroom.windows.right.state === windowState.closed ? "Closed" : "Open"}
      />
    </>
  );
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
      <Label
        label={"Temperature"}
        value={site.flat.bathroom.climate.temperature + " °C"}
      />
      <Label
        label={"Humidity"}
        value={site.flat.bathroom.climate.humidity + " %"}
      />
      <Label
        label={"Window"}
        value={site.flat.bathroom.windows.window.state === windowState.closed ? "Closed" : "Open"}
      />
    </>
  );
});

webuiWidget('Flat', () => {
  return (
    <>
      <LabeledColorPicker
        label={"Accent color"}
        color={site.settings.colors.accent}
        onChangeComplete={(color, event) =>
          updateState(site, (state) => {
            state.settings.colors.accent = color.rgb;
          })
        }
      />
    </>
  );
});

webuiWidget('Hallway', () => {
  return (
    <>
      <LabeledSwitch
        label={"Lights"}
        checked={(site.flat.hallway.lights.ceiling.state === lightState.on
              || (site.flat.hallway.lights.ceiling.state === lightState.inherit
                && site.flat.hallway.occupancy.state === occupancyState.occupied
                && !site.environment.daylight))}
        onChange={(checked) => {
          updateState(site, (state) => {
            if (checked) {
              state.flat.hallway.lights.ceiling.state = lightState.on;
            } else {
              state.flat.hallway.lights.ceiling.state = lightState.off;
            }
            state.flat.hallway.lights.ceiling.lastChange = new Date();
          });
        }}
      />
    </>
  );
});

webuiWidget('Kitchen', () => {
  return (
    <>
      <LabeledSwitch
        label={"Lights"}
        checked={(site.flat.kitchen.lights.ceiling.state === lightState.on
              || (site.flat.kitchen.lights.ceiling.state === lightState.inherit
                && site.flat.kitchen.occupancy.state === occupancyState.occupied
                && !site.environment.daylight))}
        onChange={(checked) => {
          updateState(site, (state) => {
            if (checked) {
              state.flat.kitchen.lights.ceiling.state = lightState.on;
            } else {
              state.flat.kitchen.lights.ceiling.state = lightState.off;
            }
            state.flat.kitchen.lights.ceiling.lastChange = new Date();
          });
        }}
      />
    </>
  )
});

