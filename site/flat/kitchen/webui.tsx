import { site } from "../..";
import { updateState, webuiWidget } from 'haah';
import { lightState, occupancyState } from '../../../util/enums';

import React from 'react';
import { LabeledSwitch } from '../../../util/frontend';

webuiWidget('Kitchen', () => {
  return (
    <>
      <LabeledSwitch
        label={"Lights"}
        checked={(site.flat.kitchen.lights.ceiling.state === lightState.lightOn
              || (site.flat.kitchen.lights.ceiling.state === lightState.inherit
                && site.flat.kitchen.occupancy.state === occupancyState.occupied
                && !site.environment.daylight))}
        onChange={(checked) => {
          updateState(site, (state) => {
            if (checked) {
              state.flat.kitchen.lights.ceiling.state = lightState.lightOn;
            } else {
              state.flat.kitchen.lights.ceiling.state = lightState.lightOff;
            }
            state.flat.kitchen.lights.ceiling.lastChange = new Date();
          });
        }}
      />
    </>
  )
})
