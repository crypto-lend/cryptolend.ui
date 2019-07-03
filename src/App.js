import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LandingPage from './components/LandingPage';
import MyLoans from './components/MyLoans';
import LoanRequest from './components/LoanRequest';

import './assets/vendor/font-awesome/css/font-awesome.css';
import './assets/vendor/nucleo/css/nucleo.css';
import './App.css';

class App extends Component {
  constructor(){
    super();

  }
  render() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={LandingPage} />
        <Route path="/myloans" exact component={MyLoans} />
        <Route path="/request-loan" exact component={LoanRequest} />

      </div>
    </Router>
  );
}
}

export default App;
