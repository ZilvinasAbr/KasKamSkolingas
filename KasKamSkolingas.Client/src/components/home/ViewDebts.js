import React from 'react';

const ViewDebts = (props) => {
  return (
    <div>
      <span><button>{'<-'}</button></span>
      <span><div>User in debt: {props.debts[0].userInDebt}</div>
        <div>User debt to: {props.debts[0].userDebtTo}</div>
        <div>What for: {props.debts[0].whatFor}</div>
        <div>Amount: {props.debts[0].amount}</div>
      </span>
      <span>
        <button>{'->'}</button>
      </span>
    </div>
  );
};

ViewDebts.propTypes = {
  debts: React.PropTypes.array.isRequired
};

export default ViewDebts;