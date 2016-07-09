import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { GroupContainer } from './Group';
import { setCurrentGroup, receiveUserData } from '../action_creators';
import { fetchGroupData } from '../actions';

export class LeaveGroup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    	group: ''
    };

    this.onGroupChange = this.onGroupChange.bind(this);
    this.handleLeaveGroup = this.handleLeaveGroup.bind(this);
  }

  onGroupChange(e) {
  	this.setState({
  		group: e.target.value
  	});
  	console.log(this.state);
  }

  handleLeaveGroup() {
  	console.log("Group left");
  	axios.post('api/group/leave', {
  		Name: this.state.group
  	})
  	.then((response) => {
  		if(response.data === true) {
  			this.props.dispatch(receiveUserData());
  		}else {
  			console.log('Could not leave the group');
  		}
  	})
  	.catch((error) => {
  		console.log(error);
  	});
  }

  render() {
    if(this.props.groups === undefined || this.props.groups === null) {
      return (<div>Error</div>);
    }

    return (
      <div>
      	Select group to leave:
      	<select onChange={this.onGroupChange}>
      		<option key={-1} value="-1"></option>
      		{this.props.groups.map((group, index) => (
      			<option key={index} value={group}>{group}</option>
      			))}
      	</select>
      	<button onClick={this.handleLeaveGroup}>Leave group</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    groups: state.getIn(['userData', 'groups'])
  }
}

export const LeaveGroupContainer = connect(mapStateToProps)(LeaveGroup);