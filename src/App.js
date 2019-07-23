import React  from 'react';
import './assets/vendor/font-awesome/css/font-awesome.css';
import './assets/vendor/nucleo/css/nucleo.css';
import './assets/css/argon.css';
import './App.css';

import { Provider } from 'react-redux';

import { createAppStore } from './components/state/stores/AppStore';

import { AppRouter } from './components/routers/AppRouter';

import { Web3Provider } from './components/Web3/Web3Provider';

const App = () => (
  <Provider store={createAppStore()}>
    <div >
      <Web3Provider />
      <AppRouter />
    </div>
  </Provider>
);
export default App;
