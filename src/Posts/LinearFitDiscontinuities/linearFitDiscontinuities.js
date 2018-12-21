import React from 'react';
import PropTypes from 'prop-types';
import MathJax from 'react-mathjax';
import { Helmet } from 'react-helmet';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Highlight from '../../Highlight';
import posts from '../posts.json';
import AnimatedPlot from './animatedPlot';
import CustomizablePlot from './customizablePlot';
import PhasePlot from './phasePlot';
import FFTPlot from './fftPlot';
import 'highlight.js/styles/ocean.css';

const postData = slug => posts.filter(post => post.slug === slug);

const styles = theme => ({
  indent: {
    padding: '0px 27px',
  },
  math: {
    ...theme.typography.body1,
  },
  quote: {
    padding: '18px 27px',
    margin: '27px',
    backgroundColor: '#D8E6E7',
    borderRadius: '8px',
    '& p': {
      ...theme.typography.body1,
      color: '#5B626B',
    },
    '& math': {
      ...theme.typography.body1,
      color: '#5B626B',
    },
  },
});

const Post = ({ classes, match }) => {
  const { date, title, summary } = postData(match.url)[0];
  return (
    <MathJax.Provider>
      <Helmet>
        <title>{`${title} - Jason Forbes`}</title>
        <meta name="description" content={summary} />
      </Helmet>
      <React.Fragment>
        <Typography variant="h3">{title}</Typography>
        <Typography variant="subtitle1">{date}</Typography>
        <Typography variant="body1">
          Recently I came upon an interesting problem – how could you easily estimate a noisy linear
          function if it contained regular discontinuities. The most natural place where this can
          come up is when the range of the function &quot;wraps around&quot;. Angles and rotations
          are natural examples of this.
        </Typography>
        <Typography variant="body1">
          For an example, take a standard wall-clock. The hour hand of a wall-clock will sweep from
          0:00 to 11:59 in the course of 12 hours. If you plot the position of the hour-hand over
          the course of three days, you will notice a predictable &quot;jump&quot; from 11:59 to
          0:00 as the hand sweeps across the 12th hour.
        </Typography>
        <AnimatedPlot />
        <Typography variant="body1">
          Next, assume that you are in an room with only a clock and a light-bulb. You are told that
          the clock is not working correctly. It may be running either faster or slower than normal
          and you are to determine by how much. To aid in this, the light-bulb will blink once a
          minute. During this time, you can record the time shown on the wall-clock. To make this
          harder, the clock is really far away. And only has an hour-hand. Maybe there are no hour
          or minute markings on the clock face. Each minute, the best you can do is guess the time
          shown on the clock. We can model this uncertainty as noise. Notice how the noise has an
          outsized effect near the discontinuity, potentially causing many more discontinuities.
        </Typography>
        <CustomizablePlot>
          <PhasePlot showCurrentTime={false} />
        </CustomizablePlot>
        <Typography variant="body1">
          Your goal is to estimate the rate-of-change of the clock, neglecting the effect of this
          noise as best as possible. Now, you may have heard of this magical thing called a
          neural-network which can model arbitrary non-linear functions, but surely you don&apos;t
          need something so expressive as that. The problem seems like it should be simpler. Just by
          looking at the plot, it seems like if it weren&apos;t for the jumps, this could be solved
          much more easily (link to least-squares estimation).
        </Typography>
        <Typography variant="body1">
          We will use this problem to explore the basics of the Fourier Transform. The code for all
          plots can be found{' '}
          <a href="https://github.com/jasongforbes/jforbes.io/tree/master/src/Posts/LinearFitDiscontinuities">
            here
          </a>
          . While this post will retain the wall-clock metaphor throughout, this method is
          applicable whenever you want to determine the constant rate of change of something that
          routinely &quot;rolls-over&quot;. This could be a rotating device (motor, generator,
          potentiometer), or even{' '}
          <a href="https://en.wikipedia.org/wiki/Integer_overflow">an integer with overflow</a>.
        </Typography>
        <Typography variant="h4">Tools</Typography>
        <Typography variant="body1">
          To solve this problem, we will be using extensive use of the{' '}
          <a href="https://js.tensorflow.org/">TensorFlow.js</a> library. TensorFlow.js, and its
          Python counterpart, are best known for their capabilities to perform machine-learning.
          Instead, we will be utilizing it for its highly optimized mathematic operations. To follow
          along, you will need to be aware of a few subtleties.
        </Typography>
        <div className={classes.indent}>
          <Typography variant="h5">The Fast Fourier Transform (FFT)</Typography>
          <Typography variant="body1">
            The Fast Fourier Transform, or FFT, is a specialize algorithm for perform a Discrete
            Fourier Transform (or DFT). This is compared to the standard Fourier Transform, which
            operates on a continuous function. The FFT is an interesting topic in itself, and in my
            opinion one of the most important algorithms of the 20th century. While not entirely
            accurate, for the purposes of this post you can consider it a function for computing the
            Fourier Transform.
          </Typography>
        </div>
        <div className={classes.indent}>
          <Typography variant="h5">Vector Operations</Typography>
          <Typography variant="body1">
            Traditionally, linear-algebra operations were computed by specialized libraries known as{' '}
            <a href="http://www.netlib.org/blas/">BLAS</a> and{' '}
            <a href="http://www.netlib.org/lapack/">LAPACK</a> (again, an interesting topic in
            itself). In these libraries, vectors and matrices were treated fundamentally different,
            even though there are many similarities between the two. In fact, there&apos;s an
            &quot;is a&quot; relationship between vectors and matrices – all vectors are matrices,
            but not all matrices are vectors.
          </Typography>
          <Typography variant="body1">
            In TensorFlow, a similar abstraction is made for higher-order types. A vector &quot;is
            a&quot; tensor, and similarly a matrix &quot;is a&quot; tensor. But unlike BLAS and
            LAPACK, these type are not treated differently in the user API. The intricacies of the
            library are hidden from the user. For that reason, when you see the following:
          </Typography>
          <Highlight language="javascript">const v = tf.tensor1d([1, 2, 3])</Highlight>
          <Typography variant="body1">you should think:</Typography>
          <Highlight language="javascript">const v = vector([1, 2, 3])</Highlight>
        </div>
        <Typography variant="h4">Defining the Problem</Typography>
        <Typography variant="body1">
          The Fourier Transform changes a problem by modeling a function as an infinite sum of its
          harmonics. There&apos;s a lot to unpack in that sentence so I&apos;ll try to give a bit of
          context, followed by a more precise definition.
        </Typography>
        <Typography variant="body1">
          A harmonic is a sinusoidal or &quot;wave-like&quot; signal with a specific frequency.
          These waves can be combined through summation to create more interesting shapes. Sometimes
          the peaks of the wave combine to create a larger signal, and sometimes they cancel. The
          goal of the Fourier Transform is to describe a signal in terms of its constituent
          harmonics.
        </Typography>
        <Typography variant="body1">
          More precisely, a harmonic defines a sinusoidal function with an amplitude{' '}
          <MathJax.Node inline formula="A" /> and phase <MathJax.Node inline formula={'\\phi'} />.
          In this context, amplitude defines the height of the wave and phase defines the
          &quot;starting-point&quot;. Each harmonic is defined with a constant frequency{' '}
          <MathJax.Node inline formula={'\\omega'} /> which is related to its rate of change.
        </Typography>
        <Typography variant="body1">
          The noise in the output, due to errors in the observation process, can be modelled using a
          random variable <MathJax.Node inline formula={'\\tilde \\mu(x)'} />. In this post, random
          variables will be shown with the <MathJax.Node inline formula={'\\tilde \\cdot'} />{' '}
          symbol.
        </Typography>
        <MathJax.Node className={classes.math} formula={'\\tilde y = Ax + \\tilde \\mu(x)'} />
        <Typography variant="body1">
          Lastly, we have to model the discontinuities that are the impetus for this entire blog
          post. In its simplest form, like the broken clock example, this discontinuity is caused by
          the estimator &quot;rolling over&quot;, such as the clock changing from 11:59 to 0:00 at
          the stroke of midnight. This can be modeled using the modulo operator.
        </Typography>
        <MathJax.Node
          className={classes.math}
          formula={'\\tilde y = Ax + \\tilde \\mu(x) \\ \\ mod \\ \\ b'}
        />
        <Typography variant="body1">
          Our goal now is to find an estimate for <MathJax.Node inline formula="A" />. For this
          estimate to be valid, it would minimize the error between the observed output, and a
          generated output.
        </Typography>
        <MathJax.Node
          className={classes.math}
          formula={'||\\tilde y - (\\hat A x \\ \\ mod \\ \\ b)||'}
        />
        <Typography variant="h4">A Brief Detour – The Fourier Transform</Typography>
        <Typography variant="body1">
          The Fourier Transform changes a problem by modeling a function as an infinite sum of its
          harmonics. There&apos;s a lot to unpack in that sentence so I&apos;ll try to give a bit of
          context, and then a more precise definition.
        </Typography>
        <Typography variant="body1">
          A harmonic is a sinusoidal or &quot;wave-like&quot; signal with a specific frequency.
          These waves can be combined through summation to create more interesting shapes. Sometimes
          the peaks of the wave combine to create a larger signal, and sometimes they cancel. The
          goal of the Fourier Transform is to describe a signal in terms of its constituent
          harmonics.
        </Typography>
        <Typography variant="body1">
          More precisely, a harmonic defines a sinusoidal function with an amplitude{' '}
          <MathJax.Node inline formula="A" /> and phase <MathJax.Node inline formula={'\\phi'} />.
          In this context, amplitude defines the height of the wave and phase defines the
          &quot;starting-point&quot;. Each harmonic is defined with a constant frequency{' '}
          <MathJax.Node inline formula={'\\omega'} /> which is related to its rate of change.
        </Typography>
        <MathJax.Node className={classes.math} formula={'A \\sin(\\omega x + \\phi)'} />
        <Typography variant="body1">
          For simplicity, the Fourier Transform typically represents harmonics as a complex
          exponential, using{' '}
          <a href="https://en.wikipedia.org/wiki/Euler%27s_formula">Euler&apos;s Formula</a>.
        </Typography>
        <MathJax.Node
          className={classes.math}
          formula={'e^{i \\phi} = \\cos(\\phi) + i \\sin(\\phi)'}
        />
        <Typography variant="body1">
          The output of the Fourier Transform, which we will define as{' '}
          <MathJax.Node inline formula={'F(\\omega)'} />, describes the amplitude and phase of the
          harmonic at frequency <MathJax.Node inline formula={'\\omega'} />. The amplitude and phase
          are themselves can be represented as a complex number. Under certain circumstances this
          can completely define the real harmonic:
        </Typography>
        <MathJax.Node
          className={classes.math}
          formula={'A \\sin(\\omega x + \\phi) = F(\\omega)e^{i \\omega x}'}
        />
        <Typography variant="body1">
          I will use the complex exponential treatment here, as it simplifies the math. The
          introduction of complex numbers does tend to cause confusion though. For this reason, I
          want you to think of a complex exponential as a harmonic described above.
        </Typography>
        <Typography variant="body1">
          Formally, the Inverse Fourier Transform is defined as:
        </Typography>
        <MathJax.Node
          className={classes.math}
          formula={'f(x) = \\int_{- \\infty}^{\\infty} F(\\omega) e^{i\\omega x} d\\omega'}
        />
        <Typography variant="body1">
          To finish this introduction to Fourier Transforms, I will reiterate the definition of the
          Fourier Transform, and show how it relates to the mathematical representation.
        </Typography>
        <div className={classes.quote}>
          <p>The Fourier Transform changes a problem by modeling a function</p>
          <MathJax.Node className={classes.math} formula="f(x)" />
          <p variant="body1">as an infinite sum</p>
          <MathJax.Node className={classes.math} formula={'\\int_{- \\infty}^{\\infty} d\\omega'} />
          <p variant="body1">of its harmonics</p>
          <MathJax.Node className={classes.math} formula={'F(\\omega) e^{i\\omega x}'} />
        </div>
        <Typography variant="h4">The Solution to our Original Query</Typography>
        <Typography variant="body1">
          One of the most versatile means of solving a problem is to reframe it as an easier
          problem. I will use that approach here. The idea is to reframe the original problem as a
          much easier problem, solve the easier problem, and then undo any transformations to get
          the solution to the original problem.
        </Typography>
        <Typography variant="body1">
          Recall the model for the sampled data <MathJax.Node inline formula={'(\\tilde y, x)'} />.
        </Typography>
        <MathJax.Node
          className={classes.math}
          formula={'\\tilde y = Ax + \\tilde \\mu(x) \\ \\ mod \\ \\ b'}
        />
        <Typography variant="body1">
          For the example of the clock, <MathJax.Node inline formula={'\\tilde y'} /> is the
          observed time, <MathJax.Node inline formula="x" /> is the actual time, and{' '}
          <MathJax.Node inline formula="b = 12" /> is the discontinuity point. One possible
          transformation is to change the discontinuity point by scaling the entire model.
        </Typography>
        <Typography variant="body1">
          For instance, we can introduce a scaling factor <MathJax.Node inline formula="c" />:
        </Typography>
        <MathJax.Node
          className={classes.math}
          formula={'c \\tilde y = c (Ax + \\tilde \\mu(x)) \\ \\ mod \\ \\ c b'}
        />
        <Typography variant="body1">
          If we can determine the new speed factor <MathJax.Node inline formula="cA" />, we can
          recover the desired solution <MathJax.Node inline formula="A" /> by multiplying by the
          inverse scaling factor <MathJax.Node inline formula="1/c" />.
        </Typography>
        <Typography variant="body1">
          Next, we can transform the problem by introducing a complex exponential.
        </Typography>
        <MathJax.Node
          className={classes.math}
          formula={'e^{i c \\tilde y} = e^{i c (Ax + \\tilde \\mu(x)) \\ \\ mod \\ \\ c b}'}
        />
        <Typography variant="body1">
          The complex exponential is a periodic function with period of{' '}
          <MathJax.Node inline formula={'2 \\pi'} />. That means it &quot;wraps&quot; around every{' '}
          <MathJax.Node inline formula={'2 \\pi'} /> much like the wall-clock does ever 12 hours
        </Typography>
        <MathJax.Node
          className={classes.math}
          formula={
            '\\begin{aligned}\
          e^{i \\phi} &= e^{i (\\phi + 2\\pi)} \\\\\
          &= e^{i\\phi \\ \\ mod \\ \\ 2 \\pi} \\\\\
          \\end{aligned}'
          }
        />
        <Typography variant="body1">
          Using this knowledge, note what happens when we choose{' '}
          <MathJax.Node inline formula={'c = 2 \\pi / b'} />.
        </Typography>
        <MathJax.Node
          className={classes.math}
          formula={
            '\\begin{aligned}\
            e^{i 2 \\pi \\tilde y / b} &= e^{i 2 \\pi (Ax + \\tilde \\mu(x)) /b  \\ \\ mod \\ \\ 2\\pi }\\\\\
            &= e^{i 2 \\pi (Ax + \\tilde \\mu(x)) /b}\\\\\
            &= e^{i 2 \\pi Ax / b }e^{i 2 \\pi \\tilde \\mu(x) b }\\\\\
          \\end{aligned}'
          }
        />
        <Typography variant="body1">
          The Fourier Transform is then used to write this in terms of frequency. Instead of
          deriving the Fourier Transform for a complex exponential, I will point you towards a table
          of{' '}
          <a href="https://en.wikipedia.org/wiki/Fourier_transform#Distributions,_one-dimensional">
            common transformations
          </a>
          .
        </Typography>
        <MathJax.Node
          className={classes.math}
          formula={'F(e^{i \\phi x}) = \\sqrt {2\\pi} \\delta (\\omega - \\phi)'}
        />
        <Typography variant="body1">
          This says that in the frequency domain, a complex exponential will be a &quot;spike&quot;
          or impulse at frequency <MathJax.Node inline formula={'\\phi'} />. In our case:
        </Typography>
        <MathJax.Node className={classes.math} formula={'\\phi = 2\\pi A / b'} />
        <Typography variant="body1">
          What about the noise in our observations? The noise causes a frequency shift in the
          output. If the noise is biased, the accumulation of these frequency shifts can cause a
          systematic error in our result. But for noise with zero-mean, these systematic errors will
          cancel out.
        </Typography>
        <MathJax.Node
          className={classes.math}
          formula={
            '\\begin{aligned}\
            F(e^{i \\phi x}e^{i\\tilde \\mu(x))}) &= \\sqrt {2\\pi} \\delta (\\omega - \\phi - E[ \\mu(x)]) \\\\\
            &= \\sqrt {2\\pi} \\delta (\\omega - \\phi) \\\\\
          \\end{aligned}'
          }
        />
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
          scaling factor <MathJax.Node inline formula="c" /> and introducing a complex harmonic.
        </Typography>
        <Highlight language="javascript">
          const c = tf.scalar((2 * Math.PI) / rollover);{'\n'}
          const exp = tf.mul(c, yTilde);{'\n'}
          const f = tf.complex(tf.cos(exp), tf.sin(exp));
        </Highlight>
        <Typography variant="body1">
          Using the FFT, the sampled data can be converted to the frequency domain.
        </Typography>
        <Highlight language="javascript">const F = tf.spectral.fft(f);</Highlight>
        <Typography variant="body1">
          By design, the sample data is a harmonic at a frequency which corresponds to the
          clock-speed. The FFT will contain a single spike at the frequency of this harmonic{' '}
          <MathJax.Node inline formula={'\\phi = 2\\pi A / b'} />. Determining the location of the
          spike is trivial by searching the FFT data, and the frequency can then be converted back
          to clock-speed using the inverse scaling factor <MathJax.Node inline formula="1/c" />.
        </Typography>
        <Highlight language="javascript">
          const max = tf.argMax(tf.abs(F));{'\n'}
          const freqBin = (2 * Math.PI) / (sampleRate * F.size);{'\n'}
          const spike = tf.mul(freqBin, max.toFloat());{'\n'}
          return tf.div(spike, c).dataSync()[0];
        </Highlight>
        <Typography variant="body1">
          The amplitude can be visualized by plotting the absolute value of the FFT output. Notice
          the large spike and how its location remains invariant in the presence of noise. Yet, as
          the noise is allowed to increase past a certain threshold, the spike would be
          indistinguishable form the noise-floor. At this point, the clock-speed becomes
          irrecoverable.
        </Typography>
        <CustomizablePlot>
          <FFTPlot />
        </CustomizablePlot>
        <Typography variant="h4">Conclusion</Typography>
        <Typography variant="body1">
          In the above post I have shown how to easily linearly fit a signal that has regular
          discontinuities, without using computationally intensive non-linear curve-fitting. This
          approach is fairly robust to noise and gives a practical use for the Fourier Transform. I
          hope to further explore some of these topics, such as the Fourier Transform, linear
          algebra, and optimization, in future posts.
        </Typography>
      </React.Fragment>
    </MathJax.Provider>
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
