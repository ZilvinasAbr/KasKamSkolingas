import React from 'react';

const GroupTileWindow = (props) => {
  const renderView = (view, inDebt, debtTo) => {
    switch(view){
      case 'default':
        return (
          <div>
            <div>In debt: {inDebt}</div>
            <div>Debt to: {debtTo}</div>
            <div>Overall balance: {(debtTo - inDebt).toFixed(2)}</div>
          </div>
        );
      case 'settings':
        return (
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
      case 'createDebt':
        return (
          <div>
            <label>User:</label>
            <input type='text' />
            <label>Amount:</label>
            <input type='number' />
            <label>What for:</label>
            <input type='text' />
            <button>Create</button>
          </div>
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