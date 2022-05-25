import './App.scss';
import 'antd/dist/antd.min.css';

import React from 'react';
import Router from './router'

import './core/utils/http'
import { store, persistor } from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router></Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
