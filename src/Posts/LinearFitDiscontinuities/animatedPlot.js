import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { easing, tween } from 'popmotion';
import Clock from './clockPlot';
import PhasePlot from './phasePlot';

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
      time: 0,
      isAnimating: false,
    };
    this.startAnimation = this.startAnimation.bind(this);
    this.stopAnimation = null;
    this.tween = tween({
      from: { x: 0 },
      to: { x: 35.99 },
      ease: easing.linear,
      duration: 30000,
    });
  }

  componentWillUnmount() {
    if (this.stopAnimation) {
      this.stopAnimation();
    }
  }

  startAnimation() {
    this.setState({ isAnimating: true });
    this.stopAnimation = this.tween.start({
      update: v => {
        this.setState({ time: v.x });
      },
      complete: () => {
        this.stopAnimation = null;
        this.setState({ isAnimating: false });
      },
    }).stop;
  }

  render() {
    const { classes } = this.props;
    const { isAnimating, time } = this.state;
    return (
      <React.Fragment>
        <Grid container spacing={0} className={classes.padding}>
          <Grid item xs={12} sm={5} md={6} xl={7}>
            <div className={classes.flex}>
              <Button
                variant="contained"
                color="primary"
                disabled={isAnimating}
                onClick={this.startAnimation}
              >
                Start
              </Button>

              <Clock time={time} />
            </div>
          </Grid>
          <Grid item xs={12} sm={7} md={6} xl={5}>
            <PhasePlot currentTime={time} />
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
