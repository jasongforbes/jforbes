import * as tf from '@tensorflow/tfjs';

function getSpectralData(speed, noise, rollover, sampleRate) {
  return tf.tidy(() => {
    const mu = noise;
    // First, lets generate test-data
    const A = tf.scalar(speed);
    const b = tf.scalar(rollover);
    const x = tf.range(0, 10 * rollover, sampleRate);
    const yTilde = tf.mod(tf.add(tf.mul(A, x), tf.randomNormal([x.size], 0, mu)), b);
    // Next, we want to transform the data into an appropriate form
    const c = tf.scalar((2 * Math.PI) / rollover);
    const exp = tf.mul(c, yTilde);
    const f = tf.complex(tf.cos(exp), tf.sin(exp));
    // Using the FFT, the sampled data can be converted to the frequency domain
    return tf.spectral.fft(f);
  });
}

function findSpike(F, sampleRate, rollover) {
  return tf.tidy(() => {
    const c = tf.scalar((2 * Math.PI) / rollover);
    const max = tf.argMax(tf.abs(F));
    const freqBin = (2 * Math.PI) / (sampleRate * F.size);
    const spike = tf.mul(freqBin, max.toFloat());
    // Lastly, undo the previous transformation
    return tf.div(spike, c);
  });
}

export { getSpectralData, findSpike };
