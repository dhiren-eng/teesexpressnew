import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from './App';
import ReactDom from 'react-dom';
import React from 'react';
import StateProvider from './Context/Store';
import { configureAmplify } from './services';
//const composeEnhancers =
//window.__REDUX_DEV_TOOLS_EXTENSION_COMPOSE__ || compose;

configureAmplify();

ReactDom.render(
  <StateProvider>
    <App />
  </StateProvider>,
  document.querySelector('#root')
);
