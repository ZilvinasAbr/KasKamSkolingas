import React from 'react';
import { connect } from 'react-redux';
import Login from './components/Login';
import Register from './components/Register';
import Landing from './components/Landing';

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
        <Login />
      );
    }else if(this.props.currentPage === 'Register') {
      toRender = (
        <Register />
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