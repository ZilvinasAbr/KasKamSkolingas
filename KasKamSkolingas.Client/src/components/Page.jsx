import React from 'react';
import { connect } from 'react-redux';
import { LoginContainer } from './Login';
import { RegisterContainer } from './Register';
import Landing from './Landing';
import { CreateGroupContainer } from './CreateGroup';
import { GroupsContainer } from './Groups';
import { AddToGroupContainer } from './AddToGroup';

export class Page extends React.Component {
  render() {
    if(this.props.currentPage === undefined ||
      this.props.currentPage === null) {
        return (<div>Error</div>);
      }

    switch(this.props.currentPage) {
      case 'Landing':
        return (<Landing />);
      case 'Login':
        return (<LoginContainer />);
      case 'Register':
        return (<RegisterContainer />);
      case 'CreateGroup':
        return (<CreateGroupContainer />);
      case 'Groups':
        return (<GroupsContainer />);
      case 'AddToGroup':
        return (<AddToGroupContainer />);
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