import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import headshot from '../images/headshot_wide.jpg';
import { TwitterInner, InstagramInner, EmailInner } from '../icons';
import HeaderImage from './headerImage';
import Social from './social';
import { SubscribeButton } from '../Subscribe';

const styles = theme => ({
  callToAction: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '40px 0px 0px',
  },
  links: {
    display: 'flex',
    width: '100%',
    maxWidth: '300px',
    [theme.breakpoints.up('md')]: {
      maxWidth: '396px',
    },
    justifyContent: 'space-between',
  },
  link: {
    ...theme.typography.button,
    color: theme.palette.primary.light,
    padding: '12px 0px',
    '&.active': {
      color: theme.palette.primary.main,
    },
  },
});

const Header = ({ classes }) => (
  <React.Fragment>
    <HeaderImage headshot={headshot}>
      <Social twitter={<TwitterInner />} instagram={<InstagramInner />} email={<EmailInner />} />
    </HeaderImage>
    <Grid container>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <div className={classes.callToAction}>
          <div className={classes.links}>
            <NavLink className={classes.link} to="/" exact>
              Writings
            </NavLink>
            <NavLink className={classes.link} to="/about">
              About
            </NavLink>
            <NavLink className={classes.link} to="/projects">
              Projects
            </NavLink>
          </div>
          <SubscribeButton contained />
        </div>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  </React.Fragment>
);

Header.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Header);
