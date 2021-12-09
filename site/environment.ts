import { site } from '.';
import { updateState, timeSensor, weatherSensor } from 'haah';
import { secret } from '../secrets';
import { isTimeBetween } from '../util/utils';


timeSensor((time) => {
  updateState(site, (site) => {
    site.environment.time = time;
  });

  updateState(site, (site) =>{
    site.environment.daytime = isDayTime(time);
  });
});

weatherSensor(secret.openWeatherMapApiKey, secret.location.lat, secret.location.lon, (weather) => {
  updateState(site, (site) => {
    site.environment.weather = weather;
  });

  updateState(site, (site) => {
    site.environment.daylight = isDaylight(weather.today.sunriseTime, weather.today.sunsetTime, site.environment.time);
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
