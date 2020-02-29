import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';


import { FetchAccountsReducer } from './fetchAccountsWeb3';
import { FetchNetworkReducer } from './fetchNetworkWeb3';


export const AppReducer = combineReducers({
  accounts: FetchAccountsReducer,
  network: FetchNetworkReducer,
});
