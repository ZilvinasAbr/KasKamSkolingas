import {Map, fromJS} from 'immutable';
import { combineReducers } from 'redux';
import { homePage } from './homePage';
import { oldReducer } from './oldReducer';
import { landingPage } from './landingPage';
import { reducer as formReducer} from 'redux-form';
import { routerReducer } from 'react-router-redux';

const reducers = {
  homePage,
  landingPage,
  form: formReducer,
  routing: routerReducer
};

export default combineReducers(reducers);

/*export default combineReducers({
  homePage,
  oldReducer
});*/

//export default homePage;