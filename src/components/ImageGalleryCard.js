import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import colors from '../styles/colors';

export default function ImageGalleryCard({ image, onPress }) {
  const width = Math.round(Dimensions.get('window').width);

  return (
    <View style={styles.screen}>
      <TouchableOpacity
        style={{
          height: width / 4,
          width: width / 4,
          backgroundColor: colors.white,
          overflow: 'hidden',
        }}
        onPress={onPress}>
        <Image style={styles.image} source={{ uri: image }} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1 / 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
