import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setCurrentPage, loggedOff } from '../action_creators';

export class Tab extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogOff = this.handleLogOff.bind(this);
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
          <button onClick= {
            e => {
              this.props.dispatch(setCurrentPage('CreateGroup')) 
            }
          }>Create group</button>
          <button onClick= { this.handleLogOff }>Log off</button>
        </div>
      );
    }else{
      toRender = (
        <div>
          <button onClick= {
            e => {
              this.props.dispatch(setCurrentPage('Landing')) 
            }
          }>Landing</button>
          <button onClick= {
            e => {
              this.props.dispatch(setCurrentPage('Login')) 
            }
          }>Login</button>
          <button onClick= {
            e => {
              this.props.dispatch(setCurrentPage('Register')) 
            }
          }>Register</button>
            
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