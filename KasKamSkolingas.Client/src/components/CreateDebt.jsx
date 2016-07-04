import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setCurrentPage } from '../action_creators';
import { fetchGroupData } from '../actions';

export class CreateDebt extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			group: '',
			user: '',
			amount: 0,
			whatFor: ''
		};

		this.onUserChange = this.onUserChange.bind(this);
		this.onGroupChange = this.onGroupChange.bind(this);
		this.onAmountChange = this.onAmountChange.bind(this);
		this.onWhatForChange = this.onWhatForChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onUserChange(e) {
		this.setState({ user: e.target.value });
		console.log(this.state);
	}

	onGroupChange(e) {
		this.setState({ group: e.target.value });
		fetchGroupData(this.props.dispatch, e.target.value);
		console.log(this.state);
	}

	onAmountChange(e) {
		this.setState({ amount: e.target.value });
		console.log(this.state);
	}

	onWhatForChange(e) {
		this.setState({ whatFor: e.target.value });
		console.log(this.state);
	}

	onSubmit() {
		axios.post('api/debt/create', {
			GroupName: this.state.group,
			UsernameFrom: this.state.user,
			Amount: this.state.amount,
			WhatFor: this.state.whatFor
		})
		.then((response) => {
			if(response.data === true) {
				this.props.dispatch(setCurrentPage('Landing'));
			}else {
				console.log('Could not create debt');
			}
		})
		.catch((error) => {
			console.log(error);
		})
	}

  render() {

  	let users;
  	if(this.props.groupUsers !== undefined &&
  		 this.props.groupUsers !== null) {
  		users = this.props.groupUsers.map((user, index) => (
  			<option key={index} id={index} value={user}>{user}</option>
  		));
  	}else{
  	}

    return (
      <div>
      	Create debt
      	<div>
      		Group:
      		<select onChange={this.onGroupChange}>
      			<option key='-1' id='-1' value=''></option>
      		{
      			this.props.groups.map((group, index) => (
      				<option key={index} id={index} value={group}>{group}</option>
      			))
      		}
      		</select>
      	</div>
      	<div>
      		User:
      		<select onChange={this.onUserChange}>
      			<option key='-1' id='-1' value=''></option>
      			{users}
      		</select>
      	</div>
      	<div>
      		Amount: <input type='number' onChange={this.onAmountChange} value={this.state.amount} />
      	</div>
      	<div>
      		What for: <input type='text' onChange={this.onWhatForChange} value={this.state.whatFor} />
      	</div>
      	<div>
      		<button onClick={this.onSubmit}>Submit</button>
      	</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  	groups: state.getIn(['userData', 'groups']),
  	groupUsers: state.getIn(['groupData', 'users'])
  }
}

export const CreateDebtContainer = connect(mapStateToProps)(CreateDebt);