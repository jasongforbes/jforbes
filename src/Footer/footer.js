import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  footer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#D8D8D8',
    height: 64,
  },
  copyright: {
    color: '#979797',
  },
  privacyLink: {
    ...theme.typography.button,
    fontSize: '0.75em',
    color: '#979797',
  },
});

const Footer = ({ classes }) => (
  <div className={classes.footer}>
    <Typography variant="caption" className={classes.copyright}>
      Copyright © 2017 Jason Forbes
    </Typography>
    <Link to="/privacy" className={classes.privacyLink}>
      Privacy
    </Link>
  </div>
);

Footer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Footer);
