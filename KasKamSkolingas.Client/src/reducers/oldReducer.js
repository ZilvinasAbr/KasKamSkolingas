// import {Map, fromJS} from 'immutable';

export const initialState = {
  isLoggedIn: false,
  currentPage: 'Landing'
};

function setInitialState() {
  return initialState;
}

function login(state) {
  return Object.assign({}, state, {
    isLoggedIn: true,
    currentPage: 'Landing'
  });
}

function logoff(state) {
  return Object.assign({}, state, {
    isLoggedIn: false,
    currentPage: 'Landing'
  });
}

function setCurrentPage(state, page) {
  if (state.isLoggedIn === true) {
    if (page === 'Login' || page === 'Register') {
      return state;
    }
  }

  return Object.assign({}, state, {
    currentPage: page
  });
}

function receiveUserData(state, data) {
  return Object.assign({}, state, {
    userData: data
  });
}

function receiveGroupData(state, data) {
  return Object.assign({}, state, {
    groupData: data
  });
}

function setCurrentGroup(state, group) {
  return Object.assign({}, state, {
    currentGroup: group
  });
}

export function oldReducer(state = initialState, action) {
  switch (action.type) {
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
    case 'RECEIVE_GROUP_DATA':
      return receiveGroupData(state, action.payload);
    case 'SET_CURRENT_GROUP':
      return setCurrentGroup(state, action.payload);
    default:
      return state;
  }
}
