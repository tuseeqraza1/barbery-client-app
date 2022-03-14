import React from 'react';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
import user from './reducers/user';
import mainRecords from './reducers/mainRecords';
// import serviceReducer from './reducers/serviceReducer';
// import packageReducer from './reducers/packageReducer';
// import specialistReducer from './reducers/specialistReducer';
// import galleryReducer from './reducers/galleryReducer';

const config = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  user,
  mainRecords,
  // serviceReducer,
  // packageReducer,
  // specialistReducer,
  // galleryReducer,
});

export default persistReducer(config, rootReducer);
