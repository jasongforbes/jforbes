import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  content: {
    margin: '80px 0px',
    [theme.breakpoints.down('sm')]: {
      margin: '40px 0px',
    },
  },
  link: {
    ...theme.typography.button,
    color: theme.palette.primary.light,
    textAlign: 'left',
    lineHeight: '2em',
  },
});

const Projects = ({ classes }) => (
  <div className={classes.content}>
    <Helmet>
      <title>Projects - Jason Forbes</title>
      <meta
        name="description"
        content="A List of personal side-projects, including jforbes.io and dorian.js."
      />
    </Helmet>
    <Grid container spacing={0}>
      <Hidden mdUp>
        <Grid item xs={1} />
      </Hidden>
      <Grid item xs={10} md={12}>
        <Typography variant="h3">Projects</Typography>
        <div>
          <a href="https://github.com/jasongforbes/jforbes.io" className={classes.link}>
            jforbes.io
          </a>
          <Typography variant="body1">
            A personal blog and responsive landing page written in React.
          </Typography>
        </div>
        <div>
          <a href="https://github.com/jasongforbes/dorian-js" className={classes.link}>
            Dorian.js
          </a>
          <Typography variant="body1">
            A simple blogging platform which converts user written markdown files into HTML. It is
            available via the MIT OpenSource License. This project started as a way to practice
            React and front-end web-development. The aim was to make an extensible landing-page
            framework while retaining simplicity.
          </Typography>
        </div>
      </Grid>
      <Hidden mdUp>
        <Grid item xs={1} />
      </Hidden>
    </Grid>
  </div>
);

Projects.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Projects);
