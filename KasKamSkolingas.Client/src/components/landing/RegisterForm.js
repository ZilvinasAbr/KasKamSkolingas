import React from 'react';
import {reduxForm} from 'redux-form';
import { register } from '../../actions/landingActions';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const {fields: {username, password, confirm} } = this.props;

    this.props.dispatch(register(username.value, password.value, confirm.value));
  }

  render() {
    const {fields: {username, password, confirm} } = this.props;

    return (
      <div>
        <div>
          <label>Username</label>
          <input type="text" placeholder="Username" {...username} />
        </div>
        <div>
          <label>Password</label>
          <input type="text" placeholder="Password" {...password} />
        </div>
        <div>
          <label>Confirm</label>
          <input type="text" placeholder="Confirm" {...confirm} />
        </div>
        <button type="button" onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
};


const config = { // <----- THIS IS THE IMPORTANT PART!
  form: 'register',                   // a unique name for this form
  fields: ['username', 'password', 'confirm'] // all the fields in your form
};

export default reduxForm(config)(RegisterForm);