import {
	GET_SPECIALISTS,
	ADD_SPECIALIST,
	UPDATE_SPECIALIST,
	DELETE_SPECIALIST,
	UPDATE_SPECIALIST_STATUS,
	SET_SPECIALIST_LOADING,
	LOGOUT,
} from '../types';

const initialState = {
	specialists: null,
	loading: false,
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_SPECIALISTS:
			return {
				...state,
				specialists: payload,
				loading: false,
			};
		case ADD_SPECIALIST:
			return {
				...state,
				specialists: [...state.specialists, payload],
				loading: false,
			};
		case UPDATE_SPECIALIST_STATUS:
		case UPDATE_SPECIALIST:
			return {
				...state,
				specialists: state.specialists.map((specialist) =>
					specialist._id === payload._id ? payload : specialist,
				),
				loading: false,
			};
		case DELETE_SPECIALIST:
			return {
				...state,
				specialists: state.specialists.filter(
					(specialist) => specialist._id !== payload,
				),
				loading: false,
			};
		case SET_SPECIALIST_LOADING:
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
