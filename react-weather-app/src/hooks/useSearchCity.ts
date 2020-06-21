import {useState} from 'react';
import API, {IAPICityWeatherResponse} from '../api';

const useSearchCity = (onFound: (city: IAPICityWeatherResponse) => void) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState();

  const search = () => {
    if (loading || !value || value === '') {
      return;
    }
    setLoading(true);
    API.getCityWeatherByName(value)
      .then(res => {
        onFound(res);
        setValue('');
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError(err.msg);
      });
  };
  return {
    error,
    loading,
    search,
    setValue,
    value
  };
};

export default useSearchCity;
