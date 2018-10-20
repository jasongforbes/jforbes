import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Sidebar from '../Sidebar';

const Page = ({
  children,
}) => (
  <Grid container spacing={24}>
    <Grid item xs={3}>
      <Sidebar />
    </Grid>
    <Grid item xs={9}>
      {children}
    </Grid>
  </Grid>
);

Page.propTypes = {
  children: PropTypes.node,
};

Page.defaultProps = {
  children: (<div />),
};

export default Page;
