import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import { render } from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import reducer from './reducers/index';
import HomePage from './components/home/HomePage';
import LandingPage from './components/landing/LandingPage';

injectTapEventPlugin();

import './index.css';

const initialState = {
  landingPage: {},
  homePage: {},
  form: {}
};

const store = createStore(reducer, initialState, compose(
	applyMiddleware(routerMiddleware(browserHistory), thunkMiddleware),
	typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
));

const history = syncHistoryWithStore(browserHistory, store);

render(
	(
  <MuiThemeProvider>
    <Provider store={store}>
      { /* Tell the Router to use our enhanced history */}
      <Router history={history}>
        <Route path="/" component={LandingPage} />
        <Route path="/home" component={HomePage} />
      </Router>
    </Provider>
  </MuiThemeProvider>
	),
	document.getElementById('app')
);
