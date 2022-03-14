import axios from '../../../config';
import {
  SET_CURRENT_USER,
  UPDATE_CURRENT_USER,
  SET_UPDATE_LOADING,
  SET_ERROR,
  GET_RECORDS,
} from '../types';

export const getUser = () => async (dispatch) => {
  try {
    dispatch({ type: SET_UPDATE_LOADING, payload: true });
    console.log('object 1111111111111');
    const res = await axios.get('/auth');
    console.log('object 2222222222222');
    dispatch({ type: SET_CURRENT_USER, payload: res.data });
    console.log('object 3333333333333', res.data);
  } catch (err) {
    console.log('object', err.response.data);
    dispatch({ type: SET_UPDATE_LOADING, payload: false });
    dispatch({ type: SET_ERROR, payload: err.response.data.msg });
  }
};

export const updateUser = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_UPDATE_LOADING, payload: true });
    const res = await axios.put('/users', data);
    dispatch({ type: UPDATE_CURRENT_USER, payload: res.data });
  } catch (err) {
    console.log('object', err.response.data);
    dispatch({ type: SET_UPDATE_LOADING, payload: false });
    dispatch({ type: SET_ERROR, payload: err.response.data });
  }
};

// export const getRecords = () => async (dispatch) => {
//   try {
//     dispatch({ type: SET_UPDATE_LOADING, payload: true });
//     const res = await axios.get('/barber/records');
//     dispatch({ type: GET_RECORDS, payload: res.data });
//   } catch (err) {
//     dispatch({ type: SET_UPDATE_LOADING, payload: false });
//     dispatch({ type: SET_ERROR, payload: err.response.data.msg });
//   }
// };
