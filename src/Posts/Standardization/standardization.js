import React from 'react';
import PropTypes from 'prop-types';
import { InlineMath, BlockMath } from 'react-katex';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Highlight from '../../Highlight';
import styles from '../style';
import { getHelmet } from '../utilities';
import TimeSeries from './timeSeries';
import 'highlight.js/styles/ocean.css';

const Post = ({ classes, match }) => {
  const { helmet, title, date } = getHelmet(match.url);
  return (
    <React.Fragment>
      {helmet}
      <React.Fragment>
        <Typography variant="h3">{title}</Typography>
        <Typography variant="subtitle1">{date}</Typography>
        <Typography variant="body1">
          A common preprocessing step when operating on data is <em>standardization</em>. This is
          the procedure of making two data-sets comparable by removing any bias and normalizing the
          variance. This definition may seem arbitrary but the effect is quite easy to understand.
        </Typography>
        <Typography variant="body1">
          Imagine you are working on speech recognition for home automation. The prototype device
          works while the production units have significant issues. The only difference between the
          units is the quality of the microphones. An expensive, but high quality, sensor is in the
          prototype. A more cost-effective sensor is in the production units. The specs are a
          different and the training-set is exclusively generated by the expensive sensor. Can the
          change of sensor cause the issue?
        </Typography>
        <Typography variant="body1">
          This is the kind of issue standardization solves. Lets simplify the problem by analyzing
          the time-series.
        </Typography>
        <Grid container spacing={0} className={classes.padding}>
          <Grid item xs={12} sm={5} md={6} xl={7}>
            <TimeSeries title="Prototype" />
          </Grid>
          <Grid item xs={12} sm={7} md={6} xl={5}>
            <TimeSeries title="Production" bias={0.03} standardDeviation={0.4} />
          </Grid>
        </Grid>
        <Typography variant="body1">
          First notice that the low-cost sensor has an offset. The time-series recorded is non-zero,
          even at points of silence. This is an example of bias in the low-cost sensor, the effect
          of which is raising the value of each sample. In our speech-recognition example, bias is
          due to a flaw in the low-end sensor. For instance, there could be an added voltage between
          the reference ground and the sampling point. We can remove the bias by subtracting the
          average signal strength from the data.
        </Typography>
        <div className={classes.math}>
          <BlockMath
            math={
              '\\begin{aligned}\
              \\bar y &= \\bar x - {1 \\over N} \\sum_{i}^{N} x_i \\\\\
              \\\\\
              \\      &= \\bar x - \\mathrm{E}\\big[\\bar x\\big] \\\\\
              \\end{aligned}'
            }
          />
        </div>
        <Typography variant="body1">
          The second effect is subtler. The signal generated by the low-end sensor varies less than
          the original. This is due to the sensitivity of the sensor. In speech recognition, it
          means the speaker will need to be louder to generate a comparable signal. The data
          recorded by the high-end sensor has a higher variance. One way to correct for this is to
          divide both signals by their standard-deviation.
        </Typography>
        <div className={classes.math}>
          <BlockMath
            math={
              '\\begin{aligned}\
              \\bar y &= {\\bar x \\over \\sqrt{ {1 \\over N}  \\sum_i^N(\\bar x - \\mathrm{E}\\big[\\bar x\\big])^2}} \\\\\
              \\\\\
                      &= {\\bar x \\over \\sqrt{ \\mathrm{E}\\bigg[\\bar x - \\mathrm{E}\\big[\\bar x\\big]\\bigg]^2}} \\\\\
              \\\\\
                      &= {\\bar x \\over \\sqrt{ \\mathrm{E}\\big[\\bar x^2\\big] - \\mathrm{E}\\big[\\bar x\\big]^2}} \\\\\
              \\end{aligned}'
            }
          />
        </div>
        <Typography variant="body1">
          See how a change of bias or variance effects the signal.
        </Typography>
        {/* TODO: Change bias / variance plot */}
        <Typography variant="body1">
          All code in this post can be found on{' '}
          <a href="https://github.com/jasongforbes/jforbes.io/tree/master/src/Posts/Standardization">
            GitHub
          </a>
          .
        </Typography>
        <Typography variant="h4">Environmental Causes</Typography>
        <Typography variant="body1">
          The above example focuses on flaws in the sensor as a way to make this problem concrete.
          But a change in sensor is not the only reason a data-set requires normalization. For audio
          recordings, variance could be a symptom of a change in the environment. For instance, the
          addition of unwanted noise will create a change in signal variance. Similarly, as the
          speaker walks towards the sensor, the signal strength will increase.
        </Typography>
        <Typography variant="body1">
          As for bias, the electrical characteristics of a circuit change based on temporal factors.
          The electrical bias of a circuit could be dependent on the ambient temperature. This means
          the bias changes as the room heats and cools. It also means as the sensor&apos;s
          electronics generate heat, the bias will change.
        </Typography>
        <Typography variant="body1">
          The end result is that the data requires continuous standardization. This is typically
          done in batches of <InlineMath math="M" /> samples The application determines the window
          size <InlineMath math="M" />.
        </Typography>
        <Typography variant="body1">
          Performing this running standardization will reduce the effect of environmental changes.
          As a result, this increases the effectiveness of machine-learning algorithms.
        </Typography>
        <Typography variant="h4">A Naive Approach</Typography>
        <Typography variant="body1">
          Below is a direct, yet inefficient, algorithm for windowed standardization.
        </Typography>
        <Highlight language="python">
          def standardize(x, M):{'\n'}
          {'    '}N = x.size{'\n'}
          {'    '}out = np.zeros(N - M){'\n'}
          {'    '}for i in range(0, N - M):{'\n'}
          {'        '}out[i] = x[i] - np.mean(x[i:i + M]){'\n'}
          {'        '}out[i] = out[i] / np.std(x[i:i + M]){'\n'}
          {'    '}return out
        </Highlight>
        <Typography variant="body1">
          This function is verbose and quite easy to understand. Unfortunately, this comes at the
          cost of efficiency. This naive approach has a complexity of <InlineMath math="O(NM)" />,
          where <InlineMath math="N" /> is the input data size and <InlineMath math="M" /> is the
          window size. When approaching a problem such as this, one of the first things to try is
          vectorization. Vectorization, in this case, can reduce the complexity to{' '}
          <InlineMath math="O(N)" /> and confers a host of other benefits.
        </Typography>
        <Typography variant="h4">Why Choose a Vectorized Implementation?</Typography>
        <Typography variant="body1">
          Vectorizing an algorithm refers to operating uniformly across arrays. In other words,
          vectorizing an algorithm replaces *for loops* with optimized vector operations. These
          vectorized operations rely on the underlying linear-algebra library, such as BLAS.
          Optimized linear-algebra libraries provide the following benefits.
        </Typography>
        <Typography variant="h5">SIMD Instructions</Typography>
        <Typography variant="body1">
          Modern processors have{' '}
          <a href="https://en.wikipedia.org/wiki/SIMD">Single Instruction, Multiple Data</a> (SIMD)
          instructions. These specialized instructions perform computations on a vector of data. A
          SIMD instruction loads a single operation (instruction) and a vector of data into an array
          of{' '}
          <a href="https://en.wikipedia.org/wiki/Arithmetic_logic_unit">Arithmetic Logic Units</a>{' '}
          (ALUs). SIMD allows for data-level parallelism that can provide enormous efficiency gains.
          This is in contrast to a traditional Single Instruction, Single Data (SISD) architectures.
        </Typography>
        <Typography variant="h5">Parallel Execution</Typography>
        <Typography variant="body1">
          Vectorized operations can often exploit parallelism. Take, for instance, a vector
          dot-product.
        </Typography>
        <div className={classes.math}>
          <BlockMath math={'x = \\bar u^T \\bar v'} />
        </div>
        <Typography variant="body1">
          This is easily mapped into to two identical sub-problems.
        </Typography>
        <div className={classes.math}>
          <BlockMath
            math={
              '\\begin{aligned}\
              \\bar u &= \\begin{bmatrix} \
              \\bar u_1 \\\\\
              \\bar u_2 \\\\\
              \\end{bmatrix} \\\\\
              \\\\\
              \\bar v &= \\begin{bmatrix} \
              \\bar v_1 \\\\\
              \\bar v_2 \\\\\
              \\end{bmatrix}\\\\\
              \\\\\
              x_1 &= \\bar u_1^T \\bar v_1 \\\\\
              \\\\\
              x_2 &= \\bar u_2^T \\bar v_2 \\\\\
              \\end{aligned}'
            }
          />
        </div>
        <Typography variant="body1">
          Combining the results of the sub problems gives the answer to the original query.
        </Typography>
        <div className={classes.math}>
          <BlockMath math="x = x_1 + x_2" />
        </div>
        <Typography variant="body1">
          The two sub-problems can be further divided to achieve the desired level or parallelism.
          This method, <a href="https://en.wikipedia.org/wiki/MapReduce">MapReduce</a>, is commonly
          exploited in vectorized operations.
        </Typography>
        <Typography variant="h5">Minimizing Cache Misses</Typography>
        <Typography variant="body1">
          Fetching data from memory is a slow process. For this reason, processors cache data for
          fast access. This is common for operations that exhibit{' '}
          <a href="https://en.wikipedia.org/wiki/Locality_of_reference">sequential locality</a>.
          When accessing data at sequential addresses, the processor loads the entire block into the
          cache. This avoids repeating costly IO operations.
        </Typography>
        <Typography variant="body1">
          Vectorized operations take advantage of sequential locality. For instance, take
          multiplying a{' '}
          <a href="https://en.wikipedia.org/wiki/Row-_and_column-major_order">
            column-major matrix
          </a>{' '}
          by a scalar. A column-major matrix has each column stored in contiguous memory. To
          minimize cache misses, this function will iterate sequentially along the major axis.
        </Typography>
        <div className={classes.math}>
          <BlockMath
            math={
              'A = \\begin{bmatrix} \
              a_{1,1} \\ a_{1,2} \\ a_{1,3} \\\\\
              a_{2,1} \\ a_{2,2} \\ a_{2,3} \\\\\
              a_{3,1} \\ a_{3,2} \\ a_{3,3} \\\\\
              \\ldots \\\\\
              \\end{bmatrix}'
            }
          />
        </div>
        <Typography variant="body1">
          For instance, if <InlineMath math="A" /> is a column-major matrix, then{' '}
          <InlineMath math="a_{2,1}" /> and <InlineMath math="a_{3,1}" /> are adjacent in memory. If
          the matrix <InlineMath math="A" /> has many rows, then <InlineMath math="a_{1,1}" /> and{' '}
          <InlineMath math="a_{1,2}" /> could be in different memory blocks. Iterating along the
          major axis minimizes the number of memory fetches.
        </Typography>
        <Typography variant="h4">A Vectorized Approach</Typography>
        <Typography variant="body1">
          The first step of standardization is determining the mean of the vector. In the{' '}
          <em>windowed</em> approach, this is a{' '}
          <a href="https://en.wikipedia.org/wiki/Moving_average">moving average filter</a>.
        </Typography>
        <div className={classes.math}>
          <BlockMath
            math={
              '\\begin{aligned} \
              u_j &= {1 \\over M} \\sum_{i = j}^{M + j - 1} x_i \\\\\
              \\\\\
                  &= {1 \\over M} \\bigg[ \\sum_{i}^{M + j - 1} x_i  - \\sum_{i}^{j-1} x_i \\bigg] \\\\\
              \\end{aligned}'
            }
          />
        </div>
        <Typography variant="body1">
          Note the similarity to the vectorized operation <em>cumulative-summation</em>.
        </Typography>
        <div className={classes.math}>
          <BlockMath math={'cumsum(x)_j = \\sum_{i}^{j} x_{i}'} />
        </div>
        <Typography variant="body1">
          Below is a vectorized implementation of the moving average filter. This implementation
          uses the cumulative-summation.
        </Typography>
        <Highlight language="python">
          def moving_average(x, M):{'\n'}
          {'    '}x_sum = np.cumsum(x){'\n'}
          {'    '}return (x_sum[M:] - x_sum[:-M]) / float(M)
        </Highlight>
        <Typography variant="body1">A similar trick vectorizes the standard deviation.</Typography>
        <Highlight language="python">
          def standard_deviation(x, M):{'\n'}
          {'    '}x_sum = np.cumsum(x){'\n'}
          {'    '}x_sq_sum = np.cumsum(np.square(x)){'\n'}
          {'\n'}
          {'    '}mean = (x_sum[M:] - x_sum[:-M]) / float(M){'\n'}
          {'    '}sq_mean = (x_sq_sum[M:] - x_sq_sum[:-M]) / float(M){'\n'}
          {'    '}return np.sqrt(sq_mean - np.square(mean))
        </Highlight>
        <Typography variant="body1">
          Combine both definitions for our vectorized windowed standardization algorithm.
        </Typography>
        <Highlight language="python">
          def standardize_vec(x, M):{'\n'}
          {'    '}x_sum = np.cumsum(x){'\n'}
          {'    '}x_sq_sum = np.cumsum(np.square(x)){'\n'}
          {'\n'}
          {'    '}mean = (x_sum[M:] - x_sum[:-M]) / float(M){'\n'}
          {'    '}sq_mean = (x_sq_sum[M:] - x_sq_sum[:-M]) / float(M){'\n'}
          {'    '}std = np.sqrt(sq_mean - np.square(mean)){'\n'}
          {'    '}return (x[:-M] - mean) / std
        </Highlight>
        <Typography variant="h4">Wrapping Up</Typography>
        <Typography variant="body1">
          Below is the results from running the naive and vectorized algorithms on a vector of size
          10000. In both cases, the window-size is 2048. The result is the average execution time
          from 50 iterations.
        </Typography>
        <Highlight language="bash">
          50 loops, best of 5: 11.53 sec per loop{'  '}# standardize{'\n'}
          50 loops, best of 5: 17.58 msec per loop # standardize_vec
        </Highlight>
        <Typography variant="body1">
          There is a pitfall with the vectorized approach, and that is numerical error. The
          cumulative sum will sum together the entire vector, only to later get a subset of that
          summation. If the data has a wide range of values, the summation of large values may
          reduce the precision of the results. 32-bit floats can encode around 7 decimal digits of
          information. If the difference in values is near 7 decimal places, there will be numerical
          error. One solution is to use a larger floating point encoding (doubles / quads). That
          often comes with a significant slowdown in execution speed.
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
