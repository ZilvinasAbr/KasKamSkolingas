import React from 'react';
import Axios from 'axios';

class Register extends React.Component {
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
                    Confirm Password: <input type="password" />
                </p>
                <p>
                    <button>Register</button>
                </p>
            </div>
        );
    }
}

export default Register;