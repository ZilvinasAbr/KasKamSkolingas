import axios from 'axios';
import {
  logOff as logOffActionCreator,
  createGroup as createGroupActionCreator
} from '../actionCreators/homeActionCreators';
import { push } from 'react-router-redux';

export function logOff() {
  return (dispatch) => {
    window.localStorage.setItem('token', null);
    dispatch(logOffActionCreator());
    dispatch(push('/'));
  };
}

export function createGroup(groupName) {
  return (dispatch) => {
    const token = window.localStorage.getItem('token');

    axios.post('api/group/', {
      groupName
    },
      {
        headers: { Authorization: `JWT ${token}` }
      })
    .then((response) => {
      if (response.data === true) {
        dispatch(createGroupActionCreator(groupName));
      } else {
        console.error("Couldn't create group");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  };
}
