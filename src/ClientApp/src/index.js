import 'semantic-ui/dist/semantic.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './Store';
import App from './App';

const rootElement = document.getElementById('root');
const store = configureStore(window.initialReduxState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement);

