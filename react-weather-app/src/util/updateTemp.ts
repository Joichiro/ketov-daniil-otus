import {ICityWeatherSummary} from '../hooks/useCityLiveWeatherSummary';

const updateTemp = (w: ICityWeatherSummary): ICityWeatherSummary => {
  return {
    ...w,
    temp: w.temp,
    temp_max: w.temp_max,
    temp_min: w.temp_min
  };
};

export default updateTemp;
