import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  link: {
    ...theme.typography.button,
    textAlign: 'left',
  },
  linkColor: {
    color: 'rgba(9, 51, 79, 1.0)',
  },
  summary: {
    margin: '50px 0px',
  },
});

const Summary = ({ date, classes, slug, summary, title }) => (
  <div className={classes.summary}>
    <Link to={slug} className={classes.link}>
      <Typography variant="h3" className={classes.linkColor}>
        {title}
      </Typography>
    </Link>
    <Typography variant="subtitle1">{date}</Typography>
    <Typography variant="body1">{`${summary}...`}</Typography>
  </div>
);

Summary.propTypes = {
  date: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  slug: PropTypes.string.isRequired,
  summary: PropTypes.string,
  title: PropTypes.string,
};

Summary.defaultProps = {
  date: '',
  summary: '',
  title: '',
};

export default withStyles(styles)(Summary);
