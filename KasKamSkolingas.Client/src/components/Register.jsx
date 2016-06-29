import React from 'react';
import Axios from 'axios';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            confirmPassword: ''
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }
    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
        console.log(this.state);
    }
    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
        console.log(this.state);
    }
    handleConfirmPasswordChange(event) {
        this.setState({ confirmPassword: event.target.value });
        console.log(this.state);
    }
    handleRegister() {
        Axios.post('/api/account/register',
            {
                Username: this.state.username,
                Password: this.state.password,
                ConfirmPassword: this.state.confirmPassword
            })
            .then((response) => {
                console.log("Tried to sign in");
                console.log(response);
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
                    Confirm Password: <input type="password" value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange} />
                </p>
                <p>
                    <button onClick={this.handleRegister}>Register</button>
                </p>
            </div>
        );
    }
}

export default Register;