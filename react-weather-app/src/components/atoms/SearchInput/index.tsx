import {
  CircularProgress,
  createStyles,
  Divider,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
  Theme
} from '@material-ui/core';
import {Clear as ClearIcon, Search as SearchIcon} from '@material-ui/icons';
import React, {CSSProperties, KeyboardEvent, useMemo} from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider: {
      height: 28,
      margin: 4
    },
    iconButton: {
      padding: 10
    },
    input: {
      flex: 1,
      marginLeft: theme.spacing(1)
    },
    root: {
      alignItems: 'center',
      display: 'flex',
      padding: '2px 4px'
    }
  })
);

interface ISearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  style?: CSSProperties;
  loading?: boolean;
}

const SearchInput = ({
  loading,
  placeholder,
  onChange,
  onSearch,
  value,
  style
}: ISearchInputProps) => {
  const classes = useStyles();

  return useMemo(() => {
    const keyPress = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') {
        onSearch(value);
        e.preventDefault();
      }
    };

    return (
      <Paper component="form" className={classes.root} style={style}>
        <InputBase
          className={classes.input}
          placeholder={placeholder}
          inputProps={{'aria-label': placeholder}}
          value={value}
          onChange={event => onChange(event.target.value)}
          onKeyPress={keyPress}
        />
        <IconButton
          color="secondary"
          className={classes.iconButton}
          aria-label={'Clear'}
          onClick={onChange.bind(null, '')}>
          <ClearIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          className={classes.iconButton}
          aria-label={'Search'}
          onClick={onSearch.bind(null, value)}>
          {loading ? <CircularProgress size={24} thickness={5} /> : <SearchIcon />}
        </IconButton>
      </Paper>
    );
  }, [classes, loading, onChange, onSearch, placeholder, style, value]);
};

export default SearchInput;
