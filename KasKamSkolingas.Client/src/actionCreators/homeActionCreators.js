export const LOG_OFF = 'LOG_OFF';

export function logOff() {
  return {
    type: LOG_OFF
  };
}

export const CREATE_GROUP = 'CREATE_GROUP';
export function createGroup(groupName) {
  return {
    type: CREATE_GROUP,
    groupName
  };
}
