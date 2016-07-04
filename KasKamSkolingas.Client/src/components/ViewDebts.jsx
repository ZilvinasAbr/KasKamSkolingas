import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setCurrentPage } from '../action_creators';

export class ViewDebts extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			debts: []
		};

		this.renderDebt = this.renderDebt.bind(this);
	}

	componentDidMount() {
		axios.get('api/debt/userdebts')
			.then((response) => {
				if(response.data !== null) {
					this.setState({ debts:response.data });
					console.log(response.data);
				}
			})
			.catch((error) => {
				console.log(error);
			})
	}

	renderDebt(debt, index) {
		let date = new Date(debt.dateCreated);
		return (
  		<tr key={index} id={index}>
  			<td>{date.toLocaleString()}</td>
  			<td>{debt.userFrom}</td>
  			<td>{debt.userTo}</td>
  			<td>{debt.group}</td>
  			<td>{debt.whatFor}</td>
  			<td>{debt.amount}</td>
  			<td>
  				{(debt.isUserInDebt ? (
  					<button>Pay debt</button>
  				):(
  					<div>
  						<button>End debt</button>
  						<button>Delete debt</button>
  					</div>
  				))}
  			</td>
  		</tr>
  	);
	}

  render() {

  	let debts = this.state.debts.map((debt, index) => (
  		this.renderDebt(debt, index)
  	));

    return (
      <div>
      	<table class="table">
			    <thead>
			      <tr>
			      	<th>Date created</th>
			        <th>In debt</th>
			        <th>Debt to</th>
			        <th>Group</th>
			        <th>What for</th>
			        <th>Amount</th>
			        <th>Actions</th>
			      </tr>
			    </thead>
			    <tbody>
			      {debts}
			    </tbody>
			  </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  }
}

export const ViewDebtsContainer = connect(mapStateToProps)(ViewDebts);