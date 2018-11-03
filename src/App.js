import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import About from './About';
import Footer from './Footer';
import Home from './Home';
import Privacy from './Privacy';
import Projects from './Projects';
import ScrollToTop from './ScrollToTop';
import withTracker from './withTracker';

import './App.css';

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

const styles = () => ({
  app: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    minHeight: '100vh',
    justifyContent: 'space-between',
  },
});

const App = ({ classes }) => (
  <React.Fragment>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <Router>
        <ScrollToTop>
          <div className={classes.app}>
            <React.Fragment>
              <Route exact path="/" component={withTracker(Home)} />
              <Route path="/about" component={withTracker(About)} />
              <Route path="/projects" component={withTracker(Projects)} />
              <Route path="/privacy" component={withTracker(Privacy)} />
            </React.Fragment>
            <Footer />
          </div>
        </ScrollToTop>
      </Router>
    </MuiThemeProvider>
  </React.Fragment>
);

App.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(App);
