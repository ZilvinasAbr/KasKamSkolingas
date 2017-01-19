import axios from 'axios';
import { push } from 'react-router-redux';

export function login(usern=Name, password) {
  return dispatch => {
    return axios.post('api/account/login', {
      userName,
      password
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

export function register(userName, password, confirmPassword) {
  return dispatch => {
    return axios.post('api/account/register', {
      userName,
      password,
      confirmPassword
    })
      .then(response => {
        const token = response.data;

        if(!token) {
          console.error('Couldn\'t register');
        } else {
          console.log(token);
          dispatch(push('/home'));
        }
      })
      .catch(error => {
        console.log(error);
      })
  }
}