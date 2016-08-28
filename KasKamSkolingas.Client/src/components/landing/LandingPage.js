import React from 'react';
import { connect } from 'react-redux';
import { isLoggedIn } from '../../actions/commonActions';
import {
} from '../../actionCreators/commonActionCreators';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // When the component mounts, check if user is logged in.
    // If he is, redirect to home page. Otherwise, stay on landing page
    this.props.isLoggedIn();
  }

  render() {
    return (
      <div>
        Login form:
        <LoginForm />
        Register form:
        <RegisterForm />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    isLoggedIn: () => {
      dispatch(isLoggedIn());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);