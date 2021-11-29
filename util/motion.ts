import { updateState } from "haah";
import { taints } from "./enums";

export function switchToggleMotionOverwrite(state: any, timeout: NodeJS.Timeout, secondsOff: number, secondsOn: number) {
  var overwriteTime = 0;
  updateState(state, (state) => {
    overwriteTime = state.overwrites.ceiling === taints.lightOn ? secondsOff : secondsOn;
    state.occupied = state.overwrites.ceiling === taints.lightOn ? false : state.occupied;
    state.overwrites.ceiling = state.overwrites.ceiling === taints.lightOn
      || (state.occupied && state.overwrites.ceiling === taints.none)
        ? taints.lightOff
        : taints.lightOn;
  });

  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    updateState(state, (state) => {
      state.overwrites.ceiling = taints.none;
    });
  }, 1000 * overwriteTime);
}