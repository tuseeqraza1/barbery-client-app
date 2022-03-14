import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';

import colors from '../styles/colors';

function Card({ title, subTitle, category, about, image }) {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Image style={styles.image} source={{ uri: image }} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.subHeadings}>
            <Text style={styles.category}>Type: {category}</Text>
            <Text style={styles.subTitle}>{subTitle}</Text>
          </View>
          <Text style={styles.about}>{about}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 15,
    elevation: 10,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowRadius: 20,
  },
  detailsContainer: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  image: {
    width: '40%',
    height: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    // marginBottom: 5,
    color: colors.black,
  },
  subTitle: {
    fontSize: 14,
    color: colors.red,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 14,
    fontWeight: '200',
    color: colors.dark2,
  },
  subHeadings: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  about: {
    marginTop: 5,
    fontSize: 14,
    color: colors.medium,
    textAlign: 'justify',
  },
});

export default Card;
