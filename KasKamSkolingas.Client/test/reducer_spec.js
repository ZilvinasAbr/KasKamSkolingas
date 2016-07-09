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
      currentPage: 'Login'
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

  it('handles SET_CURRENT_PAGE to CreateGroup', () => {
    const initialState = Map({
      isLoggedIn: true,
      currentPage: 'Landing'
    });
    const action = {
      type: 'SET_CURRENT_PAGE',
      page: 'CreateGroup'
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      isLoggedIn: true,
      currentPage: 'CreateGroup'
    }));
  });

  it('handles SET_CURRENT_PAGE to Groups', () => {
    const initialState = Map({
      isLoggedIn: true,
      currentPage: 'Landing'
    });
    const action = {
      type: 'SET_CURRENT_PAGE',
      page: 'Groups'
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      isLoggedIn: true,
      currentPage: 'Groups'
    }));
  });

  it('handles SET_CURRENT_PAGE to AddToGroup', () => {
    const initialState = Map({
      isLoggedIn: true,
      currentPage: 'Landing'
    });
    const action = {
      type: 'SET_CURRENT_PAGE',
      page: 'AddToGroup'
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      isLoggedIn: true,
      currentPage: 'AddToGroup'
    }));
  });

  it('handles SET_CURRENT_PAGE to LeaveGroup', () => {
    const initialState = Map({
      isLoggedIn: true,
      currentPage: 'Landing'
    });
    const action = {
      type: 'SET_CURRENT_PAGE',
      page: 'LeaveGroup'
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      isLoggedIn: true,
      currentPage: 'LeaveGroup'
    }));
  });

  it('handles RECEIVE_USER_DATA', () => {
    const initialState = Map({
      isLoggedIn: true,
      currentPage: 'Landing'
    });
    const action = {
      type: 'RECEIVE_USER_DATA',
      data: {
        groups: ['Group1', 'Group2', 'Group3']
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      isLoggedIn: true,
      currentPage: 'Landing',
      userData: {
        groups: ['Group1', 'Group2', 'Group3']
      }
    }));
  });

  it('handles RECEIVE_GROUP_DATA', () => {
    const initialState = Map({
      isLoggedIn: true,
      currentPage: 'CreateDebt'
    });
    const action = {
      type: 'RECEIVE_GROUP_DATA',
      payload: {
        users: ['User1', 'User2', 'User3']
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      isLoggedIn: true,
      currentPage: 'CreateDebt',
      groupData: {
        users: ['User1', 'User2', 'User3']
      }
    }));
  });

  it('handles SET_CURRENT_GROUP', () => {
    const initialState = Map({
      isLoggedIn: true,
      currentPage: 'Groups',
      currentGroup: ''
    });
    const action = {
      type: 'SET_CURRENT_GROUP',
      payload: 'Group1'
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      isLoggedIn: true,
      currentPage: 'Groups',
      currentGroup: 'Group1'
    }));
  });

});