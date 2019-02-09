import React from 'react';
import PropTypes from 'prop-types';
import { InlineMath, BlockMath } from 'react-katex';
import { Helmet } from 'react-helmet';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Highlight from '../../Highlight';
import posts from '../posts.json';
import styles from '../style';
import AnimatedPlot from './animatedPlot';
import CustomizablePlot from './customizablePlot';
import PhasePlot from './phasePlot';
import FFTPlot from './fftPlot';
import 'highlight.js/styles/ocean.css';

const postData = slug => posts.filter(post => post.slug === slug);

const Post = ({ classes, match }) => {
  const { date, title, summary } = postData(match.url)[0];
  return (
    <React.Fragment>
      <Helmet>
        <title>{`${title} - Jason Forbes`}</title>
        <meta name="description" content={summary} />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/katex.min.css"
          integrity="sha384-9eLZqc9ds8eNjO3TmqPeYcDj8n+Qfa4nuSiGYa6DjLNcv9BtN69ZIulL9+8CqC9Y"
          crossOrigin="anonymous"
        />
      </Helmet>
      <React.Fragment>
        <Typography variant="h3">{title}</Typography>
        <Typography variant="subtitle1">{date}</Typography>
        <Typography variant="body1">
          How could you estimate a noisy linear function if it contained regular discontinuities?
          The most natural place where this can come up is when the range of the function
          &quot;wraps around&quot;. Angles and rotations are natural examples of this, as they vary
          between 0&deg; and 360&deg;. For myself, I came upon this problem when trying to estimate
          the linear rate of change for an angle.
        </Typography>
        <Typography variant="body1">
          For an example, take a standard wall-clock. The hour hand of a wall-clock will sweep from
          0:00 to 11:59 in the course of 12 hours. If you plot the position of the hour-hand, you
          will notice a &quot;jump&quot; from 11:59 to 0:00 as the hand sweeps across the 12th hour.
        </Typography>
        <AnimatedPlot />
        <Typography variant="body1">
          Assume that you are in an room with only a clock and a light-bulb. You know that the clock
          is malfunctioning. It may be running either faster or slower than normal and you are to
          determine by how much. To aid in this, the light-bulb will blink once a minute. During
          this time, you can record the time shown on the wall-clock. To make this harder, the clock
          is far away. And only has an hour-hand. Maybe there are no hour or minute markings on the
          clock face. Each minute, the best you can do is guess the time shown on the clock. We can
          model this uncertainty as noise. Notice how the noise has an out-sized effect near the
          discontinuity.
        </Typography>
        <CustomizablePlot>
          <PhasePlot showCurrentTime={false} />
        </CustomizablePlot>
        <Typography variant="body1">
          Your goal is to estimate the rate-of-change of the clock, neglecting the effect of noise.
          Now, you may have heard of neural-networks capable of modeling arbitrary functions.
          Surely, you think, you don&apos;t need something so expressive as that. The problem seems
          like it should be simpler. By looking at the plot, it seems like if it weren&apos;t for
          the jumps, this problem{' '}
          <a href="https://en.wikipedia.org/wiki/Least_squares#Linear_least_squares">
            would be trivial
          </a>
          .
        </Typography>
        <Typography variant="body1">
          We will use this problem to explore the basics of the Fourier Transform. Find the code for
          all plots{' '}
          <a href="https://github.com/jasongforbes/jforbes.io/tree/master/src/Posts/LinearFitDiscontinuities">
            on Github
          </a>
          . Although this post will keep the wall-clock metaphor throughout, the solution applies to
          many problems. It is suitable whenever you are sampling a function with linear
          rate-of-change and regular discontinuities. This can be a rotating device such as motor,
          generator, or potentiometer. It can even ben{' '}
          <a href="https://en.wikipedia.org/wiki/Integer_overflow">
            an incrementing integer with overflow
          </a>
          .
        </Typography>
        <Typography variant="h4">Tools</Typography>
        <Typography variant="body1">
          To solve this problem, we will be using extensive use of the{' '}
          <a href="https://js.tensorflow.org/">TensorFlow.js</a> library. TensorFlow.js is best
          known for their capabilities to perform machine-learning. Instead, we will be utilizing it
          for its optimized linear-algebra functionality. To follow along, you will need to be aware
          of a few subtleties.
        </Typography>
        <div className={classes.indent}>
          <Typography variant="h5">The Fast Fourier Transform (FFT)</Typography>
          <Typography variant="body1">
            The Fast Fourier Transform (FFT), is an optimized algorithm for computing a Discrete
            Fourier Transform (DFT). The standard Fourier Transform operates on a continuous
            function. The DFT serves the same purpose, but for discrete functions. A sampled
            continuous function would need a DFT as it is no longer continuous. Due to this, almost
            all numeric Fourier Transforms are in fact DFTs.
          </Typography>
          <Typography variant="body1">
            The FFT is an interesting topic in itself. In my opinion, it is one of the most
            important algorithms of the 20th century (technically 19th century, but it was not
            popularized until later). While not accurate, for the purposes of this post the FFT
            computes the Fourier Transform.
          </Typography>
        </div>
        <div className={classes.indent}>
          <Typography variant="h5">Vector Operations</Typography>
          <Typography variant="body1">
            Specialized libraries exist for computing common linear-algebra operations. Two of the
            most well known libraries are <a href="http://www.netlib.org/blas/">BLAS</a> and{' '}
            <a href="http://www.netlib.org/lapack/">LAPACK</a> (again, an interesting topic in
            itself). These libraries treat vectors and matrices differently. This occurs even though
            there are similarities between the two types. In fact, vectors have an &quot;is a&quot;
            relationship with matrices. All vectors are matrices, but not all matrices are vectors.
          </Typography>
          <Typography variant="body1">
            In TensorFlow.js, there exists a similar abstraction for higher-order types. A vector
            &quot;is a&quot; tensor, and a matrix &quot;is a&quot; tensor. But unlike BLAS and
            LAPACK, these type are not treated differently in the user API. The library hides the
            intricacies of its implementation from the user. For that reason, when you see the
            following in the TensorFlow.js documentation:
          </Typography>
          <Highlight language="javascript">const v = tf.tensor1d([1, 2, 3])</Highlight>
          <Typography variant="body1">you should think:</Typography>
          <Highlight language="javascript">const v = vector([1, 2, 3])</Highlight>
        </div>
        <Typography variant="h4">Defining the Problem</Typography>
        <Typography variant="body1">
          In the above problem, we can model the variable-speed clock as a linear equation.
        </Typography>
        <div className={classes.math}>
          <BlockMath math="y = Ax" />{' '}
        </div>
        <Typography variant="body1">
          Keeping with the example, <InlineMath math="A" /> is a measure of the malfunctioning clock
          speed as compared to a working clock. <InlineMath math="x" />, the input, is the actual
          time. <InlineMath math="y" /> is the time shown by the clock. It should be pretty easy to
          see that if <InlineMath math="A = 1" />, then <InlineMath math="y = x" />, and the clock
          runs neither fast nor slow.
        </Typography>
        <Typography variant="body1">
          A random variable <InlineMath math={'\\tilde \\mu(x)'} /> models the noise in the output
          due to errors in the observation process. In this post, random variables are shown with
          the <InlineMath math={'\\tilde \\cdot'} /> symbol.
        </Typography>
        <div className={classes.math}>
          <BlockMath math={'\\tilde y = Ax + \\tilde \\mu(x)'} />{' '}
        </div>
        <Typography variant="body1">
          Lastly, we have to model the discontinuities that are the impetus for this entire blog
          post. In its simplest form, this discontinuity is due to the estimator &quot;rolling
          over&quot;. In the broken clock example, this is the clock changing from 11:59 to 0:00 at
          the stroke of midnight. The modulo operator captures this effect.
        </Typography>
        <div className={classes.math}>
          <BlockMath math={'\\tilde y = Ax + \\tilde \\mu(x) \\ \\ mod \\ \\ b'} />{' '}
        </div>
        <Typography variant="body1">
          Our goal now is to find an estimate for <InlineMath math="A" />.
        </Typography>
        <Typography variant="h4">A Brief Detour – The Fourier Transform</Typography>
        <Typography variant="body1">
          The Fourier Transform changes a problem by modeling a function as an infinite sum of its
          harmonics. There&apos;s a lot to unpack in that sentence so I&apos;ll try to give a bit of
          context, followed by a more precise definition.
        </Typography>
        <Typography variant="body1">
          A harmonic is a sinusoidal, or &quot;wave-like&quot;, signal with a specific frequency.
          These waves combine through summation to create more interesting shapes. Sometimes the
          peaks of the wave combine to create a larger signal, and sometimes they cancel. The goal
          of the Fourier Transform is to describe a signal by its constituent harmonics.
        </Typography>
        <Typography variant="body1">
          More precisely, a real harmonic is a sinusoidal function with an amplitude{' '}
          <InlineMath math="A" /> and phase <InlineMath math={'\\phi'} />. The qualifier
          &quot;real&quot; here means &quot;not imaginary&quot;. In this context, amplitude defines
          the height of the wave and phase defines the &quot;starting-point&quot;. Each harmonic has
          a constant frequency <InlineMath math={'\\omega'} /> related to its rate of change.
        </Typography>
        <div className={classes.math}>
          <BlockMath math={'A \\sin(\\omega x + \\phi)'} />{' '}
        </div>
        <Typography variant="body1">
          For simplicity, the Fourier Transform typically represents harmonics as a complex
          exponential. Using{' '}
          <a href="https://en.wikipedia.org/wiki/Euler%27s_formula">Euler&apos;s Formula</a>:
        </Typography>
        <div className={classes.math}>
          <BlockMath math={'e^{i \\phi} = \\cos(\\phi) + i \\sin(\\phi)'} />{' '}
        </div>
        <Typography variant="body1">
          The output of the Fourier Transform, <InlineMath math={'F(\\omega)'} />, describes the
          amplitude and phase of the harmonic at frequency <InlineMath math={'\\omega'} />. The
          amplitude and phase are also represented as a complex number. Under certain circumstances
          this can completely define a real harmonic:
        </Typography>
        <div className={classes.math}>
          <BlockMath math={'A \\sin(\\omega x + \\phi) = F(\\omega)e^{i \\omega x}'} />{' '}
        </div>
        <Typography variant="body1">
          I will use the complex exponential treatment here, as it simplifies the math. The
          introduction of complex numbers does tend to cause confusion though. For this reason, I
          want you to think of a complex exponential as the real harmonic described above.
        </Typography>
        <Typography variant="body1">Formally, the Inverse Fourier Transform is:</Typography>
        <div className={classes.math}>
          <BlockMath
            math={'f(x) = \\int_{- \\infty}^{\\infty} F(\\omega) e^{i\\omega x} d\\omega'}
          />{' '}
        </div>
        <Typography variant="body1">
          To finish this introduction to Fourier Transforms, I will reiterate the definition of the
          Fourier Transform.
        </Typography>
        <div className={classes.quote}>
          <p>The Fourier Transform changes a problem by modeling a function</p>
          <div className={classes.math}>
            <BlockMath math="f(x)" />{' '}
          </div>
          <p variant="body1">as an infinite sum</p>
          <div className={classes.math}>
            <BlockMath math={'\\int_{- \\infty}^{\\infty} d\\omega'} />{' '}
          </div>
          <p variant="body1">of its harmonics</p>
          <div className={classes.math}>
            <BlockMath math={'F(\\omega) e^{i\\omega x}'} />{' '}
          </div>
        </div>
        <Typography variant="h4">The Solution to our Original Query</Typography>
        <Typography variant="body1">
          One of the most versatile means of solving a problem is to reframe it as an easier
          problem. I will use that approach here.
        </Typography>
        <Typography variant="body1">
          Recall the model for the sampled data <InlineMath math={'(\\tilde y, x)'} />.
        </Typography>
        <div className={classes.math}>
          <BlockMath math={'\\tilde y = Ax + \\tilde \\mu(x) \\ \\ mod \\ \\ b'} />{' '}
        </div>
        <Typography variant="body1">
          For the example of the clock, <InlineMath math={'\\tilde y'} /> is the observed time,{' '}
          <InlineMath math="x" /> is the actual time, and <InlineMath math="b = 12" /> is the
          discontinuity point. One possible transformation is to change the discontinuity point by
          scaling the model.
        </Typography>
        <Typography variant="body1">
          For instance, we can introduce a scaling factor <InlineMath math="c" />:
        </Typography>
        <div className={classes.math}>
          <BlockMath math={'c \\tilde y = c (Ax + \\tilde \\mu(x)) \\ \\ mod \\ \\ c b'} />{' '}
        </div>
        <Typography variant="body1">
          If we can determine the new speed factor <InlineMath math="cA" />, we can recover the
          desired solution <InlineMath math="A" /> by undoing the scaling.
        </Typography>
        <Typography variant="body1">
          Next, we can transform the problem by introducing a complex exponential.
        </Typography>
        <div className={classes.math}>
          <BlockMath
            math={'e^{i c \\tilde y} = e^{i c (Ax + \\tilde \\mu(x)) \\ \\ mod \\ \\ c b}'}
          />
        </div>
        <Typography variant="body1">
          The complex exponential is a periodic function with period of{' '}
          <InlineMath math={'2 \\pi'} />. That means it &quot;wraps&quot; around every{' '}
          <InlineMath math={'2 \\pi'} /> much like the wall-clock does ever 12 hours
        </Typography>
        <div className={classes.math}>
          <BlockMath
            math={
              '\\begin{aligned}\
          e^{i \\phi} &= e^{i (\\phi + 2\\pi)} \\\\\
          &= e^{i\\phi \\ \\ mod \\ \\ 2 \\pi} \\\\\
          \\end{aligned}'
            }
          />
        </div>
        <Typography variant="body1">
          Using this knowledge, note what happens when we choose{' '}
          <InlineMath math={'c = 2 \\pi / b'} />.
        </Typography>
        <div className={classes.math}>
          <BlockMath
            math={
              '\\begin{aligned}\
            e^{i 2 \\pi \\tilde y / b} &= e^{i 2 \\pi (Ax + \\tilde \\mu(x)) /b  \\ \\ mod \\ \\ 2\\pi }\\\\\
            &= e^{i 2 \\pi (Ax + \\tilde \\mu(x)) /b}\\\\\
            &= e^{i 2 \\pi Ax / b }e^{i 2 \\pi \\tilde \\mu(x) b }\\\\\
          \\end{aligned}'
            }
          />
        </div>
        <Typography variant="body1">
          Next, the Fourier Transform transforms the problem into the frequency domain. Instead of
          deriving the Fourier Transform, see this table of{' '}
          <a href="https://en.wikipedia.org/wiki/Fourier_transform#Distributions,_one-dimensional">
            common transformations
          </a>
          .
        </Typography>
        <div className={classes.math}>
          <BlockMath math={'F(e^{i \\phi x}) = \\sqrt {2\\pi} \\ \\ \\delta (\\omega - \\phi)'} />{' '}
        </div>
        <Typography variant="body1">
          This says that in the frequency domain, a complex exponential will be a &quot;spike&quot;
          or impulse at frequency <InlineMath math={'\\phi'} />. In our case:
        </Typography>
        <div className={classes.math}>
          <BlockMath math={'\\phi = 2\\pi A / b'} />{' '}
        </div>
        <Typography variant="body1">
          What about the noise in our observations? The noise causes a frequency shift in the
          output. If the noise has a biased, the accumulation of these frequency shifts causes a
          systematic error. But for noise with zero-mean, these systematic errors will cancel out.
        </Typography>
        <div className={classes.math}>
          <BlockMath
            math={
              '\\begin{aligned}\
            E[F(e^{i \\phi x}e^{i\\tilde \\mu(x))})] &= \\sqrt {2\\pi} \\delta (\\omega - \\phi - E[ \\mu(x)]) \\\\\
            &= \\sqrt {2\\pi} \\delta (\\omega - \\phi) \\\\\
          \\end{aligned}'
            }
          />{' '}
        </div>
        <Typography variant="body1">
          It should then be trivial to determine the location of the spike, and from it recover the
          value of <InlineMath math="A" />.
        </Typography>
        <Typography variant="h4">A Wild Algorithm Appears</Typography>
        <Typography variant="body1">
          Finally, we can code a solution. First, lets generate test-data.
        </Typography>
        <Highlight language="javascript">
          const A = tf.scalar(speed);{'\n'}
          const b = tf.scalar(rollover);{'\n'}
          const x = tf.range(0, 10 * rollover, 0.25);{'\n'}
          const y_tilde = tf.mod(tf.add(tf.mul(A, x), tf.randomNormal([x.size], 0, mu)), b);
        </Highlight>
        <Typography variant="body1">
          Next, we want to transform the data into an appropriate form. This includes applying a
          scaling factor <InlineMath math="c" /> and introducing a complex harmonic.
        </Typography>
        <Highlight language="javascript">
          const c = tf.scalar((2 * Math.PI) / rollover);{'\n'}
          const exp = tf.mul(c, yTilde);{'\n'}
          const f = tf.complex(tf.cos(exp), tf.sin(exp));
        </Highlight>
        <Typography variant="body1">
          Using the FFT, convert the sampled data to the frequency domain.
        </Typography>
        <Highlight language="javascript">const F = tf.spectral.fft(f);</Highlight>
        <Typography variant="body1">
          By design, the sample data is a harmonic at a frequency which corresponds to the
          clock-speed. The FFT will contain a single spike at the frequency of this harmonic{' '}
          <InlineMath math={'\\phi = 2\\pi A / b'} />. Determine the location of the spike by
          searching the FFT data. Lastly, convert the frequency back to clock-speed using the
          inverse scaling factor <InlineMath math="1/c" />.
        </Typography>
        <Highlight language="javascript">
          const max = tf.argMax(tf.abs(F));{'\n'}
          const freqBin = (2 * Math.PI) / (sampleRate * F.size);{'\n'}
          const spike = tf.mul(freqBin, max.toFloat());{'\n'}
          return tf.div(spike, c).dataSync()[0];
        </Highlight>
        <Typography variant="body1">
          To visualize the amplitude, plot the absolute value of the FFT output. Notice the large
          spike and how its location remains invariant in the presence of noise. Yet, as the noise
          increases past a certain threshold, the spike becomes indistinguishable form the noise. At
          this point, the clock-speed becomes irrecoverable.
        </Typography>
        <CustomizablePlot>
          <FFTPlot />
        </CustomizablePlot>
        <Typography variant="h4">Conclusion</Typography>
        <Typography variant="body1">
          In the above post I have shown how to linearly fit a signal that has regular
          discontinuities. This method does not use computationally intensive non-linear
          curve-fitting. Instead, this approach is robust to noise and gives a practical use for the
          Fourier Transform. I hope to further explore some of these topics, such as the Fourier
          Transform, linear algebra, and optimization, in future posts.
        </Typography>
      </React.Fragment>
    </React.Fragment>
  );
};

Post.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

Post.defaultProps = {};

export default withStyles(styles)(Post);
