import React from 'react';
import { render } from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { reducer, initialState } from './reducers/index';
import HomePage from './components/home/HomePage';
import LandingPage from './components/landing/LandingPage';

import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

const store = createStore(reducer, initialState, compose(
	applyMiddleware(routerMiddleware(browserHistory), thunkMiddleware),
	typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
));

const history = syncHistoryWithStore(browserHistory, store);

render(
	(
		<Provider store={store}>
			{ /* Tell the Router to use our enhanced history */}
			<Router history={history}>
				<Route path="/" component={LandingPage} />
				<Route path="/home" component={HomePage} />
			</Router>
		</Provider>
	),
	document.getElementById('app')
);