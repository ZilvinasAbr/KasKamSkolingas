import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { toJS } from 'immutable';

export class Group extends React.Component {
	constructor(props) {
		super(props);

		this.renderDebt = this.renderDebt.bind(this);
	}

	renderDebt(debt, index) {
		debt = debt.toJS();
		let date = new Date(debt.dateCreated);

		return (
  		<tr key={index} id={index}>
  			<td>{date.toLocaleString()}</td>
  			<td>{debt.userFrom}</td>
  			<td>{debt.userTo}</td>
  			<td>{debt.group}</td>
  			<td>{debt.whatFor}</td>
  			<td>{debt.amount}</td>
  		</tr>
  	);
	}

  render() {

  	let groupDebts;

  	if(this.props.debts === undefined){
  		groupDebts = (<tr>Loading...</tr>);
  	}else {
  		groupDebts = this.props.debts.map((debt, index) => (
  		this.renderDebt(debt,index)
  		));
  	}

    return (
    	<div>
	      <div>
	      	{this.props.currentGroup}
	      </div>
	      <table class="table">
				    <thead>
				      <tr>
				      	<th>Date created</th>
				        <th>In debt</th>
				        <th>Debt to</th>
				        <th>Group</th>
				        <th>What for</th>
				        <th>Amount</th>
				      </tr>
				    </thead>
				    <tbody>
				      {groupDebts}
				    </tbody>
				 </table>
			 </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentGroup: state.get('currentGroup'),
    debts: state.getIn(['groupData', 'debts'])
  }
}

export const GroupContainer = connect(mapStateToProps)(Group);