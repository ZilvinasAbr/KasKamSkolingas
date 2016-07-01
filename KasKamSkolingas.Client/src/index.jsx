import React from 'react';
import ReactDom from 'react-dom';
import Axios from 'axios';
import Landing from './components/Landing';
import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './reducer';
import { TabContainer } from './components/Tab';
import { PageContainer } from './components/Page';
import { setInitialState } from './action_creators';

const store = createStore(reducer);

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