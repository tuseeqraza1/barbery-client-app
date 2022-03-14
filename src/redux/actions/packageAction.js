import axios from '../../../config';
import {
	GET_PACKAGES,
	ADD_PACKAGE,
	UPDATE_PACKAGE,
	DELETE_PACKAGE,
	UPDATE_PACKAGE_STATUS,
	SET_PACKAGE_LOADING,
	LOGOUT,
	SET_ERROR,
} from '../types';

export const getPackages = () => async (dispatch) => {
	try {
		dispatch({ type: SET_PACKAGE_LOADING, payload: true });
		const res = await axios.get('/package');
		dispatch({ type: GET_PACKAGES, payload: res.data });
		// console.log(res.data);
	} catch (err) {
		console.log('object', err.response.data);
		dispatch({ type: SET_PACKAGE_LOADING, payload: false });
		dispatch({ type: SET_ERROR, payload: err.response.data.msg });
	}
};

export const addPackage = (data) => async (dispatch) => {
	try {
		dispatch({ type: SET_PACKAGE_LOADING, payload: true });
		const res = await axios.post('/package', data);
		dispatch({ type: ADD_PACKAGE, payload: res.data });
	} catch (err) {
		console.log('object', err.response.data);
		dispatch({ type: SET_PACKAGE_LOADING, payload: false });
		dispatch({ type: SET_ERROR, payload: err.response.data });
	}
};

export const updatePackage = (data) => async (dispatch) => {
	try {
		dispatch({ type: SET_PACKAGE_LOADING, payload: true });
		const res = await axios.put(`/package/${data._id}`, data);
		dispatch({ type: UPDATE_PACKAGE, payload: res.data });
	} catch (err) {
		console.log('object', err.response.data);
		dispatch({ type: SET_PACKAGE_LOADING, payload: false });
		dispatch({ type: SET_ERROR, payload: err.response.data });
	}
};

export const updatePackageStatus = (data) => async (dispatch) => {
	try {
		dispatch({ type: SET_PACKAGE_LOADING, payload: true });
		const res = await axios.put(`/package/${data._id}`, {
			status: data.status,
		});
		dispatch({ type: UPDATE_PACKAGE_STATUS, payload: res.data });
	} catch (err) {
		// console.log('object', err.response.data);
		dispatch({ type: SET_PACKAGE_LOADING, payload: false });
		dispatch({ type: SET_ERROR, payload: err.response.data });
	}
};

export const deletePackage = (data) => async (dispatch) => {
	try {
		dispatch({ type: SET_PACKAGE_LOADING, payload: true });
		const res = await axios.delete(`/package/${data._id}`);
		dispatch({ type: DELETE_PACKAGE, payload: data._id });
		// dispatch({ type: UPDATE_RECORDS });
	} catch (err) {
		dispatch({ type: SET_PACKAGE_LOADING, payload: false });
		dispatch({ type: SET_ERROR, payload: err.response.data.msg });
	}
};
