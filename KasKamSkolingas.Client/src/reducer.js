import {Map} from 'immutable';

export const initialState = Map({
  isLoggedIn: false,
  currentPage: 'Landing'
});

function setInitialState() {
  return initialState;
}

function login(state) {
  return state.set('isLoggedIn', true);
}

function logoff(state) {
  return state.set('isLoggedIn', false);
}

function setCurrentPage(state, page) {
  if(!state.get('isLoggedIn')) {
    return state.set('currentPage', page);
  }
  
  return state;
}

export function reducer(state = initialState, action) {
  switch(action.type) {
    case 'SET_INITIAL_STATE':
      return setInitialState();
    case 'LOGGED_IN':
      return login(state);
    case 'LOGGED_OFF':
      return logoff(state);
    case 'SET_CURRENT_PAGE':
      return setCurrentPage(state, action.page);
  }
  
  return state;
}