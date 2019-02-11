import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { easing, tween } from 'popmotion';
import TimeSeries from './timeSeries';

const styles = theme => ({
  flex: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
    },
  },
  padding: {
    margin: '50px 0',
  },
});

class AnimatedPlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sample: 0,
    };
    this.startAnimation = this.startAnimation.bind(this);
    this.stopAnimation = null;
    this.tween = tween({
      from: { x: 0 },
      to: { x: 2250 },
      loop: Infinity,
      ease: easing.linear,
      duration: 30000,
    });
  }

  componentDidMount() {
    this.startAnimation();
  }

  componentWillUnmount() {
    if (this.stopAnimation) {
      this.stopAnimation();
    }
  }

  startAnimation() {
    this.stopAnimation = this.tween.start({
      update: v => {
        this.setState({ sample: v.x });
      },
      complete: () => {
        this.stopAnimation = null;
      },
    }).stop;
  }

  render() {
    const { classes } = this.props;
    const { sample } = this.state;
    return (
      <React.Fragment>
        <Grid container spacing={0} className={classes.padding}>
          <Grid item xs={12} md={6}>
            <TimeSeries
              windowStart={sample}
              windowSize={100}
              showWindow
              bias={0.03}
              standardDeviation={1 / 3}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TimeSeries maxValue={sample} standardize />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

AnimatedPlot.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

AnimatedPlot.defaultProps = {};

export default withStyles(styles)(AnimatedPlot);
