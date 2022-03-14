import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from '../../../config';

import LoadingIndicator from '../../components/LoadingIndicator';
import Card from '../../components/AppointmentCard';
import colors from '../../styles/colors';

export default function AppointmentScreen(props) {
  const [appointments, setAppointments] = useState();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('/appointment/user').then((res) => {
      setAppointments(
        res.data.map((SS) => ({
          title: SS?.specialist?.name,
          image: `data:${SS?.specialist?.picture?.type};base64,${SS?.specialist?.picture?.data}`,
          status: SS.status,
          price: SS.bill,
          time: SS.timing,
          date: SS.date,
          id: SS._id,
          services: SS?.services,
          promo: SS?.promo,
          bill: SS?.bill,
          review: SS?.review,
        })),
      );
      setLoading(false);
    });
  }, []);

  return (
    <View style={styles.screen}>
      {loading && <LoadingIndicator />}
      <FlatList
        contentContainerStyle={{ paddingBottom: 15 }}
        style={styles.flatScreen}
        data={appointments}
        keyExtractor={(val, index) => index.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={'Rs. ' + item.price}
            time={item.time}
            status={item.status}
            image={item.image}
            onPress={() =>
              props.navigation.navigate('Appointment Details', { item })
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  flatScreen: {
    flex: 1,
    paddingTop: 10,
  },
  row: {
    alignContent: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  rowInput: {
    width: '100%',
  },
  textInput: {
    flexDirection: 'row',
    height: 40,
    borderRadius: 20,
    elevation: 5,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    margin: 15,
    borderWidth: 1,
    borderColor: colors.red,
    backgroundColor: colors.white,
  },
});
