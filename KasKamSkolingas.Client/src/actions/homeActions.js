import axios from 'axios';
import {
  logOff as logOffActionCreator
} from '../actionCreators/homeActionCreators';
import { push } from 'react-router-redux';

export function logOff() {
  return dispatch => {
    return axios.post('/api/account/logoff')
      .then(response => {
        if(response.data === true) {
          dispatch(logOffActionCreator());
          dispatch(push('/'));
        }
      })
      .catch(error => {
        console.log(error);
      })
  };
}