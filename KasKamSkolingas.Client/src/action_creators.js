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