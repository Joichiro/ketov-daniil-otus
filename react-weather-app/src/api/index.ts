import axios, {AxiosError} from 'axios';
import {DATA_LIFE_TIME, TOKEN} from '../constants';
import CacheAPI from './cache';

export interface IAPICityWeatherResponse {
  humidity: number;
  id: number;
  label: string;
  name: string;
  temp: number;
  temp_max: number;
  temp_min: number;
  weatherIcon: string;
  iconALT: string;
  at: number;
}

export interface IAPICityForecastResponse {
  id: number;
  label: string;
  days: Array<{
    date: string;
    data: Array<{
      date: string;
      temp: number;
      humidity: number;
      weatherIcon: string;
      iconALT: string;
      wind: {
        speed: number;
        deg: number;
      };
      at: string;
    }>;
  }>;
  at: number;
}

export interface IAPIError {
  msg: string;
}

const API = {
  getCityForecast: async (label: string): Promise<IAPICityForecastResponse> => {
    try {
      const cache = CacheAPI.getCityForecast(label);
      if (cache && Date.now() - cache.at < DATA_LIFE_TIME) {
        return cache;
      }
      const data = (await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
        params: {
          APPID: TOKEN,
          units: 'metric',
          q: label,
          lang: 'ru'
        }
      })).data;
      const forecast = getCityForecastData(data);

      CacheAPI.setCityForecast(forecast);
      return forecast;
    } catch (e) {
      if (!e.response) {
        return CacheAPI.getCityForecast(label);
      }
      throw handleError(e);
    }
  },
  getCityWeatherByName: async (name: string): Promise<IAPICityWeatherResponse> => {
    try {
      const cache = CacheAPI.getCityWeatherSummary(name);
      if (cache && Date.now() - cache.at < DATA_LIFE_TIME) {
        return cache;
      }
      const data = (await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          APPID: TOKEN,
          q: name,
          units: 'metric',
          lang: 'ru'
        }
      })).data;
      const weatherSummaryData = getCityData(data);

      CacheAPI.setCityWeatherSummary(weatherSummaryData);
      await API.getCityForecast(weatherSummaryData.label);
      return weatherSummaryData;
    } catch (e) {
      throw handleError(e);
    }
  }
};

const handleError = (e: AxiosError<{code: string; message: string}>) => {
  if (!e.response) {
    return {msg: 'Ошибка сети'};
  }
  if (e.response && e.response.data && e.response.data.message === 'city not found') {
    return {msg: 'Город не найден'};
  }
  return {msg: 'Неизвестная ошибка'};
};

const getCityData = (data: any): IAPICityWeatherResponse => {
  return {
    at: Date.now(),
    humidity: data.main.humidity,
    iconALT: data.weather[0].description,
    id: data.id,
    label: `${data.name}, ${data.sys.country}`,
    name: data.name,
    temp: data.main.temp,
    temp_max: data.main.temp_max,
    temp_min: data.main.temp_min,
    weatherIcon: data.weather[0].icon
  };
};

const getCityForecastData = (data: any): IAPICityForecastResponse => {
  const days: IAPICityForecastResponse['days'] = [];

  data.list.map((elm: any) => {
    const dt = elm.dt_txt.split(' ');
    const day: string = dt[0];
    const dayData: IAPICityForecastResponse['days'][0]['data'][0] = {
      at: `${dt[1].split(':')[0]}:00`,
      date: day,
      humidity: elm.main.humidity,
      iconALT: elm.weather[0].description,
      temp: elm.main.temp,
      weatherIcon: elm.weather[0].icon,
      wind: {
        deg: elm.wind.deg,
        speed: elm.wind.speed
      }
    };
    if (days.length === 0 || day !== days[days.length - 1].date) {
      days.push({
        data: [dayData],
        date: day
      });
    } else {
      days[days.length - 1].data.push(dayData);
    }
    return elm;
  });
  return {
    at: Date.now(),
    days,
    id: data.city.id,
    label: `${data.city.name}, ${data.city.country}`
  };
};

export default API;
