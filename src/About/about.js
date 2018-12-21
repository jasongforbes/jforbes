import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import about from '../images/about.jpg';

const styles = theme => ({
  aboutImage: {
    display: 'block',
    width: '100%',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    height: '0',
    paddingTop: '40.598690364%',
    margin: '40px 0px',
  },
  content: {
    margin: '80px 0px',
    [theme.breakpoints.down('sm')]: {
      margin: '40px 0px',
    },
  },
  listItem: theme.typography.list,
});

const About = ({ classes }) => (
  <div className={classes.content}>
    <Helmet>
      <title>About Jason Forbes</title>
      <meta
        name="description"
        content="Contact information and biographical information. Feel free to reach me at jason@jforbes.io or on Twitter."
      />
    </Helmet>
    <Grid container spacing={0}>
      <Hidden mdUp>
        <Grid item xs={1} />
      </Hidden>
      <Grid item xs={10} md={12}>
        <Typography variant="h3">About</Typography>
        <Typography variant="body1">
          I am a software engineer from St. John&#39;s, Newfoundland. I have a Master&#39;s in
          Applied Sciences, with a focus in power-converter simulation. I currently work as a Senior
          Software Engineer for <a href="http://krakenrobotics.com/">Kraken Robotics</a>.
        </Typography>
        <Typography variant="body1">Since graduation, my focus has been in:</Typography>
        <ul>
          <li>
            <Typography className={classes.listItem}>real-time systems</Typography>
          </li>
          <li>
            <Typography className={classes.listItem}>high-performance computing</Typography>
          </li>
          <li>
            <Typography className={classes.listItem}>numerical lineal algebra</Typography>
          </li>
        </ul>
        <Typography variant="body1">More recently, I have focused my studies in:</Typography>
        <ul>
          <li>
            <Typography className={classes.listItem}>full-stack development</Typography>
          </li>
          <li>
            <Typography className={classes.listItem}>machine learning</Typography>
          </li>
          <li>
            <Typography className={classes.listItem}>distributed systems</Typography>
          </li>
        </ul>
        <Typography variant="body1">
          I am always interested in hearing about other people&#39;s work and ongoing projects, and
          am happy to consult or provide advice where I can. Feel free to reach me at{' '}
          <a href="mailto:jason@jforbes.io">jason@jforbes.io</a> or on{' '}
          <a href="https://twitter.com/JasonForbes">Twitter</a>.
        </Typography>
      </Grid>
      <Hidden mdUp>
        <Grid item xs={1} />
      </Hidden>
      <Grid item xs={12}>
        <div
          className={classes.aboutImage}
          style={{ backgroundImage: `url(${about})` }}
          alt="Jason in Bonavista"
        />
      </Grid>
    </Grid>
  </div>
);

About.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(About);
