import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Projects from './Projects';

require('typeface-abril-fatface');
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
        <div className={classes.app}>
        <React.Fragment>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/projects" component={Projects} />
        </React.Fragment>
        </div>
      </Router>
    </MuiThemeProvider>
  </React.Fragment>
);

App.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(App);
