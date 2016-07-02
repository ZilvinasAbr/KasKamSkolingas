import React from 'react';
import Axios from 'axios';

class Login extends React.Component {
  render() {
    return (
      <div>
        <p>
          Username: <input type="text" />
        </p>
        <p>
          Password: <input type="password" />
        </p>
        <p>
          <button>Login</button>
        </p>
      </div>
    );
  }
}

export default Login;