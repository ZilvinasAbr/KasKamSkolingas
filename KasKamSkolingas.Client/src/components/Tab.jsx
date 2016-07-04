import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setCurrentPage, loggedOff } from '../action_creators';

export class Tab extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogOff = this.handleLogOff.bind(this);
  }

  renderButton(nextCurrentPage, title) {
    return (
      <button onClick= {
        e => {
          this.props.dispatch(setCurrentPage(nextCurrentPage)) 
        }
      }>{title}</button>
    );
  }

  handleLogOff() {
    axios.post('api/account/logoff', {})
      .then((response) => {
        if(response.data === true) {
          this.props.dispatch(loggedOff());
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    let toRender;
    if(this.props.isLoggedIn === true){
      toRender = (
        <div>
          {this.renderButton('Landing', 'Landing')}
          {this.renderButton('CreateGroup', 'Create group')}
          {this.renderButton('Groups','Groups')}
          {this.renderButton('AddToGroup', 'Add to group')}
          {this.renderButton('CreateDebt', 'Create debt')}
          {this.renderButton('ViewDebts', 'View debts')}
          <button onClick= { this.handleLogOff }>Log off</button>
        </div>
      );
    }else{
      toRender = (
        <div>
          {this.renderButton('Landing', 'Landing')}
          {this.renderButton('Login', 'Login')}
          {this.renderButton('Register', 'Register')}   
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