import React from 'react';
import axios from 'axios';
import { setCurrentPage } from '../action_creators';
import { connect } from 'react-redux';
import { fetchUserData } from '../actions';

export class CreateGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groupName: ''
    };

    this.handleGroupNameChange = this.handleGroupNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleGroupNameChange(e) {
    this.setState({ groupName: e.target.value });
  }

  handleSubmit() {
    axios.post('api/group/create', { GroupName: this.state.groupName })
      .then((response) => {
        if(response.data === true) {
          fetchUserData(this.props.dispatch);
          this.props.dispatch(setCurrentPage('Landing'));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <p>
          Group name: <input type='text' value = {this.state.groupName} onChange={this.handleGroupNameChange} />
        </p>
        <p>
          <button onClick={this.handleSubmit}>Create</button>
        </p>
      </div>
    );
  }
}

export const CreateGroupContainer = connect()(CreateGroup);