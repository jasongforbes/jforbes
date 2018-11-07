import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
  summary: {
    margin: '50px 0px',
  },
};

const Summary = ({ date, classes, summary, title }) => (
  <div className={classes.summary}>
    <Typography variant="h3">{title}</Typography>
    <Typography variant="subtitle1">{date}</Typography>
    <Typography variant="body1">{summary}</Typography>
  </div>
);

Summary.propTypes = {
  date: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  summary: PropTypes.string,
  title: PropTypes.string,
};

Summary.defaultProps = {
  date: '',
  summary: '',
  title: '',
};

export default withStyles(styles)(Summary);
