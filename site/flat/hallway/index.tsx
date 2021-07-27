import { state, updateState, webuiWidget } from 'haah';
import { LabeledSwitch } from '../../../util/frontend';
import React from 'react';

import { taints } from '../../../util/enums';
import { environment } from '../../environment';

export const hallway = state('hallway', {
  occupied: false,
  overwrite: taints.none,
});

let overwriteTimeout: NodeJS.Timeout;
webuiWidget('Hallway', () => {
  return (
    <>
      <LabeledSwitch
        label={"Lights"}
        checked={(hallway.overwrite == taints.lightOn || (hallway.occupied && !environment.daylight))}
        onChange={(checked) => {
          updateState(hallway, (state) => {
            state.overwrite = checked ? taints.lightOn : taints.lightOff;
          });

          if (overwriteTimeout) {
            clearTimeout(overwriteTimeout);
          }
          overwriteTimeout = setTimeout(() => {
            updateState(hallway, (state) => {
              state.overwrite = taints.none;
            });
          }, 1000 * (checked ? 60 * 30 : 5));
        }}
      />
    </>
  );
});
