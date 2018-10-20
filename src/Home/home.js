import React from 'react';
import Grid from '@material-ui/core/Grid';
import Sidebar from '../Sidebar';

const Home = () => (
  <Grid container spacing={24}>
    <Grid item xs={3}>
      <Sidebar />
    </Grid>
  </Grid>
);

export default Home;
