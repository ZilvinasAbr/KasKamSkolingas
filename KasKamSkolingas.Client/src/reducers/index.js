import {Map, fromJS} from 'immutable';
import { combineReducers } from 'redux';
import { homePage, initialState as homePageInitial } from './homePage';
import { oldReducer } from './oldReducer';
import { landingPage, initialState as landingPageInitial } from './landingPage';
import { reducer as formReducer} from 'redux-form';
import { routerReducer } from 'react-router-redux';

const reducers = {
  homePage,
  landingPage,
  form: formReducer,
  routing: routerReducer
};

const initialState = {
  homePage: homePageInitial,
  landingPage: landingPageInitial
}

const reducer = combineReducers(reducers);

export {
  reducer,
  initialState
};
