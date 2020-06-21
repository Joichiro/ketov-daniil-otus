import {useSnackbar} from 'notistack';
import {useEffect, useState} from 'react';
import API, {IAPICityForecastResponse, IAPIError} from '../api';
import {UPDATE_RATE} from '../constants';
import useInterval from './useInterval';

const useCityForecast = (label: string) => {
  const [forecast, setForecast] = useState<IAPICityForecastResponse['days'][0]['data']>([]);
  const [days, setDays] = useState<string[]>([]);
  const [forecastData, setForecastData] = useState<IAPICityForecastResponse | undefined>();
  const [selectedDay, setSelectedDay] = useState<string | undefined>();
  const {enqueueSnackbar} = useSnackbar();
  const update = () => {
    API.getCityForecast(label)
      .then(data => {
        setForecastData(data);
        setDays(data.days.map(day => day.date));
        if (!selectedDay) {
          setSelectedDay(data.days[0].date);
        }
      })
      .catch((err: IAPIError) => enqueueSnackbar(err.msg, {variant: 'error'}));
  };
  useEffect(() => {
    if (!forecastData || !selectedDay) {
      return;
    }
    forecastData.days.find(day => {
      if (day.date !== selectedDay) {
        return false;
      }
      setForecast(
        day.data.map(elm => ({
          ...elm
        }))
      );
      return true;
    });
  }, [selectedDay, forecastData]);
  useInterval(update, UPDATE_RATE);
  useEffect(update, []);
  return {
    days,
    forecast,
    selectedDay,
    setSelectedDay
  };
};

export default useCityForecast;
