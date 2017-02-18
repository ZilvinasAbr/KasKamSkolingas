import React from 'react';

const ViewDebts = (props) => {
  function viewNextDebt() {
    props.viewNextDebt(props.index);
  }

  function viewPreviousDebt() {
    props.viewPreviousDebt(props.index);
  }

  const debt = props.debts[props.debtIndex];

  return (
    <div>
      <span>
        <button onClick={viewPreviousDebt}>{'<-'}</button>
        {props.debtIndex + 1}/{props.debts.length}
        <button onClick={viewNextDebt}>{'->'}</button>
      </span>
      <span><div>User in debt: {debt.userInDebt}</div>
        <div>User debt to: {debt.userDebtTo}</div>
        <div>What for: {debt.whatFor}</div>
        <div>Amount: {debt.amount}</div>
      </span>
    </div>
  );
};

ViewDebts.propTypes = {
  debts: React.PropTypes.array.isRequired,
  debtIndex: React.PropTypes.number.isRequired,
  index: React.PropTypes.number.isRequired,
  viewNextDebt: React.PropTypes.func.isRequired,
  viewPreviousDebt: React.PropTypes.func.isRequired,
};

export default ViewDebts;
