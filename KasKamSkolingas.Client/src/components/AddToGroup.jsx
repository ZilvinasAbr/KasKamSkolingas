import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setCurrentPage } from '../action_creators';

export class AddToGroup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			group: '',
			user: ''
		};

		this.onUserChange = this.onUserChange.bind(this);
		this.onGroupChange = this.onGroupChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onUserChange(e) {
		this.setState({ user: e.target.value });
		console.log(this.state);
	}

	onGroupChange(e) {
		this.setState({ group: e.target.value });
		console.log(this.state);
	}

	onSubmit() {
		axios.post('api/group/addtogroup', {
			GroupName: this.state.group,
			Username: this.state.user
		})
		.then((response) => {
			if(response.data === true) {
				this.props.dispatch(setCurrentPage('Landing'));
			}else {
				console.log('Could not add to group');
			}
		})
		.catch((error) => {
			console.log(error);
		})
	}

  render() {
    return (
      <div>
      	Add to group
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
      		User: <input type='text' onChange={this.onUserChange} value={this.state.user} />
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
  	groups: state.userData.groups
  }
}

export const AddToGroupContainer = connect(mapStateToProps)(AddToGroup);