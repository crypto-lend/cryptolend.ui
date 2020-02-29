// IMPORT PACKAGE REFERENCES

import { createStore, applyMiddleware } from 'redux';

// IMPORT MIDDLEWARE

import thunk from 'redux-thunk';

// IMPORT REDUCERS

import { AppReducer } from '../reducers/AppReducer';


// CONFIGURE STORE

export const createAppStore = () => {
  return createStore(AppReducer, applyMiddleware(thunk));
};
