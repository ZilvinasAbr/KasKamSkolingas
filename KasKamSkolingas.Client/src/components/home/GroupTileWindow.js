import React from 'react';
import Default from './Default';
import CreateDebt from './CreateDebt';
import Settings from './Settings';
import CreateDebtForm from './CreateDebtForm';

const GroupTileWindow = (props) => {
  const renderView = (view, inDebt, debtTo) => {
    switch(view){
      case 'default':
        return (
          <Default
            inDebt={inDebt}
            debtTo={debtTo}
          />
        );
      case 'settings':
        return (
          <Settings
            index={props.index}
            changeViewToCreateDebt={props.changeViewToCreateDebt}
            changeViewToViewDebts={props.changeViewToViewDebts}
            changeViewToAddToGroup={props.changeViewToAddToGroup}
            changeViewToLeaveGroup={props.changeViewToLeaveGroup}
          />
        );
      case 'createDebt':
        return (
          <CreateDebtForm
            index={props.index}
          />
        );
      case 'viewDebts':
        return (
          <div>
            ViewDebts
          </div>
        );
      case 'addToGroup':
        return (
          <div>
            AddToGroup
          </div>
        );
      case 'leaveGroup':
        return (
          <div>
            LeaveGroup
          </div>
        );
      default:
        return <div>Error</div>
    }
  };

  return (
    <div>
      {renderView(props.view, props.inDebt, props.debtTo)}
    </div>
  );
};

GroupTileWindow.propTypes = {
  index: React.PropTypes.number.isRequired,
  view: React.PropTypes.string.isRequired,
  groupName: React.PropTypes.string.isRequired,
  inDebt: React.PropTypes.number.isRequired,
  debtTo: React.PropTypes.number.isRequired,
  debts: React.PropTypes.array.isRequired,
  changeViewToCreateDebt: React.PropTypes.func.isRequired,
  changeViewToViewDebts: React.PropTypes.func.isRequired,
  changeViewToAddToGroup: React.PropTypes.func.isRequired,
  changeViewToLeaveGroup: React.PropTypes.func.isRequired
};

export default GroupTileWindow;