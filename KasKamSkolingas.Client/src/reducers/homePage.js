import {
  REQUEST_HOME_PAGE_DATA,
  RECEIVE_HOME_PAGE_DATA,
  CHANGE_GROUP_VIEW_TO_SETTINGS,
  CHANGE_GROUP_VIEW_TO_DEFAULT,
  CHANGE_GROUP_VIEW_TO_CREATE_DEBT,
  CHANGE_GROUP_VIEW_TO_VIEW_DEBTS,
  CHANGE_GROUP_VIEW_TO_ADD_TO_GROUP,
  CHANGE_GROUP_VIEW_TO_LEAVE_GROUP,
  REQUEST_CREATE_DEBT_SUBMIT,
  RECEIVE_CREATE_DEBT_SUBMIT
} from '../action_creators';

export const initialState = {};

function requestHomePageData(state) {
  return state;
}

function receiveHomePageData(state, json) {
  return Object.assign({}, state, json);
}

function changeGroupViewTo(state, groupIndex, view) {
  let newState = Object.assign({}, state);
  newState.groups[groupIndex].view = view;

  return newState;
}

function requestCreateDebtSubmit(state) {
  return state;
}

function receiveCreateDebtSubmit(state, action) {
  let newState = Object.assign({}, state);
  
  if(action.success)
    newState.groups[action.groupIndex].view = 'default';
  else
    newState.groups[action.groupIndex].view = 'createDebt';

  return newState;
}

export function homePage(state = initialState, action) {
  switch (action.type) {
    case REQUEST_HOME_PAGE_DATA:
      return requestHomePageData(state);
    case RECEIVE_HOME_PAGE_DATA:
      return receiveHomePageData(state, action.json);
    case CHANGE_GROUP_VIEW_TO_SETTINGS:
      return changeGroupViewTo(state, action.groupIndex, 'settings');
    case CHANGE_GROUP_VIEW_TO_DEFAULT:
      return changeGroupViewTo(state, action.groupIndex, 'default');
    case CHANGE_GROUP_VIEW_TO_CREATE_DEBT:
      return changeGroupViewTo(state, action.groupIndex, 'createDebt');
    case CHANGE_GROUP_VIEW_TO_VIEW_DEBTS:
      return changeGroupViewTo(state, action.groupIndex, 'viewDebts');
    case CHANGE_GROUP_VIEW_TO_ADD_TO_GROUP:
      return changeGroupViewTo(state, action.groupIndex, 'addToGroup');
    case CHANGE_GROUP_VIEW_TO_LEAVE_GROUP:
      return changeGroupViewTo(state, action.groupIndex, 'leaveGroup');
    case REQUEST_CREATE_DEBT_SUBMIT:
      return requestCreateDebtSubmit(state);
    case RECEIVE_CREATE_DEBT_SUBMIT:
      return receiveCreateDebtSubmit(state, action);
    default:
      return state;
  }
}