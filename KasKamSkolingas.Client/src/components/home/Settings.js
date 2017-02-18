import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const Settings = props => (
  <div>
    <div>
      <RaisedButton
        onTouchTap={() => props.changeViewToCreateDebt(props.index)}
        label={'Create debt'}
      />
    </div>
    <div>
      <RaisedButton
        onClick={() => props.changeViewToViewDebts(props.index)}
        label={'View debts'}
      />
    </div>
    <div>
      <RaisedButton
        onClick={() => props.changeViewToAddToGroup(props.index)}
        label={'Add to group'}
      />
    </div>
    <div>
      <RaisedButton
        onClick={() => props.changeViewToLeaveGroup(props.index)}
        label={'Leave group'}
      />
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
