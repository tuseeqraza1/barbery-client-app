import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet } from 'react-native';

import colors from '../../styles/colors';
import Separator from '../../components/Separator';
import { color } from 'react-native-reanimated';

const specialistDetails = {
  name: 'Tuseeq Ahmed',
  image: require('../../assets/images/image_1.jpg'),
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,",
};

function SpecialistDetailsScreen(props) {
  return (
    <ScrollView style={{ backgroundColor: colors.white }}>
      <Image style={styles.image} source={specialistDetails.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{specialistDetails.name}</Text>
        <Separator />
        <Text style={styles.heading}>About</Text>
        <Text style={styles.description}>{specialistDetails.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  description: {
    textAlign: 'justify',
    color: colors.dark,
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
  },
  heading: {
    color: colors.black,
    fontWeight: '300',
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    color: colors.black,
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 10,
  },
});

export default SpecialistDetailsScreen;
