import React from 'react';

const Settings = props => (
  <div>
    <div>
      <button onClick={() => props.changeViewToCreateDebt(props.index)}>Create debt</button>
    </div>
    <div>
      <button onClick={() => props.changeViewToViewDebts(props.index)}>View debts</button>
    </div>
    <div>
      <button onClick={() => props.changeViewToAddToGroup(props.index)}>Add to group</button>
    </div>
    <div>
      <button onClick={() => props.changeViewToLeaveGroup(props.index)}>Leave group</button>
    </div>
  </div>
  );

Settings.propTypes = {
  index: React.PropTypes.number.isRequired,
  changeViewToCreateDebt: React.PropTypes.func.isRequired,
  changeViewToViewDebts: React.PropTypes.func.isRequired,
  changeViewToAddToGroup: React.PropTypes.func.isRequired,
  changeViewToLeaveGroup: React.PropTypes.func.isRequired
};

export default Settings;
