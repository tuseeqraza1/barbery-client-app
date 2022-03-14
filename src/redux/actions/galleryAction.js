import axios from '../../../config';
import {
	GET_PICTURE,
	ADD_PICTURE,
	DELETE_PICTURE,
	SET_PICTURE_LOADING,
	LOGOUT,
	SET_ERROR,
} from '../types';

export const getCollection = () => async (dispatch) => {
	try {
		dispatch({ type: SET_PICTURE_LOADING, payload: true });
		const res = await axios.get('/collection');
		dispatch({ type: GET_PICTURE, payload: res.data });
		// console.log(res.data);
	} catch (err) {
		console.log('object', err.response.data);
		dispatch({ type: SET_PICTURE_LOADING, payload: false });
		dispatch({ type: SET_ERROR, payload: err.response.data.msg });
	}
};

export const addPicture = (data) => async (dispatch) => {
	try {
		dispatch({ type: SET_PICTURE_LOADING, payload: true });
		const res = await axios.post('/collection', data);
		dispatch({ type: ADD_PICTURE, payload: res.data });
	} catch (err) {
		console.log('object', err.response.data);
		dispatch({ type: SET_PICTURE_LOADING, payload: false });
		dispatch({ type: SET_ERROR, payload: err.response.data });
	}
};

export const deletePicture = (data) => async (dispatch) => {
	try {
		dispatch({ type: SET_PICTURE_LOADING, payload: true });
		const res = await axios.delete(`/collection/${data._id}`);
		dispatch({ type: DELETE_PICTURE, payload: data._id });
		// dispatch({ type: UPDATE_RECORDS });
	} catch (err) {
		dispatch({ type: SET_PICTURE_LOADING, payload: false });
		dispatch({ type: SET_ERROR, payload: err.response.data.msg });
	}
};
