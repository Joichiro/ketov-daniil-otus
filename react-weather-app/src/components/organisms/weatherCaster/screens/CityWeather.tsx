import {Button, makeStyles} from '@material-ui/core';
import {
  ArrowBackIos as ArrowBackIosIcon,
  DeleteForever as DeleteForeverIcon
} from '@material-ui/icons';
import React, {useMemo, useState} from 'react';
import {PUBLIC_URL} from '../../../../constants';
import history from '../../../../history';
import {ICityWeatherSummary} from '../../../../hooks/useCityLiveWeatherSummary';
import useFavoriteCities from '../../../../hooks/useFavoriteCities';
import LiveCityForecast from '../../../molecules/LiveCityForecast';
import LiveWeatherSummary from '../../../molecules/LiveWeatherSummary';

interface ICityWeatherProps {
  label: string;
}

const useStyles = makeStyles({
  floatLeft: {float: 'left'},
  floatRight: {float: 'right'},
  root: {maxWidth: 750, margin: 'auto', textAlign: 'center'}
});

const CityWeather = ({label}: ICityWeatherProps) => {
  const {removeCity} = useFavoriteCities();
  const [realLabel, setRealLabel] = useState<string | undefined>();
  const classes = useStyles();

  return useMemo(() => {
    const remove = () => {
      if (realLabel) {
        removeCity(realLabel);
        redirectSilent();
      }
    };
    const onFound = (weather: ICityWeatherSummary) => {
      setRealLabel(weather.label);
    };
    const redirect = () => {
      history.push(`${PUBLIC_URL}/`);
    };
    const redirectSilent = () => {
      history.replace(`${PUBLIC_URL}/`);
    };

    return (
      <div className={classes.root}>
        <div>
          <Button variant="contained" className={classes.floatLeft} onClick={redirect}>
            <ArrowBackIosIcon />
          </Button>
          <Button
            className={classes.floatRight}
            variant="contained"
            color="secondary"
            onClick={remove}>
            <DeleteForeverIcon />
          </Button>
        </div>
        <LiveWeatherSummary
          label={label.replace(/\+/g, ' ')}
          onNotFound={redirectSilent}
          onFound={onFound}
        />
        {realLabel ? <LiveCityForecast label={realLabel} /> : null}
      </div>
    );
  }, [classes, label, realLabel, removeCity]);
};

export default CityWeather;
