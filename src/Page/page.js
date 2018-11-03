import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Sidebar from '../Sidebar';

const Page = ({ children }) => (
  <Grid container spacing={24}>
    <Grid item lg={4} xl={3}>
      <Sidebar />
    </Grid>
    <Grid item lg={1} />
    <Grid item lg={6} xl={8}>
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
