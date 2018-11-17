import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

const styles = theme => ({
  social: {
    display: 'flex',
    margin: '15px -14.25px',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      padding: '0px',
      justifyContent: 'flex-end',
      maxWidth: 'none',
    },
  },
  socialImage: {
    width: '36px',
    height: '36px',
    margin: '0px 14.25px',
  },
});

const Social = ({ classes, email, instagram, twitter, width }) => (
  <div className={classes.social}>
    <a href="https://twitter.com/JasonForbes" className={classes.socialImage}>
      <SvgIcon color={isWidthDown('sm', width) ? 'secondary' : 'primary'} fontSize="large">
        {twitter}
      </SvgIcon>
    </a>
    <a href="https://www.instagram.com/jasongforbes" className={classes.socialImage}>
      <SvgIcon color={isWidthDown('sm', width) ? 'secondary' : 'primary'} fontSize="large">
        {instagram}
      </SvgIcon>
    </a>
    <a href="mailto:jason@jforbes.io" className={classes.socialImage}>
      <SvgIcon color={isWidthDown('sm', width) ? 'secondary' : 'primary'} fontSize="large">
        {email}
      </SvgIcon>
    </a>
  </div>
);

Social.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  email: PropTypes.node.isRequired,
  instagram: PropTypes.node.isRequired,
  twitter: PropTypes.node.isRequired,
  width: PropTypes.string.isRequired,
};

export default withStyles(styles)(withWidth()(Social));
