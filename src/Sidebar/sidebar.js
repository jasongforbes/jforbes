import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import headshot from '../images/headshot.jpg';

const styles = () => ({
  header: {
    position: 'relative',
    height: '483px',
    width: '483px',
  },
  headerImage: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  headerTextBackground: {
    position: 'absolute',
    bottom: '0px',
    width: '100%',
    height: '174px',
    backgroundColor: 'rgba(25, 25, 25, 0.65)',
    zIndex: 2,
  },
  headerText: {
    padding: '15px 24px 15px 159px',
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    padding: '100px 163px',
  },
  link: {
    fontFamily: 'Montserrat',
    color: 'rgba(9, 51, 79, 0.6)',
    fontSize: '24px',
    padding: '12px 0px',
    textTransform: 'uppercase',
    textDecoration: 'none',
    '&.active': {
      color: 'rgba(9, 51, 79, 1.0)',
    },
  },
});

const Sidebar = ({
  classes,
}) => (
  <React.Fragment>
    <div className={classes.header}>
      <img className={classes.headerImage} src={headshot} alt="Headshot" />
      <div className={classes.headerTextBackground}>
        <Typography variant="h1" className={classes.headerText}>
          Jason Forbes
        </Typography>
      </div>
    </div>
    <div className={classes.links}>
      <NavLink className={classes.link} to="/" exact>Writing</NavLink>
      <NavLink className={classes.link} to="/about">About</NavLink>
      <NavLink className={classes.link} to="/projects">Projects</NavLink>
    </div>
  </React.Fragment>
);

Sidebar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Sidebar);
