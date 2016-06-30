import {Map} from 'immutable';

const initialState = Map({
  isSignedIn: false,
  currentPage: "Landing"
});

function login(state) {
  return state.set('isLoggedIn', true);
}

function logoff(state) {
  return state.set('isLoggedIn', false);
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'LOGGED_IN':
      return login(state);
    case 'LOGGED_OFF':
      return logoff(state);
  }
    return state;
}