import React from 'react';
import { connect } from 'react-redux';
import { LoginContainer } from './Login';
import { RegisterContainer } from './Register';
import Landing from './Landing';
import CreateGroup from './CreateGroup';

export class Page extends React.Component {
  render() {

    switch(this.props.currentPage) {
      case 'Landing':
        return (<Landing />);
      case 'Login':
        return (<LoginContainer />);
      case 'Register':
        return (<RegisterContainer />);
      case 'CreateGroup':
        return (<CreateGroup />);
      default:
        return (<div>Error</div>);
    }
  }
}

function mapStateToProps(state) {
  return {
    currentPage: state.get('currentPage')
  };
}

export const PageContainer = connect(mapStateToProps)(Page);