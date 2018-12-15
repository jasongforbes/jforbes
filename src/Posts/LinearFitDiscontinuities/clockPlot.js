import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  clock: {
    minHeight: '200px',
    minWidth: '200px',
    maxHeight: '300px',
    maxWidth: '300px',
    flexGrow: 1,
  },
  clockFace: {
    strokeWidth: '8px',
    stroke: theme.palette.primary.main,
    fill: '#D8E6E7',
  },
  clockDial: {
    strokeWidth: '2px',
    stroke: theme.palette.primary.main,
    fill: '#D8E6E7',
  },
  hour: {
    strokeWidth: '3px',
    stroke: theme.palette.primary.main,
  },
  minute: {
    strokeWidth: '4px',
    stroke: theme.palette.primary.main,
  },
  tick: {
    stroke: theme.palette.primary.main,
    strokeWidth: '1px',
  },
  shadow: {
    fill: 'rgba(0,0,0,0.2)',
  },
});

const Clock = ({ classes, time }) => {
  const hour = Math.floor(time);
  const minute = (time - hour) * 60;
  return (
    <svg viewBox="0 0 200 200" className={classes.clock}>
      <defs>
        <line
          id="tick"
          className={classes.tick}
          x1="100"
          y1="38"
          x2="100"
          y2="28"
          strokeLinecap="round"
        />
        <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feOffset in="blur" dx="2.5" dy="2.5" />
        </filter>
      </defs>
      <circle className={classes.shadow} cx="97" cy="100" r="85" filter="url(#innerShadow)" />
      <circle className={classes.clockFace} cx="100" cy="100" r="80" />
      <g id="ticks">
        <use href="#tick" transform="rotate(0 100 100)" />
        <use href="#tick" transform="rotate(30 100 100)" />
        <use href="#tick" transform="rotate(60 100 100)" />
        <use href="#tick" transform="rotate(90 100 100)" />
        <use href="#tick" transform="rotate(120 100 100)" />
        <use href="#tick" transform="rotate(150 100 100)" />
        <use href="#tick" transform="rotate(180 100 100)" />
        <use href="#tick" transform="rotate(210 100 100)" />
        <use href="#tick" transform="rotate(240 100 100)" />
        <use href="#tick" transform="rotate(270 100 100)" />
        <use href="#tick" transform="rotate(300 100 100)" />
        <use href="#tick" transform="rotate(330 100 100)" />
      </g>
      <circle className={classes.clockDial} cx="100" cy="100" r="4" />
      <g transform={`rotate(${(time / 12) * 360}, 100, 100)`}>
        <line x1="100" y1="96" x2="100" y2="55" className={classes.hour} />
      </g>
      <g transform={`rotate(${(minute / 60) * 360}, 100, 100)`}>
        <line x1="100" y1="96" x2="100" y2="35" className={classes.minute} />
      </g>
    </svg>
  );
};

Clock.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  time: PropTypes.number,
};

Clock.defaultProps = {
  time: 3.5,
};

export default withStyles(styles)(Clock);
