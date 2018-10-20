import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = ({
  footer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#D8D8D8',
    height: 64,
    margin: '0px -12px 0px 0px',
  },
  copyright: {
    color: '#979797',
  },
  privacyLink: {
    fontFamily: 'Montserrat Semibold',
    fontSize: '0.75em',
    color: '#979797',
    textDecoration: 'none',
    textTransform: 'uppercase',
  },
});

const Footer = ({
  classes,
}) => (
  <div className={classes.footer}>
    <Typography variant="caption" className={classes.copyright}>
      Copyright © 2017 Jason Forbes
    </Typography>
    <Link to="/privacy" className={classes.privacyLink}>Privacy</Link>
  </div>
);

Footer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Footer);
