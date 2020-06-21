import {AppBar, makeStyles, Toolbar, Typography} from '@material-ui/core';
import React, {useMemo} from 'react';
import {drawerWidth} from '../../../constants';

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: '#5e35b1',
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
      width: `100%`
    }
  }
}));

const Header = () => {
  const classes = useStyles();

  return useMemo(() => {
    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h5" noWrap={true}>
            {'Weather app'}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }, [classes]);
};

export default Header;
