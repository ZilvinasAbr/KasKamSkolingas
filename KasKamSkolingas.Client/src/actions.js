import fetch from 'isomorphic-fetch';
import axios from 'axios';
import {
	receiveUserData,
	receiveGroupData,
	requestHomePageData,
	receiveHomePageData
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

		return axios.get('api/account/homepagedata')
			.then(response => {
				dispatch(receiveHomePageData(response.data))
			})
			.catch(error => console.log(error));
	}
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