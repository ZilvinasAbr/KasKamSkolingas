import {Map, fromJS} from 'immutable';
import { combineReducers } from 'redux';
import { homePage } from './homePage';
import { oldReducer } from './oldReducer';
import { reducer as formReducer} from 'redux-form';

const reducers = {
  homePage: homePage,
  form: formReducer
};

export default combineReducers(reducers);

/*export default combineReducers({
  homePage,
  oldReducer
});*/

//export default homePage;