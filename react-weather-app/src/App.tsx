import {CssBaseline, makeStyles, ThemeProvider} from '@material-ui/core';
import {SnackbarProvider} from 'notistack';
import React from 'react';
import {Router} from 'react-router-dom';
import Header from './components/atoms/Header';
import WeatherCaster from './components/organisms/weatherCaster';
import history from './history';
import {darkTheme} from './themes';

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  root: {
    display: 'flex'
  },
  toolbar: theme.mixins.toolbar
}));

const App = () => {
  const classes = useStyles();

  return (
    <Router history={history}>
      <ThemeProvider theme={darkTheme}>
        <SnackbarProvider maxSnack={3}>
          <div className={classes.root}>
            <CssBaseline />
            <Header />
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <WeatherCaster />
            </main>
          </div>
        </SnackbarProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
