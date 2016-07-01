import React from 'react';
import { connect } from 'react-redux';

export class Tab extends React.Component {
  render() {
    let toRender;
    if(this.props.isLoggedIn === true){
      toRender = (<div>
                    <button>Log off</button>
                  </div>);
    }else{
      toRender = (
        <div>
            <button>Login</button>
            <button>Register</button>
        </div>
      );
    }
    return (
      toRender
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.get('isLoggedIn')
  };
}

export const TabContainer = connect(mapStateToProps)(Tab);