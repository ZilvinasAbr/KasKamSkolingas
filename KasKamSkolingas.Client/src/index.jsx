import React from 'react';
import ReactDom from 'react-dom';
import Axios from 'axios';
import Landing from './components/Landing';
import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import {createStore} from 'redux';
import reducer from './reducer';

const store = createStore(reducer);


class App extends React.Component {
	constructor(props) {
	  super(props);
	}

	render() {
	  return (
      <Router history={hashHistory}>
        <Route path='/' component={Layout}>
          <IndexRoute component={Landing} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </Route>
      </Router>
	  );
	}
}

ReactDom.render(
	<App />,
	document.getElementById('app')
);