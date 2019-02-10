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

window.addEventListener('touchstart', () => {}, { passive: false });

const CustomizablePhasePlot = ({
  children,
  classes,
  bias,
  handleSpeedChange,
  handleNoiseChange,
  standardDeviation,
}) => (
  <Grid container spacing={0} className={classes.padding}>
    <Grid item xs={12} sm={5} md={6} xl={7} className={classes.sliders}>
      <div className={classes.sliderWithLabel}>
        <Typography variant="body1">Bias</Typography>
        <Slider
          aria-label="Bias Slider"
          className={classes.slider}
          classes={{ thumb: classes.thumb }}
          onChange={handleSpeedChange}
          onTouchStart={e => e.preventDefault()}
          value={bias}
          min={0}
          max={0.05}
        />
      </div>
      <div className={classes.sliderWithLabel}>
        <Typography variant="body1">Standard Deviation</Typography>
        <Slider
          aria-label="Std slider"
          className={classes.slider}
          classes={{ thumb: classes.thumb }}
          onChange={handleNoiseChange}
          value={standardDeviation}
          min={0.1}
          max={2}
          onTouchStart={e => e.preventDefault()}
        />
      </div>
    </Grid>
    <Grid item xs={12} sm={7} md={6} xl={5}>
      {React.cloneElement(children, { bias, standardDeviation })}
    </Grid>
  </Grid>
);

CustomizablePhasePlot.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  bias: PropTypes.number,
  handleSpeedChange: PropTypes.func,
  handleNoiseChange: PropTypes.func,
  standardDeviation: PropTypes.number,
};

CustomizablePhasePlot.defaultProps = {
  bias: 0,
  handleSpeedChange: () => {},
  handleNoiseChange: () => {},
  standardDeviation: 1,
};

const mapStateToProps = state => ({
  ...state.standardizationPost,
});

const mapDispatchToProps = dispatch => ({
  handleSpeedChange: (e, val) =>
    dispatch({
      type: 'BIAS_CHANGE',
      value: val,
    }),
  handleNoiseChange: (e, val) =>
    dispatch({
      type: 'STD_CHANGE',
      value: val,
    }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CustomizablePhasePlot));
