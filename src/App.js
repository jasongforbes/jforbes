import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';

const App = () => (
  <React.Fragment>
    <Router>
      <Route exact path="/" component={Home} />
    </Router>
  </React.Fragment>
);

export default App;
