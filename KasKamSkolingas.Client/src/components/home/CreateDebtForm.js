import React from 'react';
import {reduxForm} from 'redux-form';
import { createDebtFormSubmit } from '../../actions';

class CreateDebtForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const {groupName, fields: {user, amount, whatFor}, index} = this.props;

    this.props.dispatch(createDebtFormSubmit(groupName, user.value, amount.value, whatFor.value));
  }

  render() {

    const {fields: {user, amount, whatFor}, index} = this.props;

    return (
      <div>
        <div>
          <label>User</label>
          <input type="text" placeholder="User" {...user} />
        </div>
        <div>
          <label>Amount</label>
          <input type="number" placeholder="Amount" {...amount} />
        </div>
        <div>
          <label>What for</label>
          <input type="text" placeholder="What for" {...whatFor} />
        </div>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

CreateDebtForm.propTypes = {
  index: React.PropTypes.number.isRequired,
  groupName: React.PropTypes.string.isRequired,
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
};


const config = { // <----- THIS IS THE IMPORTANT PART!
  form: 'createDebt',                   // a unique name for this form
  fields: ['user', 'amount', 'whatFor'] // all the fields in your form
};

export default reduxForm(config)(CreateDebtForm);