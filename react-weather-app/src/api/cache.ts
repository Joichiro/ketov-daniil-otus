import {IAPICityForecastResponse, IAPICityWeatherResponse} from './index';

const CacheAPI = {
  getCityForecast: (label: string): IAPICityForecastResponse =>
    JSON.parse(localStorage.getItem(`cache::CityForecast::${label}`) || 'null'),
  getCityWeatherSummary: (label: string): IAPICityWeatherResponse =>
    JSON.parse(localStorage.getItem(`cache::WeatherSummary::${label}`) || 'null'),
  getFavoriteCities: (): string[] =>
    JSON.parse(localStorage.getItem('cache::FavoriteCities') || '["Perm, RU"]'),
  setCityForecast: (data: IAPICityForecastResponse) =>
    localStorage.setItem(`cache::CityForecast::${data.label}`, JSON.stringify(data)),
  setCityWeatherSummary: (data: IAPICityWeatherResponse) =>
    localStorage.setItem(`cache::WeatherSummary::${data.label}`, JSON.stringify(data)),
  setFavoriteCities: (cities: string[]) =>
    localStorage.setItem('cache::FavoriteCities', JSON.stringify(cities))
};

export default CacheAPI;
