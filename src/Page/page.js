import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import About from '../About';
import Header from '../Header';
import Home from '../Home';
import MobileHeader from '../MobileHeader';
import Projects from '../Projects';
import Sidebar from '../Sidebar';

const styles = theme => ({
  content: {
    margin: '80px 0px',
    [theme.breakpoints.down('sm')]: {
      margin: '40px 0px',
    },
  },
});

const Page = ({ classes }) => (
  <Grid container spacing={0}>
    <Hidden smDown>
      <Grid item md={3}>
        <Sidebar />
      </Grid>
    </Hidden>
    <Hidden only={['xs', 'md', 'lg', 'xl']}>
      <Grid item sm={12}>
        <Header />
      </Grid>
    </Hidden>
    <Hidden smUp>
      <Grid item xs={12}>
        <MobileHeader />
      </Grid>
    </Hidden>
    <Hidden smDown>
      <Grid item xs={1} xl={2} />
    </Hidden>
    <Grid item xs={12} md={7} xl={5}>
      <div className={classes.content}>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/projects" component={Projects} />
      </div>
    </Grid>
    <Hidden smDown>
      <Grid item xs={1} xl={2} />
    </Hidden>
  </Grid>
);

Page.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Page);
