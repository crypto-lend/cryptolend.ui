// IMPORT PACKAGE REFERENCES

import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// IMPORT PROJECT REFERENCES

import LandingPage  from '../pages/LandingPage';
import HomePage  from '../pages/HomePage';
import  LoanRequest from '../pages/LoanRequest';
import  LoanOffer from '../pages/LoanOffer';
import  MyLoans  from '../pages/MyLoans';
import ViewAllRequests from '../pages/ViewAllRequests';
import ViewAllOffers from '../pages/ViewAllOffers';

// COMPONENT

export const AppRouter = () => (
  <BrowserRouter>
    <Fragment>
      <Switch>
        <Route path='/' component={LandingPage}  exact={true}/>
        <Route path='/home' component={HomePage}/>
        <Route path='/myloans' component={MyLoans} />
        <Route path='/request' component={LoanRequest} />
        <Route path='/offer' component={LoanOffer} />
        <Route path='/view-requests' component={ViewAllRequests} />
        <Route path='/view-offers' component={ViewAllOffers} />
        <Redirect to='/' />
      </Switch>
    </Fragment>
  </BrowserRouter>
);
