import 'react-native-gesture-handler';
import React from 'react';

import ClientStack from './src/components/AuthStack';
import axios from 'axios';
import setAuthToken from './config';
import { connect } from 'react-redux';
import { StatusBar } from 'react-native';
import colors from './src/styles/colors';

function App({ token }) {
  return (
    <>
      <StatusBar backgroundColor={colors.red} />
      <ClientStack />
    </>
  );
}

const mapStateToProps = ({ user: { token } }) => ({ token });

export default connect(mapStateToProps)(App);
