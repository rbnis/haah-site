import { state, updateState, timeSensor, weatherSensor } from 'haah';

import { secret } from '../secrets';
import { isTimeBetween } from '../util/time';

export const environment = state('environment', {
  time: new Date(),
  weather: null,
  daytime: false,
  daylight: false,
});

timeSensor((time) => {
  updateState(environment, (environment) => {
    environment.time = time;
  });

  updateState(environment, (environment) =>{
    environment.daytime = isDayTime(time);
  });
});

weatherSensor(secret.openWeatherMapApiKey, secret.location.lat, secret.location.lon, (weather) => {
  updateState(environment, (environment) => {
    environment.weather = weather;
  });

  updateState(environment, (environment) => {
    environment.daylight = isDaylight(weather.today.sunriseTime, weather.today.sunsetTime, environment.time);
  });
});

function isDaylight(sunrise: Date, sunset: Date, time: Date) {
  sunrise.setTime(sunrise.getTime() + (2 * 60 * 60 * 1000));
  sunset.setTime(sunset.getTime() + (-1 * 60 * 60 * 1000));

  return isTimeBetween(
    sunrise,
    sunset,
    time,
  );
}

function isDayTime(time: Date) {
  return isTimeBetween(
    new Date(new Date().setHours(6, 0, 0, 0)),
    new Date(new Date().setHours(23, 0, 0, 0)),
    time,
  );
}
