export function setInitialState() {
  return {
    type: 'SET_INITIAL_STATE'
  };
}

export function loggedIn() {
  return {
    type: 'LOGGED_IN'
  };
}

export function loggedOff() {
  return {
    type: 'LOGGED_OFF'
  };
}

export function setCurrentPage(page) {
  return {
    type: 'SET_CURRENT_PAGE',
    page: page
  }
}

export function receiveUserData(json) {
  return {
    type: 'RECEIVE_USER_DATA',
    data: json
  }
}

export function receiveGroupData(json) {
  return {
    type: 'RECEIVE_GROUP_DATA',
    payload: json
  }
}

export function setCurrentGroup(group) {
  return {
    type: 'SET_CURRENT_GROUP',
    payload: group
  }
}

// New action creators and action types

export const REQUEST_HOME_PAGE_DATA = 'REQUEST_HOME_PAGE_DATA';
export function requestHomePageData() {
  return {
    type: REQUEST_HOME_PAGE_DATA
  };
}

export const RECEIVE_HOME_PAGE_DATA = 'RECEIVE_HOME_PAGE_DATA';
export function receiveHomePageData(json) {
  return {
    type: RECEIVE_HOME_PAGE_DATA,
    json
  };
}

export const REQUEST_CREATE_DEBT_SUBMIT = 'REQUEST_CREATE_DEBT_SUBMIT';
export function requestCreateDebtSubmit() {
  return {
    type: REQUEST_CREATE_DEBT_SUBMIT
  };
}

export const RECEIVE_CREATE_DEBT_SUBMIT = 'RECEIVE_CREATE_DEBT_SUBMIT';
export function receiveCreateDebtSubmit(success, groupName) {
  return {
    type: RECEIVE_CREATE_DEBT_SUBMIT,
    success,
    groupName
  };
}

export const CHANGE_GROUP_VIEW_TO_SETTINGS = 'CHANGE_GROUP_VIEW_TO_SETTINGS';
export function changeGroupViewToSettings(groupIndex) {
  return {
    type: CHANGE_GROUP_VIEW_TO_SETTINGS,
    groupIndex
  };
}

export const CHANGE_GROUP_VIEW_TO_DEFAULT = 'CHANGE_GROUP_VIEW_TO_DEFAULT';
export function changeGroupViewToDefault(groupIndex) {
  return {
    type: CHANGE_GROUP_VIEW_TO_DEFAULT,
    groupIndex
  };
}

export const CHANGE_GROUP_VIEW_TO_CREATE_DEBT = 'CHANGE_GROUP_VIEW_TO_CREATE_DEBT';
export function changeGroupViewToCreateDebt(groupIndex) {
  return {
    type: CHANGE_GROUP_VIEW_TO_CREATE_DEBT,
    groupIndex
  };
}

export const CHANGE_GROUP_VIEW_TO_VIEW_DEBTS = 'CHANGE_GROUP_VIEW_TO_VIEW_DEBTS';
export function changeGroupViewToViewDebts(groupIndex) {
  return {
    type: CHANGE_GROUP_VIEW_TO_VIEW_DEBTS,
    groupIndex
  };
}

export const CHANGE_GROUP_VIEW_TO_ADD_TO_GROUP = 'CHANGE_GROUP_VIEW_TO_ADD_TO_GROUP';
export function changeGroupViewToAddToGroup(groupIndex) {
  return {
    type: CHANGE_GROUP_VIEW_TO_ADD_TO_GROUP,
    groupIndex
  };
}

export const CHANGE_GROUP_VIEW_TO_LEAVE_GROUP = 'CHANGE_GROUP_VIEW_TO_LEAVE_GROUP';
export function changeGroupViewToLeaveGroup(groupIndex) {
  return {
    type: CHANGE_GROUP_VIEW_TO_LEAVE_GROUP,
    groupIndex
  };
}

export const VIEW_NEXT_DEBT = 'VIEW_NEXT_DEBT';
export function viewNextDebt(groupIndex) {
  return {
    type: VIEW_NEXT_DEBT,
    groupIndex
  };
}

export const VIEW_PREVIOUS_DEBT = 'VIEW_PREVIOUS_DEBT';
export function viewPreviousDebt(groupIndex) {
  return {
    type: VIEW_PREVIOUS_DEBT,
    groupIndex
  };
}

export const REQUEST_ADD_TO_GROUP_SUBMIT = 'REQUEST_ADD_TO_GROUP_SUBMIT';
export function requestAddToGroupSubmit() {
  return {
    type: REQUEST_ADD_TO_GROUP_SUBMIT
  };
}

export const RECEIVE_ADD_TO_GROUP_SUBMIT = 'RECEIVE_ADD_TO_GROUP_SUBMIT';
export function receiveAddToGroupSubmit(success, groupName) {
  return {
    type: RECEIVE_ADD_TO_GROUP_SUBMIT,
    success,
    groupName
  };
}

export const GROUP_MAIN_BUTTON_PRESSED = 'GROUP_MAIN_BUTTON_PRESSED';
export function groupMainButtonPressed(groupIndex) {
  return {
    type: GROUP_MAIN_BUTTON_PRESSED,
    groupIndex
  };
}