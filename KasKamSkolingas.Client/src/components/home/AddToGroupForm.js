import React from 'react';
import { reduxForm } from 'redux-form';
import { addToGroupFormSubmit } from '../../actions';

class AddToGroupForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { groupName, fields: { user }, index } = this.props;

    this.props.dispatch(addToGroupFormSubmit(groupName, user.value));
  }

  render() {
    const { fields: { user }, index } = this.props;

    return (
      <div>
        <div>
          <label>User</label>
          <input type="text" placeholder="User" {...user} />
        </div>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

AddToGroupForm.propTypes = {
  index: React.PropTypes.number.isRequired,
  groupName: React.PropTypes.string.isRequired,
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
};


const config = { // <----- THIS IS THE IMPORTANT PART!
  form: 'addToGroup',                   // a unique name for this form
  fields: ['user'] // all the fields in your form
};

export default reduxForm(config)(AddToGroupForm);
