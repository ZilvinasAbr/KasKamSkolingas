import {
  REQUEST_IS_LOGGED_IN,
  RECEIVE_IS_LOGGED_IN
} from '../actionCreators/commonActionCreators';

export const initialState = {};

function requestIsLoggedIn(state) {
  return state;
}

function receiveIsLoggedIn(state, success) {
  return state;
}

export function landingPage(state = initialState, action) {
  switch (action.type) {
    case REQUEST_IS_LOGGED_IN:
      return requestIsLoggedIn(state);
    case RECEIVE_IS_LOGGED_IN:
      return receiveIsLoggedIn(state, action.success);
    default:
      return state;
  }
}