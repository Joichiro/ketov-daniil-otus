import {makeStyles, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import React, {useMemo} from 'react';
import {IAPICityForecastResponse} from '../../../api';
import {getIMG} from '../../../weatherIcons';

interface ICityForecastProps {
  forecast: IAPICityForecastResponse['days'][0]['data'];
}

const useStyles = makeStyles({
  arrow: {display: 'inline-block', fontSize: 20, marginLeft: 3},
  table: {display: 'block', maxWidth: 'calc(100vw - 48px)', overflow: 'auto'},
  weatherIcon: {width: 75, margin: 'auto', background: '#c7c7c7', marginTop: 7, borderRadius: 50}
});

const CityForecast = ({forecast}: ICityForecastProps) => {
  const classes = useStyles();

  return useMemo(
    () => (
      <Table className={classes.table} aria-label={'Прогноз погоды'}>
        <TableHead>
          <TableRow>
            <TableCell>{'Время'}</TableCell>
            <TableCell align="right">{'Температура'}</TableCell>
            <TableCell align="right">{'Облачность'}</TableCell>
            <TableCell align="right">{'Влажность воздуха'}</TableCell>
            <TableCell align="right">{'Скорость ветра'}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {forecast.map(row => (
            <TableRow key={row.date + row.at}>
              <TableCell component="th" scope="row">
                {row.at}
              </TableCell>
              <TableCell align="right">{row.temp}°</TableCell>
              <TableCell align="right">
                <img
                  alt={row.iconALT}
                  className={classes.weatherIcon}
                  src={getIMG(row.weatherIcon)}
                />
              </TableCell>
              <TableCell align="right">{row.humidity}%</TableCell>
              <TableCell align="right">
                {`${((row.wind.speed / 1000) * 360).toFixed(1)} М/C `}
                <div
                  className={classes.arrow}
                  style={{transform: `rotate(${row.wind.deg + 180}deg)`}}>
                  ↑
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ),
    [classes, forecast]
  );
};

export default CityForecast;
