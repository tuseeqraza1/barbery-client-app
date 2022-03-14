import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import { Rating } from 'react-native-ratings';

import colors from '../styles/colors';

function ReviewCard({ title, text, rated, time, image }) {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Image style={styles.image} source={{ uri: image }} />
        <View style={{ flex: 1 }}>
          <View style={styles.detailsContainer}>
            <View style={styles.leftContainer}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.time}>{time}</Text>
            </View>
            <View style={styles.rightContainer}>
              <Rating
                style={styles.rating}
                imageSize={14}
                ratingCount={5}
                startingValue={rated}
                readonly={true}
              />
            </View>
          </View>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  completed: {
    color: colors.orange,
  },
  screen: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  card: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: colors.white,
    elevation: 10,
    flexDirection: 'row',
    // marginHorizontal: 5,
    // marginTop: 20,
    overflow: 'hidden',
    shadowRadius: 20,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  leftContainer: {
    flex: 2,
    alignItems: 'flex-start',
    marginVertical: 10,
    // backgroundColor: colors.red,
  },
  rightContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    // alignItems: 'flex-end',
    // marginVertical: 10,
    // marginRight: 10,
    // backgroundColor: colors.red,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    margin: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  time: {
    color: colors.medium,
    fontWeight: '100',
    fontSize: 12,
    marginTop: 5,
  },
  text: {
    textAlign: 'justify',
    color: colors.dark,
    paddingBottom: 10,
    marginRight: 5,
    paddingHorizontal: 10,
    // backgroundColor: colors.red,
  },
  rating: {
    // color: colors.dark,
    // fontWeight: '200',
    // marginBottom: 6,
    alignItems: 'flex-end',
    marginTop: 10,
    marginHorizontal: 20,
    // backgroundColor: colors.red,
  },
  status: {
    fontWeight: '700',
    fontSize: 15,
    marginTop: 10,
  },
});

export default ReviewCard;
