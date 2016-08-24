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
  RECEIVE_CREATE_DEBT_SUBMIT,
  VIEW_NEXT_DEBT,
  VIEW_PREVIOUS_DEBT,
  REQUEST_ADD_TO_GROUP_SUBMIT,
  RECEIVE_ADD_TO_GROUP_SUBMIT,
  GROUP_MAIN_BUTTON_PRESSED
} from '../action_creators';

export const initialState = {};

function requestHomePageData(state) {
  return Object.assign({}, state);
}

function receiveHomePageData(state, json) {
  let nextState = Object.assign({}, state, json);

  nextState.groups.map(group => {
    group.debtIndex = 0;
    group.view = 'default';
  });

  return nextState;
}

function changeGroupViewTo(state, groupIndex, view) {

  let newState = Object.assign({}, {
    groups: state.groups
  });

  newState.groups[groupIndex].view = view;

  return newState;
}

function requestCreateDebtSubmit(state) {
  return state;
}

function receiveCreateDebtSubmit(state, success, groupName) {
  let newState = Object.assign({}, state);

  console.log(newState.groups);

  let group = newState.groups.filter((group) => group.name === groupName);
  group = group[0];

  if(success)
    group.view = 'default';
  else
    group.view = 'createDebt';

  return newState;
}

function viewNextDebt(state, groupIndex) {
  let nextState = Object.assign({}, state);
  let group = nextState.groups[groupIndex];
  if(group.debtIndex === undefined || group.debtIndex === null) {
    group.debtIndex = 0;
  }

  group.debtIndex++;
  if(group.debtIndex === group.debts.length)
    nextState.groups[groupIndex].debtIndex = 0;
  
  return nextState;
}

function viewPreviousDebt(state, groupIndex) {
  let nextState = Object.assign({}, state);
  let group = nextState.groups[groupIndex];
  if(group.debtIndex === undefined || group.debtIndex === null) {
    group.debtIndex = 0;
  }

  group.debtIndex--;

  if(group.debtIndex === -1)
    nextState.groups[groupIndex].debtIndex = group.debts.length -1;

  return nextState;
}

function requestAddToGroupSubmit(state) {
  return Object.assign({}, state);
}

function receiveAddToGroupSubmit(state, success, groupName) {
  let newState = Object.assign({}, state);

  let group = newState.groups.filter((group) => group.name === groupName);
  group = group[0];

  if(success)
    group.view = 'default';
  else
    group.view = 'addToGroup';

  return newState;
}

function groupMainButtonPressed(state, groupIndex) {
  const view = state.groups[groupIndex].view;

  let nextState = Object.assign({}, state);

  switch (view) {
    case 'default':
      nextState.groups[groupIndex].view = 'settings';
      return nextState;
    case 'settings':
      nextState.groups[groupIndex].view = 'default';
      return nextState;
    case 'createDebt':
      nextState.groups[groupIndex].view = 'settings';
      return nextState;
    case 'viewDebts':
      nextState.groups[groupIndex].view = 'settings';
      return nextState;
    case 'addToGroup':
      nextState.groups[groupIndex].view = 'settings';
      return nextState;
    case 'leaveGroup':
      nextState.groups[groupIndex].view = 'settings';
      return nextState;
    default:
      return state;
  }
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
      return receiveCreateDebtSubmit(state, action.success, action.groupName);
    case VIEW_NEXT_DEBT:
      return viewNextDebt(state, action.groupIndex);
    case VIEW_PREVIOUS_DEBT:
      return viewPreviousDebt(state, action.groupIndex);
    case REQUEST_ADD_TO_GROUP_SUBMIT:
      return requestAddToGroupSubmit(state);
    case RECEIVE_ADD_TO_GROUP_SUBMIT:
      return receiveAddToGroupSubmit(state, action.success, action.groupName);
    case GROUP_MAIN_BUTTON_PRESSED:
      return groupMainButtonPressed(state, action.groupIndex);
    default:
      return state;
  }
}