import React from 'react';

const CreateDebt = (props) => {
  const createDebt = () => props.createDebt();


  return (
    <div>
      <label>User:</label>
      <input type='text' />
      <label>Amount:</label>
      <input type='number' />
      <label>What for:</label>
      <input type='text' />
      <button onClick={props.createDebt}>Create</button>
    </div>
  );
};

CreateDebt.propTypes = {
  createDebt: React.PropTypes.func.isRequired
};

export default CreateDebt;