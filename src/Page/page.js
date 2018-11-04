import React from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { Route } from 'react-router-dom';
import About from '../About';
import Header from '../Header';
import Home from '../Home';
import MobileHeader from '../MobileHeader';
import Projects from '../Projects';
import Sidebar from '../Sidebar';

const Page = () => (
  <Grid container spacing={0}>
    <Hidden mdDown>
      <Grid item lg={3}>
        <Sidebar />
      </Grid>
    </Hidden>
    <Hidden only={['xs', 'lg', 'xl']}>
      <Grid item sm={12}>
        <Header />
      </Grid>
    </Hidden>
    <Hidden smUp>
      <Grid item xs={12}>
        <MobileHeader />
      </Grid>
    </Hidden>
    <Grid item lg={1} />
    <Grid item lg={8}>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/projects" component={Projects} />
    </Grid>
    <Grid item lg={1} />
  </Grid>
);

export default Page;
