import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  canvas: {
    minHeight: '250px',
    minWidth: '250px',
    maxHeight: '400px',
    maxWidth: '400px',
    flexGrow: 1.5,
  },
});

function linspace(start, inc, stop) {
  const arr = [];
  for (let i = start; i <= stop; i += inc) {
    arr.push(i);
  }
  return arr;
}

function getRandomNumber() {
  return 2 * Math.random() - 1;
}

const clockTime = (A, mu, b) => time => (A * time + mu * getRandomNumber() + b) % b;

class PhasePlot extends Component {
  constructor(props) {
    super(props);
    const { clockSpeed, maxTime, noise } = this.props;
    this.ctx = React.createRef();
    this.clockTime = clockTime(clockSpeed, noise, 12);
    this.labels = linspace(0, 4, maxTime);
    this.x = linspace(0, 0.25, maxTime);
  }

  componentDidMount() {
    const { showCurrentTime } = this.props;
    this.phasePlot = new Chart(this.ctx.current, {
      type: 'scatter',
      data: {
        datasets: [
          showCurrentTime
            ? {
                data: this.getCurrentTime(),
                backgroundColor: 'rgb(107,133,149)',
                borderColor: 'rgba(9, 51, 79, 1.0)',
                pointRadius: 8,
              }
            : {},
          {
            data: this.getDataSet(),
            pointRadius: 0,
            showLine: true,
            lineTension: 0,
            backgroundColor: '#D8E6E7',
            borderColor: '#9DC3C1',
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        elements: {
          line: {
            tension: 0,
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                callback: (label, index, labels) => `${label}:00`,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                min: 0,
                max: this.maxTime,
                stepSize: 6,
                callback: (label, index, labels) => `${label}:00`,
              },
            },
          ],
        },
      },
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { clockSpeed, currentTime, noise, showCurrentTime } = this.props;
    const { clockSpeed: prevSpeed, currentTime: prevTime, noise: prevNoise } = prevProps;
    if (showCurrentTime && currentTime !== prevTime) {
      this.phasePlot.data.datasets[0].data = this.getCurrentTime();
      if (currentTime % 12 < prevTime % 12) {
        this.phasePlot.update({ duration: 0 });
      } else {
        this.phasePlot.update();
      }
    }
    if (clockSpeed !== prevSpeed || noise !== prevNoise) {
      this.clockTime = clockTime(clockSpeed, noise, 12);
      this.phasePlot.data.datasets[1].data = this.getDataSet();
      this.phasePlot.update({ duration: 0 });
    }
  }

  getDataSet() {
    return this.x.map(this.clockTime).map((y, i) => ({
      x: this.x[i],
      y,
    }));
  }

  getCurrentTime() {
    const { currentTime } = this.props;
    return [{ x: currentTime, y: this.clockTime(currentTime) }];
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.canvas}>
        <canvas ref={this.ctx} width="200px" height="200px" />
      </div>
    );
  }
}

PhasePlot.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  clockSpeed: PropTypes.number,
  currentTime: PropTypes.number,
  maxTime: PropTypes.number,
  noise: PropTypes.number,
  showCurrentTime: PropTypes.bool,
};

PhasePlot.defaultProps = {
  clockSpeed: 1,
  currentTime: 4,
  maxTime: 36,
  noise: 0,
  showCurrentTime: true,
};

export default withStyles(styles)(PhasePlot);
