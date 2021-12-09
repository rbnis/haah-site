export function interpolate(value: number, state0: any, state1: any): any {
  return Object.fromEntries(
    Object.keys(state0).map((k) => [
      k,
      typeof state0[k] === 'number'
        ? Math.round(state0[k] * (1 - value) + state1[k] * value)
        : interpolate(value, state0[k], state1[k]),
    ]),
  );
}

export function rgbObjectFromArray([r, g, b]: number[]) {
  return { r, g, b };
}

export function clamp(min: number, max: number) {
  return (value: number) => Math.max(min, Math.min(value, max));
}

export function isTimeBetween(
  from: Date | string,
  to: Date | string,
  time: Date | string,
) {
  from = new Date(from);
  to = new Date(to);
  time = new Date(time);

  return from < time && time < to;
}
