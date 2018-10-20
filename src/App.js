import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
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

const App = () => (
  <React.Fragment>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <Router>
        <React.Fragment>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/projects" component={Projects} />
        </React.Fragment>
      </Router>
    </MuiThemeProvider>
  </React.Fragment>
);

export default App;
