import axios from 'axios';

/*function requestUserData() {
	return {type: 'REQUEST_USER_DATA'}
};*/

function receiveUserData(json) {
	return {
		type: 'RECEIVE_USER_DATA',
		data: json
	}
};

export function fetchUserData(dispatch) {
	axios.get('api/account/getuserdata')
		.then((response) => {
			dispatch(receiveUserData(response.data));
		})
		.catch((error) => {
			console.log(error);
		});
};

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