import React, {useEffect, useMemo} from 'react';
import useCityLiveWeatherSummary, {
  ICityWeatherSummary
} from '../../../hooks/useCityLiveWeatherSummary';
import CityWeatherSummary from '../../atoms/CityWeatherSummary';

interface ILiveWeatherSummaryProp {
  label: string;
  onNotFound?: () => void;
  onClick?: () => void;
  onFound?: (weather: ICityWeatherSummary) => void;
}

const LiveWeatherSummary = ({label, onNotFound, onClick, onFound}: ILiveWeatherSummaryProp) => {
  const {weather} = useCityLiveWeatherSummary(label, onNotFound);

  useEffect(() => {
    if (onFound) {
      onFound(weather);
    }
  }, [onFound, weather]);
  return useMemo(
    () => (
      <CityWeatherSummary
        humidity={weather.humidity}
        label={weather.label}
        temp={weather.temp}
        temp_max={weather.temp_max}
        temp_min={weather.temp_min}
        weatherIcon={weather.weatherIcon}
        updating={weather.loading}
        iconALT={weather.iconALT}
        onClick={onClick}
      />
    ),
    [onClick, weather]
  );
};

export default LiveWeatherSummary;
