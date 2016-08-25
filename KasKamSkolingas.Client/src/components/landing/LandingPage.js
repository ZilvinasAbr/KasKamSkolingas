import React from 'react';
import { connect } from 'react-redux';
// import { fetchHomePageData } from '../../actions';
import {
} from '../../actionCreators/landingActionCreators';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button>Login</button>
        <button>Register</button>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);