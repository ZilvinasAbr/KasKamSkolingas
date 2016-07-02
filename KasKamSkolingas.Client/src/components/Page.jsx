import React from 'react';
import { connect } from 'react-redux';
import { LoginContainer } from './Login';
import { RegisterContainer } from './Register';
import Landing from './Landing';

export class Page extends React.Component {
  render() {
    let toRender = (
      <div>Error</div>
    );

    if(this.props.currentPage === 'Landing') {
      toRender = (
        <Landing />
      );
    }else if(this.props.currentPage === 'Login') {
      toRender = (
        <LoginContainer />
      );
    }else if(this.props.currentPage === 'Register') {
      toRender = (
        <RegisterContainer />
      );
    }

    return toRender;
  }
}

function mapStateToProps(state) {
  return {
    currentPage: state.get('currentPage')
  };
}

export const PageContainer = connect(mapStateToProps)(Page);