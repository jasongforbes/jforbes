import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';
import data from './data.json';

class TimeSeries extends Component {
  constructor(props) {
    super(props);
    this.ctx = React.createRef();
  }

  componentDidMount() {
    const { title } = this.props;
    this.plot = new Chart(this.ctx.current, {
      type: 'scatter',
      data: {
        datasets: [
          {
            data: this.getData(),
            pointRadius: 0,
            showLine: true,
            backgroundColor: 'rgba(255, 255, 255, 0)',
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
        title: {
          text: title,
          display: title !== '',
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Signal Strength',
              },
              ticks: {
                max: 0.06,
                min: -0.06,
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Sample',
              },
            },
          ],
        },
      },
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { bias, standardDeviation } = this.props;
    const { bias: prevBias, standardDeviation: prevStd } = prevProps;
    if (bias !== prevBias || standardDeviation !== prevStd) {
      return new Promise(() => {
        this.plot.update({ duration: 0 });
      });
    }
    return new Promise(() => {});
  }

  getData() {
    const { bias, standardDeviation } = this.props;
    return data.map((v, i) => ({
      x: i,
      y: (v + bias) * standardDeviation,
    }));
  }

  updateDataSet() {
    this.plot.data.datasets[0].data = this.getData();
    this.plot.update({ duration: 0 });
  }

  render() {
    return (
      <div>
        <canvas ref={this.ctx} width="200px" height="200px" />
      </div>
    );
  }
}

TimeSeries.propTypes = {
  bias: PropTypes.number,
  standardDeviation: PropTypes.number,
  title: PropTypes.string,
};

TimeSeries.defaultProps = {
  bias: 0,
  standardDeviation: 1,
  title: '',
};

export default TimeSeries;
