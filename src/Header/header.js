import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import headshot from '../images/headshot_wide.jpg';
import { TwitterInner, InstagramInner, EmailInner } from '../icons';
import HeaderImage from './headerImage';

const styles = theme => ({
  links: {
    display: 'flex',
    margin: '40px 0px',
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
  social: {
    display: 'flex',
    margin: '15px -14.25px',
    justifyContent: 'flex-end',
  },
  socialImage: {
    width: '36px',
    height: '36px',
    margin: '0px 14.25px',
  },
});

const Header = ({ classes }) => (
  <React.Fragment>
    <HeaderImage headshot={headshot}>
      <div className={classes.social}>
        <a href="https://twitter.com/JasonForbes" className={classes.socialImage}>
          <SvgIcon color="secondary" fontSize="large">
            <TwitterInner />
          </SvgIcon>
        </a>
        <a href="https://www.instagram.com/jasongforbes" className={classes.socialImage}>
          <SvgIcon color="secondary" fontSize="large">
            <InstagramInner />
          </SvgIcon>
        </a>
        <a href="mailto:jason@jforbes.io" className={classes.socialImage}>
          <SvgIcon color="secondary" fontSize="large">
            <EmailInner />
          </SvgIcon>
        </a>
      </div>
    </HeaderImage>
    <Grid container>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <div className={classes.links}>
          <NavLink className={classes.link} to="/" exact>
            Writing
          </NavLink>
          <NavLink className={classes.link} to="/about">
            About
          </NavLink>
          <NavLink className={classes.link} to="/projects">
            Projects
          </NavLink>
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
