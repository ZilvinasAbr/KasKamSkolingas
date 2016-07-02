import axios from 'axios';
import { loggedIn } from './action_creators';

export function tryLogin(username, password) {
  return function(dispatch) {
    return axios.post('/api/account/login', {
      Username: username,
      Password: password
    })
    .then(function(response) {
      if(response.data === true) {
        dispatch(loggedIn());
      }
    })
    .catch(function(response) {

    });
  }
}