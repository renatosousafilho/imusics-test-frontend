import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'

import oauthReducer from './oauthReducer'

import { ActionCableProvider } from 'react-actioncable-provider';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { API_WS_ROOT } from './constants';

const reducers = combineReducers({
  oauth: oauthReducer
})

ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <ActionCableProvider url={API_WS_ROOT}>
      <App />
    </ActionCableProvider>
  </Provider>,
  document.getElementById('root'));
serviceWorker.unregister();
