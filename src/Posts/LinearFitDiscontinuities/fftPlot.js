import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';
import * as tf from '@tensorflow/tfjs';
import { getSpectralData } from './linearFit';

class FFTPlot extends Component {
  constructor(props) {
    super(props);
    this.ctx = React.createRef();
  }

  componentDidMount() {
    this.fftPlot = new Chart(this.ctx.current, {
      type: 'scatter',
      data: {
        datasets: [
          {
            data: [],
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
                max: 500,
                min: 0,
                stepSize: 50,
              },
              scaleLabel: {
                display: true,
                labelString: 'FFT Amplitude',
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                min: 0,
                max: 5,
                stepSize: 0.5,
              },
              scaleLabel: {
                display: true,
                labelString: 'Cock Speed',
              },
            },
          ],
        },
      },
    });
    setTimeout(() => this.updateDataSet(), 3000);
  }

  componentDidUpdate(prevProps, prevState) {
    const { clockSpeed, noise } = this.props;
    const { clockSpeed: prevSpeed, noise: prevNoise } = prevProps;
    if (clockSpeed !== prevSpeed || noise !== prevNoise) {
      return new Promise(() => {
        this.updateDataSet();
      });
    }
    return new Promise(() => {});
  }

  updateDataSet() {
    const { clockSpeed, noise } = this.props;
    const sampleRate = 0.25;
    const fft = getSpectralData(clockSpeed, noise, 12, sampleRate)
      .abs()
      .data()
      .then(data => {
        tf.tidy(() => {
          this.fftPlot.data.datasets[0].data = Array.prototype.slice
            .call(
              tf
                .range(0, data.length)
                .mul(tf.scalar((2 * Math.PI) / (sampleRate * data.length)))
                .div(tf.scalar((2 * Math.PI) / 12))
                .dataSync()
            )
            .map((e, i) => ({
              x: e,
              y: data[i],
            }));

          this.fftPlot.update({ duration: 0 });
        });
      })
      .then(() => {
        tf.dispose(fft);
      });
  }

  render() {
    return (
      <div>
        <canvas ref={this.ctx} width="200px" height="200px" />
      </div>
    );
  }
}

FFTPlot.propTypes = {
  clockSpeed: PropTypes.number,
  noise: PropTypes.number,
};

FFTPlot.defaultProps = {
  clockSpeed: 1,
  noise: 0,
};

export default FFTPlot;
