import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './Footer';
import FullPage, { withFullPage } from './FullPage';
import Page from './Page';
import PathNotFound from './pathNotFound';
import ScrollToTop from './ScrollToTop';
import rootReducer from './reducers';
import withTracker from './withTracker';
import postList from './Posts/posts.json';
import './App.css';

const Privacy = withTracker(lazy(() => import('./Privacy')));

require('typeface-abril-fatface');
require('typeface-inconsolata');
require('typeface-montserrat');

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    h1: {
      fontFamily: 'Abril Fatface',
      color: 'white',
      fontSize: '72px',
      textTransform: 'uppercase',
    },
    h3: {
      fontFamily: 'Inconsolata',
      color: 'rgba(8, 20, 29, 1.0)',
      fontSize: '1.5em',
      lineHeight: '1em',
      marginBottom: '1em',
      textTransform: 'uppercase',
    },
    h4: {
      fontFamily: 'Montserrat',
      color: 'rgba(8, 20, 29, 1.0)',
      fontSize: '1.3125em',
      lineHeight: '1.142857142857143em',
      marginBottom: '1.142857142857143em',
    },
    h5: {
      fontFamily: 'Montserrat',
      color: 'rgba(8, 20, 29, 1.0)',
      fontSize: '1.125em',
      lineHeight: '1.333333333333333em',
      marginBottom: '0.6666666666666667em',
    },
    h6: {
      fontFamily: 'Montserrat',
      color: 'rgba(8, 20, 29, 1.0)',
      fontSize: '1em',
      lineHeight: '1.5em',
      marginBottom: '1.5em',
    },
    subtitle1: {
      fontFamily: 'Inconsolata',
      color: 'rgba(8, 20, 29, 0.6)',
      fontSize: '0.75em',
      marginTop: '-1.5em',
      marginBottom: '1.5em',
    },
    body1: {
      fontFamily: 'Montserrat',
      color: '#6B6B6B',
      fontSize: '1em',
      lineHeight: '1.5em',
      marginBottom: '1.5em',
    },
    button: {
      fontFamily: 'Montserrat',
      color: 'rgba(9, 51, 79, 1.0)',
      fontSize: '1em',
      lineHeight: '1em',
      textAlign: 'center',
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      textDecoration: 'none',
    },
    caption: {
      fontFamily: 'Montserrat',
      fontSize: '0.75em',
    },
    list: {
      fontFamily: 'Montserrat',
      color: '#6B6B6B',
      fontSize: '1em',
      lineHeight: '1.5em',
    },
  },
  palette: {
    primary: {
      light: 'rgba(9, 51, 79, 0.6)',
      main: 'rgba(9, 51, 79, 1.0)',
    },
    secondary: {
      main: '#FFF',
    },
  },
});

/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */

const styles = () => ({
  app: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    minHeight: '100vh',
    justifyContent: 'space-between',
  },
});

const fallback = (
  <FullPage>
    <Typography variant="body1">Loading...</Typography>
  </FullPage>
);

const App = ({ classes }) => (
  <React.Fragment>
    <CssBaseline />
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <ScrollToTop>
            <div className={classes.app}>
              <React.Fragment>
                <Suspense fallback={fallback}>
                  <Switch>
                    <Route
                      path="/(about|projects|page/[0-9]+)?"
                      exact
                      component={withTracker(Page)}
                    />
                    <Route path="/privacy" component={Privacy} />
                    {postList.map(post => (
                      <Route
                        path={post.slug}
                        key={post.slug}
                        component={withTracker(
                          withFullPage(lazy(() => import(`./Posts/${post.path}`)))
                        )}
                      />
                    ))}
                    <Route component={withTracker(PathNotFound)} />
                  </Switch>
                </Suspense>
              </React.Fragment>
              <Footer />
            </div>
          </ScrollToTop>
        </Router>
      </MuiThemeProvider>
    </Provider>
  </React.Fragment>
);

App.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(App);
