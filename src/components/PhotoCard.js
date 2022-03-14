import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';

import colors from '../styles/colors';

export default function PhotoCard({ image, onPress }) {
  return (
    <View style={styles.screen}>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Image
          resizeMethod="auto"
          resizeMode="cover"
          style={styles.image}
          source={{ uri: image }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // paddingVertical: 5,
    paddingHorizontal: 10,
  },
  card: {
    height: '90%',
    width: 300,
    backgroundColor: colors.white,
    borderRadius: 15,
    elevation: 10,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
