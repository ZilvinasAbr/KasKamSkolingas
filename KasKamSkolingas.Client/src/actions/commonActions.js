import axios from 'axios';
import { push } from 'react-router-redux';
import {
  requestIsLoggedIn,
  receiveIsLoggedIn
} from '../actionCreators/commonActionCreators';
import { fetchHomePageData } from '../actions';

export function isLoggedIn() {
  return dispatch => {
    dispatch(requestIsLoggedIn());

    return axios.get('/api/account/issignedin')
      .then(response => {
        dispatch(receiveIsLoggedIn(response.data));

        if(response.data === true) {
          dispatch(push('/home'));
          dispatch(fetchHomePageData());
        }else {
          dispatch(push('/'));
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}