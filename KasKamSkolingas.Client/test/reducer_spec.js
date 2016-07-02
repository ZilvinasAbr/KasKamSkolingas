import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import { reducer } from '../src/reducer';

describe('reducer', () => {

  it('sets initial state with SET_INITIAL_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_INITIAL_STATE'
    };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      isLoggedIn: false,
      currentPage: 'Landing'
    }));
  });
  
  it('handles LOGGED_IN', () => {
    const initialState = Map({
      isLoggedIn: false,
      currentPage: 'Login'
    });
    const action = {
      type: 'LOGGED_IN'
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
        isLoggedIn: true,
        currentPage: 'Landing'
    }));
  });

  it('handles LOGGED_OFF', () => {
    const initialState = Map({
      isLoggedIn: true,
      currentPage: 'Landing'
    });
    const action = {
      type: 'LOGGED_OFF'
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
        isLoggedIn: false,
        currentPage: "Landing"
    }));
  });

  it('handles SET_CURRENT_PAGE to Login', () => {
    const initialState = Map({
      isLoggedIn: false,
      currentPage: 'Landing'
    });
    const action = {
      type: 'SET_CURRENT_PAGE',
      page: 'Login'
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      isLoggedIn: false,
      currentPage: 'Login'
    }));
  });

  it('handles SET_CURRENT_PAGE to Register', () => {
    const initialState = Map({
      isLoggedIn: false,
      currentPage: 'Landing'
    });
    const action = {
      type: 'SET_CURRENT_PAGE',
      page: 'Register'
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      isLoggedIn: false,
      currentPage: 'Register'
    }));
  });

  it('handles SET_CURRENT_PAGE to Login when isLoggedIn is true', () => {
    const initialState = Map({
      isLoggedIn: true,
      currentPage: 'Landing'
    });
    const action = {
      type: 'SET_CURRENT_PAGE',
      page: 'Login'
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(initialState);
  });

});