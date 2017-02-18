import React from 'react';
import { reduxForm } from 'redux-form';
import { login } from '../../actions/landingActions';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { fields: { username, password } } = this.props;

    this.props.dispatch(login(username.value, password.value));
  }

  render() {
    const { fields: { username, password } } = this.props;

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
        <button type="button" onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

LoginForm.propTypes = {
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
};


const config = { // <----- THIS IS THE IMPORTANT PART!
  form: 'login',                   // a unique name for this form
  fields: ['username', 'password'] // all the fields in your form
};

export default reduxForm(config)(LoginForm);
