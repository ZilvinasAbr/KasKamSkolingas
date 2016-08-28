import axios from 'axios';
import { push } from 'react-router-redux';

export function login(username, password) {
  return dispatch => {
    return axios.post('api/account/login', {
      UserName: username,
      Password: password
    })
      .then(response => {
        if(response.data === true) {
          dispatch(push('/home'));
        }else {
          
        }
      })
      .catch(error => {
        console.log(error);
      })
  }
}

export function register(username, password, confirm) {
  return dispatch => {
    return axios.post('api/account/register', {
      UserName: username,
      Password: password,
      ConfirmPassword: confirm
    })
      .then(response => {
        if(response.data === true) {
          dispatch(push('/home'));
        }else {

        }
      })
      .catch(error => {
        console.log(error);
      })
  }
}