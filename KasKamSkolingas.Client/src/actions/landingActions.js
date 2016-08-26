import axios from 'axios';
import { push } from 'react-router-redux';
import {
  requestIsLoggedIn,
  receiveIsLoggedIn
} from '../actionCreators/landingActionCreators';

export function isLoggedIn() {
  return dispatch => {
    dispatch(requestIsLoggedIn());

    return axios.get('/api/account/issignedin')
      .then(response => {
        dispatch(receiveIsLoggedIn(response.data));

        if(response.data === true) {
          dispatch(push('/home'));
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}