import {Map, fromJS} from 'immutable';

export const initialState = Map({
  isLoggedIn: false,
  currentPage: 'Landing'
});

function setInitialState() {
  return initialState;
}

function login(state) {
  return state.merge({
    'isLoggedIn': true,
    'currentPage': 'Landing'
  });
}

function logoff(state) {
  return state.merge({
    'isLoggedIn': false,
    'currentPage': 'Landing'
  });
}

function setCurrentPage(state, page) {
  if(state.get('isLoggedIn') === true) {
    if(page === 'Login' || page === 'Register') {
      return state;
    }
  }

  return state.set('currentPage', page);
}

function receiveUserData(state, data) {
  return state.set('userData', fromJS(data));
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
    case 'RECEIVE_USER_DATA':
      return receiveUserData(state, action.data);
  }
  
  return state;
}