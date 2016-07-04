import axios from 'axios';
import { receiveUserData, receiveGroupData } from './action_creators';

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
};

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