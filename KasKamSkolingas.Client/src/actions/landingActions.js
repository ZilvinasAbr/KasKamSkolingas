import axios from 'axios';
import { push } from 'react-router-redux';

export function login(userName, password) {
  return dispatch => {
    return axios.post('api/account/login', {
      userName,
      password
    })
      .then(response => {
        const token = response.data;

        if (token) {
          window.localStorage.setItem('token', token);
          dispatch(push('/home'));
        } else {
          console.log('Couldn\'t login');
        }
      })
      .catch(error => {
        console.log(error);
      })
  }
}

export function register(userName, password, confirmPassword) {
  return dispatch => {
    return axios.post('api/account/register', {
      userName,
      password,
      confirmPassword
    })
      .then(response => {
        const token = response.data;

        if (token) {
          window.localStorage.setItem('token', token);
          dispatch(push('/home'));
        } else {
          console.error('Couldn\'t register');
        }
      })
      .catch(error => {
        console.log(error);
      })
  }
}