import fetch from 'isomorphic-fetch';
import axios from 'axios';
import {
	receiveUserData,
	receiveGroupData,
	requestHomePageData,
	receiveHomePageData,
	requestCreateDebtSubmit,
	receiveCreateDebtSubmit,
	requestAddToGroupSubmit,
	receiveAddToGroupSubmit
} from './action_creators';

/*function requestUserData() {
	return {type: 'REQUEST_USER_DATA'}
};*/



export function fetchUserData(dispatch) {
	axios.get('api/account/getuserdata')
		.then((response) => {
			dispatch(receiveUserData(response.data));
		})
		.catch((error) => {
			console.log(error);
		});
}

export function fetchGroupData(dispatch, groupName) {
	axios.post('api/group/getgroupdata', {
		GroupName: groupName
	})
	.then((response) => {
		dispatch(receiveGroupData(response.data));
	})
	.catch((error) => {
		console.log(error);
	})
}

export function fetchHomePageData() {
	return dispatch => {
		dispatch(requestHomePageData());

		const token = window.localStorage.getItem('token');

		return axios.get('api/account/homepagedata', {
			headers: { Authorization: `JWT ${token}` }
		})
			.then(response => {
				dispatch(receiveHomePageData(response.data))
			})
			.catch(error => console.log(error));
	};
}

export function createDebtFormSubmit(groupName, usernameFrom,
																		 amount, whatFor) {
	return dispatch => {
		dispatch(requestCreateDebtSubmit());

		return axios.post('api/debt/create', {
			GroupName: groupName,
			UsernameFrom: usernameFrom,
			Amount: amount,
			WhatFor: whatFor
		})
			.then(response => {
				dispatch(receiveCreateDebtSubmit(response.data, groupName));
			})
			.catch(error => {
				console.log(error);
			});
	}
}

export function addToGroupFormSubmit(groupName, userToAdd) {
	return dispatch => {
		dispatch(requestAddToGroupSubmit());

		const token = window.localStorage.getItem('token');

		return axios.post('api/group/addtogroup', {
			GroupName: groupName,
			Username: userToAdd
		}, {
			headers: { Authorization: `JWT ${token}` }
		})
			.then(response => {
				dispatch(receiveAddToGroupSubmit(response.data, groupName));
			})
			.catch(error => {
				console.log(error);
			});
	}
}

/*onSubmit() {
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
}*/


// Error: Use custom middleware for async actions
/*export function fetchUserData() {
	return function(dispatch) {
		return axios.get('api/account/getuserdata')
					.then((response) => {
						dispatch(receiveUserData(response.data));
					})
					.catch((error) => {
						console.log(error);
					});
	}
}*/