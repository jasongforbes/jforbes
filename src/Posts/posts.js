import React from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Summary from './summary';
import posts from './posts.json';

export default () => (
  <Grid container spacing={0}>
    {posts.map(post => (
      <React.Fragment key={post.slug}>
        <Hidden mdUp>
          <Grid item xs={1} />
        </Hidden>
        <Grid item xs={10} md={12}>
          <Summary {...post} />
        </Grid>
        <Hidden mdUp>
          <Grid item xs={1} />
        </Hidden>
      </React.Fragment>
    ))}
  </Grid>
);
