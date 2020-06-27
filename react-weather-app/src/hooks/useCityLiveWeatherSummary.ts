import {useSnackbar} from 'notistack';
import {useEffect, useState} from 'react';
import API, {IAPICityWeatherResponse} from '../api';
import CacheAPI from '../api/cache';
import {DATA_LIFE_TIME, makeDummyCity, UPDATE_RATE} from '../constants';
import updateTemp from '../util/updateTemp';
import useInterval from './useInterval';

export interface ICityWeatherSummary extends IAPICityWeatherResponse {
  loading: boolean;
}

const useCityLiveWeatherSummary = (label: string, onNotFound?: () => void) => {
  const [mounted, setMounted] = useState<boolean>(true);
  const [weather, setWeather] = useState<ICityWeatherSummary>(initState.bind(null, label));
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => setWeather(initState(weather.label)), [weather.label]);

  useInterval(() => {
    setWeather({...weather, loading: true});
    API.getCityWeatherByName(weather.label)
      .then(w => {
        if (mounted) {
          setWeather(updateTemp({...w, loading: false}));
        }
      })
      .catch(err => {
        if (mounted) {
          setWeather({...weather, loading: false});
          enqueueSnackbar(err.msg, {variant: 'error'});
        }
      });
  }, UPDATE_RATE);

  useEffect(() => {
    if (weather.loading) {
      API.getCityWeatherByName(label)
        .then(ww => {
          if (mounted) {
            setWeather(updateTemp({...ww, loading: false}));
          }
        })
        .catch(err => {
          if (
            (err.msg === 'city not found' || (err.msg === 'networkError' && weather.id === 0)) &&
            onNotFound &&
            mounted
          ) {
            onNotFound();
          }
        });
    }
    return () => setMounted(false);
  }, [label, mounted, onNotFound, weather.id, weather.loading]);
  return {weather};
};

const initState = (label: string): ICityWeatherSummary => {
  const savedWeather: IAPICityWeatherResponse = CacheAPI.getCityWeatherSummary(label);

  if (!savedWeather) {
    return {...makeDummyCity(), loading: true, label};
  }

  if (Date.now() - savedWeather.at > DATA_LIFE_TIME) {
    return updateTemp({...savedWeather, loading: true});
  }
  return updateTemp({...savedWeather, loading: false});
};

export default useCityLiveWeatherSummary;
