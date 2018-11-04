import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Header from '../Header';
import Sidebar from '../Sidebar';

const Page = ({ children }) => (
  <Grid container spacing={0}>
    <Hidden mdDown>
      <Grid item lg={3}>
        <Sidebar />
      </Grid>
    </Hidden>
    <Hidden lgUp>
      <Grid item sm={12}>
        <Header />
      </Grid>
    </Hidden>
    <Grid item lg={1} />
    <Grid item lg={8}>
      {children}
    </Grid>
    <Grid item lg={1} />
  </Grid>
);

Page.propTypes = {
  children: PropTypes.node,
};

Page.defaultProps = {
  children: <div />,
};

export default Page;
