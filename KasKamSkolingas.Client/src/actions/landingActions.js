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

export function register(username, password, confirmPassword) {
  return dispatch => {
    return axios.post('api/account/register', {
      username,
      password,
      confirmPassword
    })
      .then(response => {
        if(response.data === true) {
          dispatch(push('/home'));
        }else {
          console.error('Couldn\'t register');
        }
      })
      .catch(error => {
        console.log(error);
      })
  }
}