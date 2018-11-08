import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import { Link, Redirect } from 'react-router-dom';
import Summary from './summary';
import posts from './posts.json';

const linkCollectionStyle = theme => ({
  margin: '0px 0px 60px 0px',
  display: 'flex',
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    margin: '0px 0px 30px 0px',
  },
});

const styles = theme => ({
  aboutImage: {
    display: 'block',
    width: '100%',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    height: '0',
    paddingTop: '40.598690364%',
    margin: '40px 0px',
  },
  content: {
    margin: '80px 0px',
    [theme.breakpoints.down('sm')]: {
      margin: '40px 0px',
    },
  },
  link: {
    ...theme.typography.button,
    color: theme.palette.primary.main,
  },
  links: {
    ...linkCollectionStyle(theme),
  },
  linksRight: {
    ...linkCollectionStyle(theme),
    justifyContent: 'flex-end',
  },
  listItem: theme.typography.list,
  right: {
    alignSelf: 'flex-end',
  },
});

const numPostsPerPage = 5;
const numPages = Math.ceil(posts.length / numPostsPerPage);

const Posts = ({ classes, match }) => {
  const page = Number(match.params.id) || 0;
  const startPost = numPostsPerPage * page;
  if (page >= numPages) {
    return <Redirect to="/error404" />;
  }
  return (
    <React.Fragment>
      <div className={classes.content}>
        <Grid container spacing={0}>
          {posts.slice(startPost, Math.min(startPost + numPostsPerPage, posts.length)).map(post => (
            <React.Fragment key={post.slug}>
              <Hidden mdUp>
                <Grid item xs={1} />
              </Hidden>
              <Grid item xs={10} md={12}>
                <Summary {...post} />
              </Grid>
              <Hidden mdUp>
                <Grid item xs={1} />
              </Hidden>
            </React.Fragment>
          ))}
        </Grid>
      </div>
      <Grid container spacing={0}>
        <Hidden mdUp>
          <Grid item xs={1} />
        </Hidden>
        <Grid item xs={10} md={12}>
          <div className={page > 0 ? classes.links : classes.linksRight}>
            {page > 0 && (
              <Link to={`/page/${page - 1}`} className={classes.link}>
                Previous
              </Link>
            )}
            {page < numPages - 1 && (
              <Link to={`/page/${page + 1}`} className={classes.link}>
                Next
              </Link>
            )}
          </div>
        </Grid>
        <Hidden mdUp>
          <Grid item xs={1} />
        </Hidden>
      </Grid>
    </React.Fragment>
  );
};

Posts.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.number,
    }).isRequired,
  }).isRequired,
};

export default withStyles(styles)(Posts);
