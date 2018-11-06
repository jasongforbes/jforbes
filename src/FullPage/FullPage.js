import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import { Home as HomeIcon } from '../icons';

const styles = () => ({
  home: {
    margin: '72px 0px',
  },
  icon: {
    margin: '0px 8px 0px 0px',
  },
  link: {
    textDecoration: 'none',
  },
  linkGroup: {
    display: 'flex',
    alignItems: 'center',
  },
  page: {
    margin: '0px 0px 72px 0px',
  },
});

const FullPage = ({ children, classes }) => (
  <Grid container spacing={24} className={classes.page}>
    <Grid item xs={1} md={2} lg={3} />
    <Grid item xs={10} md={8} lg={6} className={classes.home}>
      <Link to="/" className={classes.link}>
        <div className={classes.linkGroup}>
          <SvgIcon color="primary" className={classes.icon}>
            <HomeIcon />
          </SvgIcon>
          <Typography variant="button">Home</Typography>
        </div>
      </Link>
    </Grid>
    <Grid item xs={1} md={2} lg={3} />
    <Grid item xs={1} md={2} lg={3} />
    <Grid item xs={10} md={8} lg={6}>
      {children}
    </Grid>
    <Grid item xs={1} md={2} lg={3} />
  </Grid>
);

FullPage.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

FullPage.defaultProps = {
  children: <div />,
};

export default withStyles(styles)(FullPage);
