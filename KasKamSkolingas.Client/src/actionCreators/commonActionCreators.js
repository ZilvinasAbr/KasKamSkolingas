export const REQUEST_IS_LOGGED_IN = 'REQUEST_IS_LOGGED_IN';
export function requestIsLoggedIn() {
  return {
    type: REQUEST_IS_LOGGED_IN
  };
}

export const RECEIVE_IS_LOGGED_IN = 'RECEIVE_IS_LOGGED_IN';
export function receiveIsLoggedIn(success) {
  return {
    type: RECEIVE_IS_LOGGED_IN,
    success
  };
}
