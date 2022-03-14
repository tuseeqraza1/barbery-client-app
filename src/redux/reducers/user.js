import { SET_TOKEN, SET_LOADING, LOGIN, LOGOUT, SIGNUP } from '../types';

const initialState = {
  loading: false,
  token: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
    case SIGNUP:
    case SET_TOKEN:
      return {
        ...state,
        token: payload,
        loading: false,
      };

    case SET_LOADING:
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
