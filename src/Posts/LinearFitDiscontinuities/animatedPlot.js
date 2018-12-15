import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { easing, tween } from 'popmotion';
import Clock from './clockPlot';
import PhasePlot from './phasePlot';

const styles = theme => ({
  flex: {
    margin: '50px 0',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
    },
  },
});

class AnimatedPlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
    };
    this.tween = tween({
      from: { x: 0 },
      to: { x: 35.99 },
      loop: Infinity,
      ease: easing.linear,
      duration: 30000,
    });
  }

  componentDidMount() {
    this.tween = this.tween.start(v => {
      this.setState({ time: v.x });
    });
  }

  componentWillUnmount() {
    this.tween.stop();
  }

  render() {
    const { classes } = this.props;
    const { time } = this.state;
    return (
      <div className={classes.flex}>
        <Clock time={time} />
        <PhasePlot currentTime={time} />
      </div>
    );
  }
}

AnimatedPlot.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

AnimatedPlot.defaultProps = {};

export default withStyles(styles)(AnimatedPlot);
