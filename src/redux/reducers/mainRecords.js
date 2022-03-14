import {
  SET_CURRENT_USER,
  SET_UPDATE_LOADING,
  UPDATE_CURRENT_USER,
  LOGOUT,
} from '../types';

const initialState = {
  user: null,
  loading: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_CURRENT_USER:
    case SET_CURRENT_USER:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    case SET_UPDATE_LOADING:
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
