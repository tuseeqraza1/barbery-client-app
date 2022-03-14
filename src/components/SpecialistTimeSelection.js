/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import colors from '../styles/colors';

function SpecialistTimeSelection({ title, image, onPress, itemColor }) {
  return (
    <TouchableOpacity
      style={styles.screen}
      underlayColor={colors.light}
      onPress={onPress}>
      <View
        style={{ flex: 1, alignItems: 'center', backgroundColor: itemColor }}>
        <Image style={styles.card} source={{ uri: image }} />
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  card: {
    height: 80,
    width: 80,
    backgroundColor: colors.white,
    borderRadius: 50,
    overflow: 'hidden',
    marginTop: 5,
  },
  title: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default SpecialistTimeSelection;
