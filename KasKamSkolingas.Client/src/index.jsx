import React from 'react';
import ReactDom from 'react-dom';
import Axios from 'axios';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import { reducer, initialState } from './reducer';
import { TabContainer } from './components/Tab';
import { PageContainer } from './components/Page';
import { setInitialState } from './action_creators';

const store = createStore(reducer, initialState, compose(
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f
))

store.dispatch(setInitialState());


class App extends React.Component {
	constructor(props) {
	  super(props);
	}

	render() {
	  return (
			<div>
				<TabContainer />
        <PageContainer />
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