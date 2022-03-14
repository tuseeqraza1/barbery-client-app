import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../styles/colors';

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.medium,
    opacity: 0.3,
  },
});

export default Separator;
