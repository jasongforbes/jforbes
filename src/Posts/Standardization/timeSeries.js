import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';
import 'chartjs-plugin-annotation';
import data from './data.json';
import dataStandardize from './data.standardize.json';

class TimeSeries extends Component {
  constructor(props) {
    super(props);
    this.ctx = React.createRef();
  }

  componentDidMount() {
    const {
      bias,
      title,
      standardize,
      showWindow,
      standardDeviation,
      windowStart,
      windowSize,
    } = this.props;
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
        annotation: {
          annotations: showWindow
            ? [
                {
                  type: 'box',
                  drawTime: 'beforeDatasetsDraw',
                  yScaleID: 'y-axis-1',
                  xScaleID: 'x-axis-1',
                  yMin: bias * standardDeviation + 0.1,
                  yMax: bias * standardDeviation - 0.1,
                  xMin: windowStart,
                  xMax: windowSize,
                  backgroundColor: 'rgba(125, 66, 244, 0.2)',
                },
              ]
            : [],
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
                max: standardize ? 4 : 0.06,
                min: standardize ? -4 : -0.06,
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Sample',
              },
              ticks: {
                max: 2250,
                stepSize: 750,
                min: 0,
              },
            },
          ],
        },
      },
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { bias, standardDeviation, windowStart, maxValue } = this.props;
    const {
      bias: prevBias,
      standardDeviation: prevStd,
      windowStart: prevStart,
      maxValue: prevMax,
    } = prevProps;
    if (
      bias !== prevBias ||
      standardDeviation !== prevStd ||
      windowStart !== prevStart ||
      maxValue !== prevMax
    ) {
      return new Promise(() => {
        this.updateDataSet();
        this.plot.update({ duration: 0 });
      });
    }
    return new Promise(() => {});
  }

  getData() {
    const { bias, maxValue, standardDeviation, standardize } = this.props;
    const toReturn = standardize ? dataStandardize : data;
    return toReturn
      .filter((v, i) => i <= maxValue)
      .map((v, i) => ({
        x: i,
        y: (v + bias) * standardDeviation,
      }));
  }

  updateDataSet() {
    const { windowStart, windowSize, showWindow } = this.props;
    this.plot.data.datasets[0].data = this.getData();
    if (showWindow) {
      this.plot.options.annotation.annotations[0].xMin = windowStart;
      this.plot.options.annotation.annotations[0].xMax = windowStart + windowSize;
    }
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
  windowStart: PropTypes.number,
  windowSize: PropTypes.number,
  showWindow: PropTypes.bool,
  maxValue: PropTypes.number,
  standardize: PropTypes.bool,
};

TimeSeries.defaultProps = {
  bias: 0,
  standardDeviation: 1,
  title: '',
  windowStart: 0,
  windowSize: 100,
  showWindow: false,
  maxValue: Infinity,
  standardize: false,
};

export default TimeSeries;
