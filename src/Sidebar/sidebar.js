import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import headshot from '../images/headshot.jpg';
import { TwitterRound, InstagramRound, EmailRound } from '../icons';

const styles = theme => ({
  header: {
    position: 'relative',
    minHeight: '483px',
    minWidth: '483px',
    overflow: 'hidden',
    [theme.breakpoints.down('lg')]: {
      minHeight: '417px',
      minWidth: '417px',
    },
  },
  headerImage: {
    display: 'block',
    width: '100%',
  },
  headerTextBackground: {
    position: 'absolute',
    bottom: '0px',
    width: '100%',
    backgroundColor: 'rgba(25, 25, 25, 0.65)',
    zIndex: 2,
  },
  headerText: {
    padding: '15px 24px 15px 0px',
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    padding: '128px 4px',
  },
  link: {
    ...theme.typography.button,
    color: theme.palette.primary.light,
    padding: '12px 0px',
    '&.active': {
      color: theme.palette.primary.main,
    },
  },
  sidebarText: {
    padding: '0px 0px 0px 159px',
    [theme.breakpoints.down('lg')]: {
      padding: '0px 0px 0px 106px',
    },
  },
  social: {
    display: 'flex',
    padding: '24px 138px 128px 5px',
    maxWidth: '165px',
    margin: '0px -14.25px',
    justifyContent: 'space-between',
  },
  socialImage: {
    width: '36px',
    height: '36px',
    margin: '0px 14.25px',
  },
});

const Sidebar = ({ classes }) => (
  <React.Fragment>
    <div className={classes.header}>
      <img className={classes.headerImage} src={headshot} alt="Headshot" />
      <div className={[classes.headerTextBackground, classes.sidebarText].join(' ')}>
        <Typography variant="h1" className={classes.headerText}>
          Jason Forbes
        </Typography>
      </div>
    </div>
    <div className={classes.sidebarText}>
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
      <div className={classes.social}>
        <a href="https://twitter.com/JasonForbes" className={classes.socialImage}>
          <SvgIcon color="primary" fontSize="large">
            <TwitterRound />
          </SvgIcon>
        </a>
        <a href="https://www.instagram.com/jasongforbes" className={classes.socialImage}>
          <SvgIcon color="primary" fontSize="large">
            <InstagramRound />
          </SvgIcon>
        </a>
        <a href="mailto:jason@jforbes.io" className={classes.socialImage}>
          <SvgIcon color="primary" fontSize="large">
            <EmailRound />
          </SvgIcon>
        </a>
      </div>
    </div>
  </React.Fragment>
);

Sidebar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Sidebar);
