import axios from 'axios';
import {
  logOff as logOffActionCreator
} from '../actionCreators/homeActionCreators';
import { push } from 'react-router-redux';

export function logOff() {
  return dispatch => {
    window.localStorage.setItem('token', null);
    dispatch(logOffActionCreator());
    dispatch(push('/'));
  }
}

