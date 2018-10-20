import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';

require('typeface-abril-fatface');

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
        <Route exact path="/" component={Home} />
      </Router>
    </MuiThemeProvider>
  </React.Fragment>
);

export default App;
