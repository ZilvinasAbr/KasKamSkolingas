import {Map, fromJS} from 'immutable';
import { combineReducers } from 'redux';
import { homePage } from './homePage';
import { oldReducer } from './oldReducer';

/*export default combineReducers({
  homePage,
  oldReducer
});*/

export default homePage;