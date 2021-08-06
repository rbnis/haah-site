import { state, updateState, webuiWidget } from 'haah';
import { LabeledSwitch } from '../../../util/frontend';
import React from 'react';

import { taints } from '../../../util/enums';
import { environment } from '../../environment';

export const hallway = state('hallway', {
  occupied: false,
  overwrites: {
    ceiling: taints.none,
  },
});

let overwriteTimeout: NodeJS.Timeout;
webuiWidget('Hallway', () => {
  return (
    <>
      <LabeledSwitch
        label={"Lights"}
        checked={(hallway.overwrites.ceiling == taints.lightOn || (hallway.occupied && !environment.daylight && hallway.overwrites.ceiling !== taints.lightOff))}
        onChange={(checked) => {
          updateState(hallway, (state) => {
            state.overwrites.ceiling = checked ? taints.lightOn : taints.lightOff;
          });

          if (overwriteTimeout) {
            clearTimeout(overwriteTimeout);
          }
          overwriteTimeout = setTimeout(() => {
            updateState(hallway, (state) => {
              state.overwrites.ceiling = taints.none;
            });
          }, 1000 * 60 * (checked ? 30 : 3));
        }}
      />
    </>
  );
});
