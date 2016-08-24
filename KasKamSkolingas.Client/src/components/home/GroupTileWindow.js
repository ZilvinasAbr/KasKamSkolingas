import React from 'react';
import Default from './Default';
import Settings from './Settings';
import CreateDebtForm from './CreateDebtForm';
import AddToGroupForm from './AddToGroupForm';
import ViewDebts from './ViewDebts';

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
            groupName={props.groupName}
          />
        );
      case 'viewDebts':
        return (
          <ViewDebts
            index={props.index}
            debtIndex={props.debtIndex}
            debts={props.debts}
            viewNextDebt={props.viewNextDebt}
            viewPreviousDebt={props.viewPreviousDebt}
          />
        );
      case 'addToGroup':
        return (
          <AddToGroupForm
            index={props.index}
            groupName={props.groupName}
          />
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
  debtIndex: React.PropTypes.number.isRequired,
  groupName: React.PropTypes.string.isRequired,
  inDebt: React.PropTypes.number.isRequired,
  debtTo: React.PropTypes.number.isRequired,
  debts: React.PropTypes.array.isRequired,
  changeViewToCreateDebt: React.PropTypes.func.isRequired,
  changeViewToViewDebts: React.PropTypes.func.isRequired,
  changeViewToAddToGroup: React.PropTypes.func.isRequired,
  changeViewToLeaveGroup: React.PropTypes.func.isRequired,
  viewNextDebt: React.PropTypes.func.isRequired,
  viewPreviousDebt: React.PropTypes.func.isRequired,
  group: React.PropTypes.object.isRequired
};

export default GroupTileWindow;