import {
  REQUEST_HOME_PAGE_DATA,
  RECEIVE_HOME_PAGE_DATA,
  CHANGE_GROUP_VIEW_TO_SETTINGS,
  CHANGE_GROUP_VIEW_TO_DEFAULT,
  CHANGE_GROUP_VIEW_TO_CREATE_DEBT,
  CHANGE_GROUP_VIEW_TO_VIEW_DEBTS,
  CHANGE_GROUP_VIEW_TO_ADD_TO_GROUP,
  CHANGE_GROUP_VIEW_TO_LEAVE_GROUP
} from '../action_creators';

export const initialState = {};

function requestHomePageData(state) {
  return state;
}

function receiveHomePageData(state, json) {
  return Object.assign({}, state, json);
}

function changeGroupViewToSettings(state, groupIndex) {
  let newState = Object.assign({}, state);
  newState.groups[groupIndex].view = 'settings';

  return newState;
}

function changeGroupViewToDefault(state, groupIndex) {
  let newState = Object.assign({}, state);
  newState.groups[groupIndex].view = 'default';

  return newState;
}

function changeGroupViewToCreateDebt(state, groupIndex) {
  let newState = Object.assign({}, state);
  newState.groups[groupIndex].view = 'createDebt';

  return newState;
}

function changeGroupViewToViewDebts(state, groupIndex) {
  let newState = Object.assign({}, state);
  newState.groups[groupIndex].view = 'viewDebts';

  return newState;
}

function changeGroupViewToAddToGroup(state, groupIndex) {
  let newState = Object.assign({}, state);
  newState.groups[groupIndex].view = 'addToGroup';

  return newState;
}

function changeGroupViewToLeaveGroup(state, groupIndex) {
  let newState = Object.assign({}, state);
  newState.groups[groupIndex].view = 'leaveGroup';

  return newState;
}

export function homePage(state = initialState, action) {
  switch (action.type) {
    case REQUEST_HOME_PAGE_DATA:
      return requestHomePageData(state);
    case RECEIVE_HOME_PAGE_DATA:
      return receiveHomePageData(state, action.json);
    case CHANGE_GROUP_VIEW_TO_SETTINGS:
      return changeGroupViewToSettings(state, action.groupIndex);
    case CHANGE_GROUP_VIEW_TO_DEFAULT:
      return changeGroupViewToDefault(state, action.groupIndex);
    case CHANGE_GROUP_VIEW_TO_CREATE_DEBT:
      return changeGroupViewToCreateDebt(state, action.groupIndex);
    case CHANGE_GROUP_VIEW_TO_VIEW_DEBTS:
      return changeGroupViewToViewDebts(state, action.groupIndex);
    case CHANGE_GROUP_VIEW_TO_ADD_TO_GROUP:
      return changeGroupViewToAddToGroup(state, action.groupIndex);
    case CHANGE_GROUP_VIEW_TO_LEAVE_GROUP:
      return changeGroupViewToLeaveGroup(state, action.groupIndex);
    default:
      return state;
  }
}