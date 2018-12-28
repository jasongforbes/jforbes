import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/lab/Slider';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  padding: {
    margin: '50px 0px',
  },
  slider: {
    touchAction: 'none',
    padding: '0px 6px',
    minWidth: '200px',
  },
  sliderWithLabel: {
    minWidth: '200px',
    padding: '30px 30px 0px 0px',
    [theme.breakpoints.down('xs')]: {
      padding: '0 20px 30px 62px',
    },
  },
  sliders: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      margin: '0px 0px 45px',
      overflowX: 'hidden',
    },
    justifyContent: 'center',
    flexDirection: 'column',
  },
  thumb: {
    width: '18px',
    height: '18px',
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
  <Grid container spacing={0} className={classes.padding}>
    <Grid item xs={12} sm={5} md={6} xl={7} className={classes.sliders}>
      <div className={classes.sliderWithLabel}>
        <Typography variant="body1">Clock Speed</Typography>
        <Slider
          aria-label="Clock speed slider"
          className={classes.slider}
          classes={{ thumb: classes.thumb }}
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
          classes={{ thumb: classes.thumb }}
          onChange={handleNoiseChange}
          value={noise}
          min={0}
          max={3}
        />
      </div>
    </Grid>
    <Grid item xs={12} sm={7} md={6} xl={5}>
      {React.cloneElement(children, { clockSpeed, noise })}
    </Grid>
  </Grid>
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
