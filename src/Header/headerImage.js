import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  header: {
    position: 'relative',
    width: '100%',
  },
  headerImage: {
    display: 'block',
    width: '100%',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    height: '0',
    paddingTop: '100%',
    [theme.breakpoints.down('md')]: {
      height: '250px',
      backgroundSize: 'cover',
      paddingTop: '20%',
      backgroundPosition: '50% 20%',
    },
    [theme.breakpoints.down('xs')]: {
      height: '250px',
      backgroundSize: 'cover',
      paddingTop: '50%',
      backgroundPosition: '50% 20%',
    },
  },
  headerTextBackground: {
    position: 'absolute',
    bottom: '0px',
    width: '100%',
    backgroundColor: 'rgba(25, 25, 25, 0.65)',
    zIndex: 2,
  },
  headerText: {
    textAlign: 'left',
    margin: '15px 0px',
    fontSize: '52px',
    maxWidth: '300px',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
      margin: '15px 0px 0px',
      fontSize: '52px',
      maxWidth: 'none',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '58px',
    },
    [theme.breakpoints.up('lg')]: {
      textAlign: 'left',
      margin: '15px 0px',
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '72px',
    },
  },
});

const HeaderImage = ({ children, classes, headshot }) => (
  <div className={classes.header}>
    <div
      className={classes.headerImage}
      style={{ backgroundImage: `url(${headshot})` }}
      alt="Headshot"
    />
    <div className={[classes.headerTextBackground, classes.HeaderText].join(' ')}>
      <Grid container>
        <Grid item xs={1} lg={3} />
        <Grid item xs={10} lg={6}>
          <Typography variant="h1" className={classes.headerText}>
            Jason Forbes
          </Typography>
        </Grid>
        <Grid item xs={1} lg={3} />
        <Grid item xs={1} lg={3} />
        <Grid item xs={10} lg={6}>
          {children}
        </Grid>
        <Grid item xs={1} lg={3} />
      </Grid>
    </div>
  </div>
);

HeaderImage.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  headshot: PropTypes.string.isRequired,
};

HeaderImage.defaultProps = {
  children: <div />,
};

export default withStyles(styles)(HeaderImage);
