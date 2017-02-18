import React from 'react';
import GroupTileWindow from './GroupTileWindow';
import { changeGroupViewToSettings } from '../../action_creators';

const GroupTile = (props) => {
  const handleSettingsClick = () => {
    props.handleGroupMainButtonPress(props.index);
    // if(props.view === 'default') {
    //   props.changeViewToSettings(props.index);
    // }else /*if(props.view === 'settings')*/ {
    //   props.changeViewToDefault(props.index);
    // }
  };

  const getButtonText = (view) => {
    if (view === 'default') { return 'Settings'; }
    return 'Back';
  };

  return (
    <div style={{ borderStyle: 'solid', borderWidth: '1px', width: '256px', height: '128px' }}>
      <div style={{ borderStyle: 'solid', borderWidth: '1px' }}>
        {props.groupName}
        <button onClick={handleSettingsClick}>{getButtonText(props.view)}</button>
      </div>
      <GroupTileWindow
        index={props.index}
        view={props.view}
        debtIndex={props.debtIndex}
        groupName={props.groupName}
        inDebt={props.inDebt}
        debtTo={props.debtTo}
        debts={props.debts}
        changeViewToCreateDebt={props.changeViewToCreateDebt}
        changeViewToViewDebts={props.changeViewToViewDebts}
        changeViewToAddToGroup={props.changeViewToAddToGroup}
        changeViewToLeaveGroup={props.changeViewToLeaveGroup}
        viewNextDebt={props.viewNextDebt}
        viewPreviousDebt={props.viewPreviousDebt}
        group={props.group}
      />
    </div>
  );
};

GroupTile.propTypes = {
  index: React.PropTypes.number.isRequired,
  view: React.PropTypes.string.isRequired,
  debtIndex: React.PropTypes.number.isRequired,
  groupName: React.PropTypes.string.isRequired,
  inDebt: React.PropTypes.number.isRequired,
  debtTo: React.PropTypes.number.isRequired,
  debts: React.PropTypes.array.isRequired,
  changeViewToSettings: React.PropTypes.func.isRequired,
  changeViewToDefault: React.PropTypes.func.isRequired,
  changeViewToCreateDebt: React.PropTypes.func.isRequired,
  changeViewToViewDebts: React.PropTypes.func.isRequired,
  changeViewToAddToGroup: React.PropTypes.func.isRequired,
  changeViewToLeaveGroup: React.PropTypes.func.isRequired,
  viewNextDebt: React.PropTypes.func.isRequired,
  viewPreviousDebt: React.PropTypes.func.isRequired,
  group: React.PropTypes.object.isRequired,
  handleGroupMainButtonPress: React.PropTypes.func.isRequired
};

export default GroupTile;
