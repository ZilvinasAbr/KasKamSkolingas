import React from 'react';
import axios from 'axios';

export default class Statistics extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			overallBalance: '',
			inDebt: '',
			debtTo: ''
		};
	}

	componentDidMount() {
		axios.get('api/account/getuserstatistics')
			.then((response) => {
				this.setState({
					overallBalance: response.data.overallBalance,
					inDebt: response.data.inDebt,
					debtTo: response.data.debtTo
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<div>
				<p>In debt: {this.state.inDebt}</p>
				<p>Debt to you: {this.state.debtTo}</p>
				<p>Overall balance: {this.state.overallBalance}</p>
			</div>
		);
	}
}