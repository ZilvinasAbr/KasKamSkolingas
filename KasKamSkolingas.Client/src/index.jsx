import React from 'react';
import ReactDom from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import HomePage from './components/home/HomePage';

const initialState = {};

const store = createStore(reducer, initialState, compose(
	applyMiddleware(thunkMiddleware),
	typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
));

/*const store = createStore(reducer,
  initialState,
  compose(
    applyMiddleware(
      thunkMiddleware
    ),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f
));*/

class App extends React.Component {
	constructor(props) {
	  super(props);
	}

	render() {
	  return (
			<div>
				<HomePage />
			</div>
	  );
	}
}

ReactDom.render(
	(
		<Provider store={store}>
			<App />
		</Provider>
	),
	document.getElementById('app')
);