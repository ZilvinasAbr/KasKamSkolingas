import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  
  it('handles LOGGGED_IN', () => {
    const initialState = Map({
      isLoggedIn: false,
      currentPage: "Landing"
    });
    const action = {
      type: 'LOGGED_IN'
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
        isLoggedIn: true,
        currentPage: "Landing"
    }));
  });

  it('handles LOGGED_OFF', () => {
    const initialState = Map({
      isLoggedIn: true,
      currentPage: "Landing"
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

});