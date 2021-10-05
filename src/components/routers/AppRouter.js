// IMPORT PACKAGE REFERENCES

import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// IMPORT PROJECT REFERENCES

import LandingPage from "../pages/LandingPage";
import HomePage from "../pages/HomePage";
import LoanRequest from "../pages/LoanRequest";
import LoanOffer from "../pages/LoanOffer";
import MyLoans from "../pages/MyLoans";
import ViewAllRequests from "../pages/ViewAllRequests";
import ViewAllOffers from "../pages/ViewAllOffers";
import Register from "../pages/Register";
import Login from "../pages/Login";
import EmailForm from "../pages/EmailForm";
import InstitutionalCredit from "../pages/InstitutionalCredit";
import Events from "../pages/landingpagecomponents/Events";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import RegisterForm from "../pages/RegisterForm";
import CompanyRegister from "../pages/CompanyRegister";
import WhiteLabelRegister from "../pages/WhiteLabelRegister";
import PrivacyPolicy from "../pages/PrivacyPolicy";
// COMPONENT

export const AppRouter = () => (
  <BrowserRouter>
    <Fragment>
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        <Route path="/home" component={HomePage} />
        <Route path="/myloans" component={MyLoans} />
        <Route path="/request" component={LoanRequest} />
        <Route path="/offer" component={LoanOffer} />
        <Route path="/view-requests" component={ViewAllRequests} />
        <Route path="/view-offers" component={ViewAllOffers} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/register-form" component={RegisterForm} />
        <Route
          path="/enterprise/institutional-credit"
          component={InstitutionalCredit}
        />
        <Route
          path="/enterprise/ico-ieo-sto-company"
          component={CompanyRegister}
        />
        <Route path="/enterprise/white-label" component={WhiteLabelRegister} />

        <Route path="/company/events" component={Events} />
        <Route path="/company/about-us" component={AboutUs} />
        <Route path="/company/connect-with-us" component={ContactUs} />
        <Route path="/support" component={ContactUs} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/:menuItem/:subItem" exact component={EmailForm} />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  </BrowserRouter>
);
