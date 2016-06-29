import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router';

class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSignedIn: false
        };

        this.isSignedInUpdate = this.isSignedInUpdate.bind(this);
        this.handleLogOff = this.handleLogOff.bind(this);
    }
    componentDidMount() {
        this.isSignedInUpdate();
    }
    isSignedInUpdate() {
        Axios.get('/api/account/issignedin')
            .then((response) => {
                console.log("Update is signed in");
                console.log(response.data);
                this.setState({ isSignedIn: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    handleLogOff() {
        Axios.post('/api/account/logoff', {})
            .then((response) => {
                console.log("Log off");
                console.log(response.data);
                this.setState({ isSignedIn: !response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    render() {
        let tab;
        if (this.state.isSignedIn) {
            tab = (
                <div>
                    <button onClick={this.handleLogOff}>Log off</button>
                </div>
                );
        } else {
            tab = (
                <div>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'>Register</Link>
                </div>
                );
        }
        return (
            <div>
                {tab}
                <div>
                    {this.props.children}
                </div>
            </div>
    );
  }
}

export default Layout;