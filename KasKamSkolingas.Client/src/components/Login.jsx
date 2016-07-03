import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loggedIn } from '../action_creators';
import { fetchUserData } from '../actions';

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit() {
    axios.post('api/account/login', {
      Username: this.state.username,
      Password: this.state.password
    })
    .then((response) => {
      if(response.data === true) {
        this.props.dispatch(loggedIn());
        fetchUserData(this.props.dispatch);
      }else {
        console.log('Could not login');
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <div>
        <p>
          Username: <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
        </p>
        <p>
          Password: <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
        </p>
        <p>
          <button onClick={this.handleSubmit}>Login</button>
        </p>
      </div>
    );
  }
}

export const LoginContainer = connect()(Login);