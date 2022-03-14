import axios from '../../../config';
import {
	GET_SERVICES,
	ADD_SERVICE,
	UPDATE_SERVICE,
	DELETE_SERVICE,
	UPDATE_STATUS,
	SET_SERVICE_LOADING,
	LOGOUT,
	SET_ERROR,
	UPDATE_RECORDS,
} from '../types';

export const getServices = () => async (dispatch) => {
	try {
		dispatch({ type: SET_SERVICE_LOADING, payload: true });
		const res = await axios.get('/service');
		dispatch({ type: GET_SERVICES, payload: res.data });
	} catch (err) {
		dispatch({ type: SET_SERVICE_LOADING, payload: false });
		dispatch({ type: SET_ERROR, payload: err.response.data.msg });
	}
};

export const addService = (data) => async (dispatch) => {
	try {
		dispatch({ type: SET_SERVICE_LOADING, payload: true });
		const res = await axios.post('/service', data);
		dispatch({ type: ADD_SERVICE, payload: res.data });
	} catch (err) {
		console.log('object', err.response.data);
		dispatch({ type: SET_SERVICE_LOADING, payload: false });
		dispatch({ type: SET_ERROR, payload: err.response.data });
	}
};

export const updateService = (data) => async (dispatch) => {
	try {
		dispatch({ type: SET_SERVICE_LOADING, payload: true });
		const res = await axios.put(`/service/${data._id}`, data);
		dispatch({ type: UPDATE_SERVICE, payload: res.data });
	} catch (err) {
		console.log('object', err.response.data);
		dispatch({ type: SET_SERVICE_LOADING, payload: false });
		dispatch({ type: SET_ERROR, payload: err.response.data });
	}
};

export const updateStatus = (data) => async (dispatch) => {
	try {
		dispatch({ type: SET_SERVICE_LOADING, payload: true });
		const res = await axios.put(`/service/${data._id}`, {
			status: data.status,
		});
		dispatch({ type: UPDATE_STATUS, payload: res.data });
	} catch (err) {
		// console.log('object', err.response.data);
		dispatch({ type: SET_SERVICE_LOADING, payload: false });
		dispatch({ type: SET_ERROR, payload: err.response.data });
	}
};

export const deleteService = (data) => async (dispatch) => {
	try {
		dispatch({ type: SET_SERVICE_LOADING, payload: true });
		const res = await axios.delete(`/service/${data._id}`);
		dispatch({ type: DELETE_SERVICE, payload: data._id });
		// dispatch({ type: UPDATE_RECORDS });
	} catch (err) {
		dispatch({ type: SET_SERVICE_LOADING, payload: false });
		dispatch({ type: SET_ERROR, payload: err.response.data.msg });
	}
};
