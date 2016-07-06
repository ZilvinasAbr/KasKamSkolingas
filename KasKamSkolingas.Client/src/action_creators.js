export function setInitialState() {
  return {
    type: 'SET_INITIAL_STATE'
  };
}

export function loggedIn() {
  return {
    type: 'LOGGED_IN'
  };
}

export function loggedOff() {
  return {
    type: 'LOGGED_OFF'
  };
}

export function setCurrentPage(page) {
  return {
    type: 'SET_CURRENT_PAGE',
    page: page
  }
}

export function receiveUserData(json) {
  return {
    type: 'RECEIVE_USER_DATA',
    data: json
  }
};

export function receiveGroupData(json) {
  return {
    type: 'RECEIVE_GROUP_DATA',
    payload: json
  }
}

export function setCurrentGroup(group) {
  return {
    type: 'SET_CURRENT_GROUP',
    payload: group
  }
}