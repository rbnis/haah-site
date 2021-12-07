import { updateState } from "haah";
import { environment } from '../site/environment';
import { taints } from "./enums";

export function switchToggleMotionOverwrite(state: any, timeout: NodeJS.Timeout, secondsOff: number, secondsOn: number) {
  var overwriteTime = 0;
  var currentlyOn = true;

  updateState(state, (state) => {
    if (state.overwrites.ceiling === taints.lightOff) currentlyOn = false;
    else if (state.overwrites.ceiling === taints.lightOn) currentlyOn = true;
    else if (!state.occupied ) currentlyOn = false;
    else if (environment.daylight) currentlyOn = false;

    overwriteTime = currentlyOn ? secondsOff : secondsOn;
    state.occupied = currentlyOn ? false : state.occupied;
    state.overwrites.ceiling = currentlyOn ? taints.lightOff : taints.lightOn;
  });

  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    updateState(state, (state) => {
      state.overwrites.ceiling = taints.none;
    });
  }, 1000 * overwriteTime);
}