import React from 'react';

const Default = (props) => {
  return (
    <div>
      <div>In debt: {props.inDebt}</div>
      <div>Debt to: {props.debtTo}</div>
      <div>Overall balance: {(props.debtTo - props.inDebt).toFixed(2)}</div>
    </div>
  );
};

Default.propTypes = {
  inDebt: React.PropTypes.number.isRequired,
  debtTo: React.PropTypes.number.isRequired
};

export default Default;