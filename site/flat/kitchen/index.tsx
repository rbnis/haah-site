import { state, updateState, webuiWidget } from 'haah';
import { LabeledSwitch } from '../../../util/frontend';
import React from 'react';

import { taints } from '../../../util/enums';
import { environment } from '../../environment';

export const kitchen = state('kitchen', {
  occupied: false,
  overwrite: taints.none,
});

let overwriteTimeout: NodeJS.Timeout;
webuiWidget('Kitchen', () => {
  return (
    <>
      <LabeledSwitch
        label={"Lights"}
        checked={(kitchen.overwrite == taints.lightOn || (kitchen.occupied && !environment.daylight))}
        onChange={(checked) => {
          updateState(kitchen, (state) => {
            state.overwrite = checked ? taints.lightOn : taints.lightOff;
          });

          if (overwriteTimeout) {
            clearTimeout(overwriteTimeout);
          }
          overwriteTimeout = setTimeout(() => {
            updateState(kitchen, (state) => {
              state.overwrite = taints.none;
            });
          }, 1000 * (checked ? 60 * 60 : 5));
        }}
      />
    </>
  )
})
