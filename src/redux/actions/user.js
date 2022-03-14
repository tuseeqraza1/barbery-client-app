import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../../config';
import {
  SET_CURRENT_USER,
  UPDATE_CURRENT_USER,
  SET_TOKEN,
  SET_LOADING,
  SET_ERROR,
  LOGIN,
  LOGOUT,
  SIGNUP,
  GET_RECORDS,
} from '../types';

export const signup = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    console.log('object1111111111');
    console.log('OBJECT : ', data);
    const res = await axios.post('/users', data);
    console.log('object2222222222');
    await AsyncStorage.setItem('@Token', res.data.token);
    console.log('object', res.data);
    dispatch({ type: SIGNUP, payload: res.data.token });
  } catch (err) {
    console.log('Error Object', err.response.data);
    dispatch({ type: SET_LOADING, payload: false });
    dispatch({ type: SET_ERROR, payload: err.response.data });
  }
};

export const login = (data) => async (dispatch) => {
  try {
    // console.log('object1');
    dispatch({ type: SET_LOADING, payload: true });
    const res = await axios.post('/auth', data);
    await AsyncStorage.setItem('@Token', res.data.token);
    dispatch({ type: LOGIN, payload: res.data.token });
  } catch (err) {
    console.log('object', err.response.data);
    dispatch({ type: SET_LOADING, payload: false });
    dispatch({ type: SET_ERROR, payload: err.response.data });
  }
};

export const logout = () => ({ type: LOGOUT });
