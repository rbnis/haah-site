import { site } from "../..";
import { updateState, webuiWidget } from 'haah';
import { lightState, occupancyState } from '../../../util/enums';

import React from 'react';
import { LabeledSwitch } from '../../../util/frontend';

webuiWidget('Hallway', () => {
  return (
    <>
      <LabeledSwitch
        label={"Lights"}
        checked={(site.flat.hallway.lights.ceiling.state === lightState.lightOn
              || (site.flat.hallway.lights.ceiling.state === lightState.inherit
                && site.flat.hallway.occupancy.state === occupancyState.occupied
                && !site.environment.daylight))}
        onChange={(checked) => {
          updateState(site, (state) => {
            if (checked) {
              state.flat.hallway.lights.ceiling.state = lightState.lightOn;
            } else {
              state.flat.hallway.lights.ceiling.state = lightState.lightOff;
            }
            state.flat.hallway.lights.ceiling.lastChange = new Date();
          });
        }}
      />
    </>
  );
});
