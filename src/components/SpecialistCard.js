import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import colors from '../styles/colors';

function SpecialistCard({ title, image, onPress }) {
  return (
    <TouchableOpacity
      style={styles.screen}
      underlayColor={colors.light}
      onPress={onPress}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginBottom: 10,
          height: 80,
          width: 80,
        }}>
        <Image style={styles.card} source={{ uri: image }} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  card: {
    height: '100%',
    width: '100%',
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

export default SpecialistCard;
