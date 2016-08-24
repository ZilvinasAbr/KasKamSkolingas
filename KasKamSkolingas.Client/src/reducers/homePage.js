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
  let group = Object.assign({}, state.groups[groupIndex], { view });
  // let newGroups = Object.assign({}, state.groups);
  // newGroups[groupIndex].view = view;
  //
  // return Object.assign({}, state, { groups: newGroups });

  let newState = Object.assign({}, state);
  newState.groups[groupIndex].view = view;

  return newState;
}

function requestCreateDebtSubmit(state) {
  return state;
}

function receiveCreateDebtSubmit(state, action) {
  let newState = Object.assign({}, state);

  console.log(newState.groups);

  let group = newState.groups.filter((group) => group.name === action.groupName);
  group = group[0];

  if(action.success)
    group.view = 'default';
  else
    group.view = 'createDebt';

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