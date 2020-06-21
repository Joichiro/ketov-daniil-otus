import {makeStyles} from '@material-ui/core';
import React, {useMemo} from 'react';
import {PUBLIC_URL} from '../../../../constants';
import history from '../../../../history';
import useFavoriteCities from '../../../../hooks/useFavoriteCities';
import LiveWeatherSummary from '../../../molecules/LiveWeatherSummary';
import SearchCity from '../../../molecules/SearchCity';

const useStyles = makeStyles({
  root: {maxWidth: 750, margin: 'auto', textAlign: 'center'}
});

const WeatherCasterMainScreen = () => {
  const {cities, addCity} = useFavoriteCities();
  const redirect = (label: string) => () => {
    history.push(`${PUBLIC_URL}/${label.replace(/ /g, '+')}`);
  };
  const classes = useStyles();

  return useMemo(
    () => (
      <div className={classes.root}>
        <SearchCity
          onFound={city => {
            addCity(city.label);
            try {
              if (document.activeElement) {
                (document.activeElement as HTMLElement).blur();
              }
            } catch (e) {
              console.error(e);
            }
          }}
        />
        {cities.map(city => (
          <LiveWeatherSummary key={city} label={city} onClick={redirect(city)} />
        ))}
      </div>
    ),
    [addCity, cities, classes]
  );
};

export default WeatherCasterMainScreen;
