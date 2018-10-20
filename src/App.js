import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';

const App = () => (
  <React.Fragment>
    <CssBaseline />
    <Router>
      <Route exact path="/" component={Home} />
    </Router>
  </React.Fragment>
);

export default App;
