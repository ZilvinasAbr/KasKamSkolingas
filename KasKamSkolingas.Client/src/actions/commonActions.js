import axios from 'axios';
import { push } from 'react-router-redux';
import {
  requestIsLoggedIn,
  receiveIsLoggedIn
} from '../actionCreators/commonActionCreators';
import { fetchHomePageData } from '../actions';

export function isLoggedIn() {
  return (dispatch) => {
    const token = window.localStorage.getItem('token');

    if (token) {
      axios.get('/api/account/isSignedIn', {
        headers: { Authorization: `JWT ${token}` }
      })
      .then((response) => {
        if (response.data === true) {
          dispatch(push('/home'));
          dispatch(fetchHomePageData());
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(push('/'));
      });
    } else {
      dispatch(push('/'));
    }
  };
}

