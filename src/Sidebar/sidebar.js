import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import headshot from '../images/headshot.jpg';
import { TwitterRound, InstagramRound, EmailRound } from '../icons';
import { HeaderImage, Social } from '../Header';

const styles = theme => ({
  link: {
    ...theme.typography.button,
    color: theme.palette.primary.light,
    '&.active': {
      color: theme.palette.primary.main,
    },
  },
  row: {
    margin: '12px 0px',
  },
  sidebar: {
    margin: '100px 0px',
  },
});

const Sidebar = ({ classes }) => (
  <React.Fragment>
    <HeaderImage headshot={headshot} />
    <Grid container spacing={0} className={classes.sidebar}>
      <Grid item xs={3} />
      <Grid item xs={9} className={classes.row}>
        <NavLink className={classes.link} to="/" exact>
          Writing
        </NavLink>
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9} className={classes.row}>
        <NavLink className={classes.link} to="/about">
          About
        </NavLink>
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9} className={classes.row}>
        <NavLink className={classes.link} to="/projects">
          Projects
        </NavLink>
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9}>
        <Social twitter={<TwitterRound />} instagram={<InstagramRound />} email={<EmailRound />} />
      </Grid>
    </Grid>
  </React.Fragment>
);

Sidebar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Sidebar);
