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

  render() {

  	let debts = this.state.debts.map((debt, index) => {
  		return (
  			<tr key={index} id={index}>
  				<td>{debt.userFrom}</td>
  				<td>{debt.userTo}</td>
  				<td>{debt.group}</td>
  				<td>{debt.whatFor}</td>
  				<td>{debt.amount}</td>
  			</tr>
  		);
  	});

    return (
      <div>
      	<table class="table">
			    <thead>
			      <tr>
			        <th>In debt</th>
			        <th>Debt to</th>
			        <th>Group</th>
			        <th>What for</th>
			        <th>Amount</th>
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