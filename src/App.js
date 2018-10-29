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
      color: '#08141D',
      fontSize: '36px',
    },
    subtitle1: {
      fontFamily: 'Inconsolata',
      color: '#08141D',
      fontSize: '18px',
    },
    body1: {
      fontFamily: 'Montserrat',
      color: '#6B6B6B',
      fontSize: '24px',
      lineHeight: '36px',
    },
    caption: {
      fontFamily: 'Montserrat',
      fontSize: '0.75em',
    },
  },
  palette: {
    primary: {
      light: 'rgba(9, 51, 79, 0.6)',
      main: 'rgba(9, 51, 79, 1.0)',
    },
  },
});

const styles = () => ({
  app: {
    display: 'flex',
    width: '100%',
    padding: '0px 12px 0px 0px',
    flexDirection: 'column',
    minHeight: '100vh',
    justifyContent: 'space-between',
  },
});

const App = ({
  classes,
}) => (
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
