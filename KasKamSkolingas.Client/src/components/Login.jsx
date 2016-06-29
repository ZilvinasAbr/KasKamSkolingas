import React from 'react';
import Axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
        console.log(this.state);
    }
    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
        console.log(this.state);
    }
    handleLogin() {
        Axios.post('/api/account/login',
            {
                Username: this.state.username,
                Password: this.state.password
            })
            .then((response) => {
                console.log("Tried to login");
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
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
            <button onClick={this.handleLogin}>Login</button>
        </p>
    </div>
        );
    }
}

export default Login;