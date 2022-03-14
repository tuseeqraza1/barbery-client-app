import {
	GET_PACKAGES,
	ADD_PACKAGE,
	UPDATE_PACKAGE,
	DELETE_PACKAGE,
	UPDATE_PACKAGE_STATUS,
	SET_PACKAGE_LOADING,
	LOGOUT,
} from '../types';

const initialState = {
	packages: null,
	loading: false,
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_PACKAGES:
			return {
				...state,
				packages: payload,
				loading: false,
			};
		case ADD_PACKAGE:
			return {
				...state,
				packages: [...state.packages, payload],
				loading: false,
			};
		case UPDATE_PACKAGE_STATUS:
		case UPDATE_PACKAGE:
			return {
				...state,
				packages: state.packages.map((pkg) =>
					pkg._id === payload._id ? payload : pkg,
				),
				loading: false,
			};
		case DELETE_PACKAGE:
			return {
				...state,
				packages: state.packages.filter((pkg) => pkg._id !== payload),
				loading: false,
			};
		case SET_PACKAGE_LOADING:
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
