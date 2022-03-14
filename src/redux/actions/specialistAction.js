import axios from '../../../config';
import {
	GET_SPECIALISTS,
	ADD_SPECIALIST,
	UPDATE_SPECIALIST,
	DELETE_SPECIALIST,
	UPDATE_SPECIALIST_STATUS,
	SET_SPECIALIST_LOADING,
	LOGOUT,
	SET_ERROR,
} from '../types';

export const getSpecialists = () => async (dispatch) => {
	try {
		dispatch({ type: SET_SPECIALIST_LOADING, payload: true });
		const res = await axios.get('/specialist');
		dispatch({ type: GET_SPECIALISTS, payload: res.data });
		// console.log(res.data);
	} catch (err) {
		console.log('object', err.response.data);
		dispatch({ type: SET_SPECIALIST_LOADING, payload: false });
		dispatch({ type: SET_ERROR, payload: err.response.data.msg });
	}
};

export const addSpecialist = (data) => async (dispatch) => {
	try {
		dispatch({ type: SET_SPECIALIST_LOADING, payload: true });
		const res = await axios.post('/specialist', data);
		dispatch({ type: ADD_SPECIALIST, payload: res.data });
	} catch (err) {
		console.log('object', err.response.data);
		dispatch({ type: SET_SPECIALIST_LOADING, payload: false });
		dispatch({ type: SET_ERROR, payload: err.response.data });
	}
};

export const updateSpecialist = (data) => async (dispatch) => {
	try {
		dispatch({ type: SET_SPECIALIST_LOADING, payload: true });
		const res = await axios.put(`/specialist/${data._id}`, data);
		dispatch({ type: UPDATE_SPECIALIST, payload: res.data });
		console.log('update ajsjdj', res.data);
	} catch (err) {
		console.log('object', err.response.data);
		dispatch({ type: SET_SPECIALIST_LOADING, payload: false });
		dispatch({ type: SET_ERROR, payload: err.response.data });
	}
};

export const updateSpecialistStatus = (data) => async (dispatch) => {
	try {
		dispatch({ type: SET_SPECIALIST_LOADING, payload: true });
		const res = await axios.put(`/specialist/${data._id}`, {
			status: data.status,
		});
		dispatch({ type: UPDATE_SPECIALIST_STATUS, payload: res.data });
		console.log('update status kdsjfbnkasj ksdnfkdsj', res.data);
	} catch (err) {
		console.log('object update status', err.response.data);
		dispatch({ type: SET_SPECIALIST_LOADING, payload: false });
		dispatch({ type: SET_ERROR, payload: err.response.data });
	}
};

export const deleteSpecialist = (data) => async (dispatch) => {
	try {
		dispatch({ type: SET_SPECIALIST_LOADING, payload: true });
		const res = await axios.delete(`/specialist/${data._id}`);
		dispatch({ type: DELETE_SPECIALIST, payload: data._id });
		// dispatch({ type: UPDATE_RECORDS });
	} catch (err) {
		dispatch({ type: SET_SPECIALIST_LOADING, payload: false });
		dispatch({ type: SET_ERROR, payload: err.response.data.msg });
	}
};
