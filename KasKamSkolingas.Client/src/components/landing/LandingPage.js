import React from 'react';
import { connect } from 'react-redux';
import { isLoggedIn } from '../../actions/landingActions';
// import { fetchHomePageData } from '../../actions';
import {
} from '../../actionCreators/landingActionCreators';
import { push } from 'react-router-redux';

import { Link } from 'react-router';

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
        <button>Login</button>
        <button>Register</button>
        <Link to="/home">Home</Link>
        <button onClick={this.props.test}>Home with dispatch push</button>
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
    },
    test: () => {
      dispatch(push('/home'));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);