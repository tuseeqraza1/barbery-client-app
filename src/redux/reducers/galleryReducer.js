import {
	GET_PICTURE,
	ADD_PICTURE,
	DELETE_PICTURE,
	SET_PICTURE_LOADING,
	LOGOUT,
} from '../types';

const initialState = {
	collection: null,
	loading: false,
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_PICTURE:
			return {
				...state,
				collection: payload,
				loading: false,
			};
		case ADD_PICTURE:
			return {
				...state,
				collection: [...state.collection, payload],
				loading: false,
			};
		case DELETE_PICTURE:
			return {
				...state,
				collection: state.collection.filter(
					(picture) => picture._id !== payload,
				),
				loading: false,
			};
		case SET_PICTURE_LOADING:
			return {
				...state,
				loading: payload,
			};
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};
