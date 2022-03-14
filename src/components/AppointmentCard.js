import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';

import colors from '../styles/colors';

function Card({ title, subTitle, time, status, image, onPress }) {
  return (
    <TouchableHighlight
      style={styles.screen}
      underlayColor={colors.light}
      onPress={onPress}>
      <View style={styles.card}>
        <Image style={styles.image} source={{ uri: image }} />
        <View style={styles.detailsContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.time}>{time}</Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.subTitle}>{subTitle}</Text>
            <Text
              style={[
                status ? styles.active : styles.completed,
                styles.status,
              ]}>
              {status ? 'Active' : 'Completed'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  active: {
    color: colors.green,
  },
  completed: {
    color: colors.orange,
  },
  screen: {
    flex: 1,
    // backgroundColor: colors.red,
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
    padding: 5,
  },
  leftContainer: {
    flex: 2,
    alignItems: 'flex-start',
    marginVertical: 10,
    // backgroundColor: colors.red,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginVertical: 10,
    marginRight: 10,
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
    marginBottom: 5,
  },
  time: {
    color: colors.medium,
    fontWeight: '100',
    fontSize: 12,
    marginTop: 15,
  },
  subTitle: {
    color: colors.dark,
    fontWeight: '200',
    marginBottom: 6,
  },
  status: {
    fontWeight: '700',
    fontSize: 15,
    marginTop: 10,
  },
});

export default Card;
