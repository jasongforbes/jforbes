import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from '@material-ui/lab/Slider';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  flex: {
    margin: '50px 0',
    display: 'flex',
    justifyContent: 'space-evenly',
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    },
  },
  slider: {
    touchAction: 'none',
    padding: '0px 6px',
    minWidth: '200px',
  },
  sliderWithLabel: {
    minWidth: '200px',
    margin: '30px 30px 0px 0px',
    [theme.breakpoints.down('xs')]: {
      margin: '15px 20px 15px 50px',
    },
  },
  sliders: {
    display: 'flex',
    flexGrow: 2,
    [theme.breakpoints.down('xs')]: {
      margin: '0px 0px 45px',
      overflowX: 'hidden',
    },
    justifyContent: 'center',
    flexDirection: 'column',
  },
});

const CustomizablePhasePlot = ({
  children,
  classes,
  clockSpeed,
  handleSpeedChange,
  handleNoiseChange,
  noise,
}) => (
  <div className={classes.flex}>
    <div className={classes.sliders}>
      <div className={classes.sliderWithLabel}>
        <Typography variant="body1">Clock Speed</Typography>
        <Slider
          aria-label="Clock speed slider"
          className={classes.slider}
          onChange={handleSpeedChange}
          value={clockSpeed}
          min={0.1}
          max={4}
        />
      </div>
      <div className={classes.sliderWithLabel}>
        <Typography variant="body1">Noise</Typography>
        <Slider
          aria-label="Noise slider"
          className={classes.slider}
          onChange={handleNoiseChange}
          value={noise}
          min={0}
          max={3}
        />
      </div>
    </div>
    {React.cloneElement(children, { clockSpeed, noise })}
  </div>
);

CustomizablePhasePlot.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  clockSpeed: PropTypes.number,
  handleSpeedChange: PropTypes.func,
  handleNoiseChange: PropTypes.func,
  noise: PropTypes.number,
};

CustomizablePhasePlot.defaultProps = {
  clockSpeed: 1,
  handleSpeedChange: () => {},
  handleNoiseChange: () => {},
  noise: 0,
};

const mapStateToProps = state => ({
  ...state.linearFitPost,
});

const mapDispatchToProps = dispatch => ({
  handleSpeedChange: (e, val) =>
    dispatch({
      type: 'SPEED_CHANGE',
      value: val,
    }),
  handleNoiseChange: (e, val) =>
    dispatch({
      type: 'NOISE_CHANGE',
      value: val,
    }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CustomizablePhasePlot));
