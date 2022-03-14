/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  FlatList,
  LogBox,
} from 'react-native';
import Modal, {
  ModalTitle,
  ModalFooter,
  ModalButton,
  ModalContent,
} from 'react-native-modals';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';

import SpecialistTimeSelection from '../../components/SpecialistTimeSelection';
import LoadingIndicator from '../../components/LoadingIndicator';
import colors from '../../styles/colors';
import axios from '../../../config';

const slots = [
  {
    id: 1,
    timing: '10:00 AM',
    available: true,
  },
  {
    id: 2,
    timing: '11:00 AM',
    available: true,
  },
  {
    id: 3,
    timing: '12:00 PM',
    available: false,
  },
  {
    id: 4,
    timing: '1:00 PM',
    available: true,
  },
  {
    id: 5,
    timing: '2:00 PM',
    available: true,
  },
  {
    id: 6,
    timing: '3:00 PM',
    available: false,
  },
  {
    id: 7,
    timing: '4:00 PM',
    available: true,
  },
  {
    id: 8,
    timing: '5:00 PM',
    available: true,
  },
  {
    id: 9,
    timing: '6:00 PM',
    available: true,
  },
  {
    id: 10,
    timing: '7:00 PM',
    available: true,
  },
  {
    id: 11,
    timing: '8:00 PM',
    available: false,
  },
  {
    id: 12,
    timing: '9:00 PM',
    available: false,
  },
];

const TimeSelectionScreen = (props) => {
  const height = Math.round(Dimensions.get('window').height);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [getValue, setValue] = useState('');
  const [getColor, setColor] = useState(colors.light);
  const [getId, setId] = useState(-1);
  const [getSlotId, setSlotId] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [saloonSpecialist, setSaloonSpecialists] = useState([]);

  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);
  }, []);

  const bookAppointment = () => {
    let payload = {
      bill: props.route.params.total,
      timing: slots.find((s) => s.id == getSlotId)?.timing,
      date: date,
      services: Object.keys(props.route.params.selected)
        .filter((K) => props.route.params.selected[K] !== -1)
        .map((K) => props.route.params.selected[K]),
      specialist: getId,
      barber: props.route.params.id,
    };
    console.log('PAYLOAD 11111111', payload);
    axios.post('/appointment', payload).then((res) => {
      console.log(res.data);
    });
    setModalVisibility(true);
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/saloon/saloonSpecialist/${props.route.params.id}`)
      .then((res) => {
        console.log(res.data);
        setSaloonSpecialists(
          res.data
            .filter((SS) => SS.status)
            .map((SS) => ({
              title: SS.name,
              image: `data:${SS?.picture?.type};base64,${SS?.picture?.data}`,
              id: SS._id,
              slots: slots.map((S) => ({
                ...S,
                available: parseInt(Math.random() * 10) % 3 == 0,
              })),
            })),
        );
        setLoading(false);
      });
  }, [props.route.params.id]);
  useEffect(() => {
    // console.log(`from use effect ${getSlotId}`);
  }, [getSlotId]);

  const slotColorHandler = (id) => {
    setSlotId((ids) => [id]);
  };

  const handleSpecialistSelection = (id) => {
    console.log('hi did the color changed?');
    setId(id);
    setColor(colors.light2);
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setValue(
      `${date.toString().slice(0, 3)}, ${date
        .toString()
        .slice(4, 10)}, ${date.toString().slice(11, 15)}`,
    );
  };
  return (
    <>
      {loading && <LoadingIndicator />}
      <View style={styles.screen}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            marginTop: height * 0.02,
            marginHorizontal: 20,
            // marginBottom: 5,
          }}>
          Select Date
        </Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setShow(true);
            }}
            style={styles.rowInput}>
            <View style={styles.textInput}>
              <TextInput
                style={{
                  fontSize: 16,
                  color: colors.dark,
                  paddingVertical: 8,
                }}
                editable={false}
                maxLength={50}
                value={getValue}
              />
              <Icon
                name="calendar"
                style={{ paddingVertical: 8 }}
                color={colors.dark}
                size={20}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            marginHorizontal: 20,
            marginVertical: 5,
          }}>
          Saloon Specialists
        </Text>
        <View
          style={{
            height: 120,
            backgroundColor: colors.white,
          }}>
          <FlatList
            style={{ flex: 1 }}
            horizontal={true}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={saloonSpecialist}
            keyExtractor={(listing) => listing.id.toString()}
            renderItem={({ item }) => (
              <SpecialistTimeSelection
                title={item.title}
                status={item.status}
                image={item.image}
                itemColor={item.id === getId ? getColor : colors.white}
                onPress={() => handleSpecialistSelection(item.id)}
              />
            )}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              // marginTop: height * 0.02,
              marginVertical: 5,
              marginHorizontal: 20,
            }}>
            Available Slots
          </Text>
          <View
            style={{
              flexDirection: 'row',
              // alignItems: 'flex-start',
              marginHorizontal: 10,
              marginVertical: 5,
              flexWrap: 'wrap',
            }}>
            {(
              saloonSpecialist?.find((SS) => SS.id == getId)?.slots || slots
            ).map((slot, index) => (
              <View
                key={slot.id}
                style={{
                  marginHorizontal: 10,
                  marginVertical: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  disabled={slot.available === false ? true : false}
                  style={{
                    width: 110,
                    borderWidth: 1,
                    borderColor:
                      slot.available === true ? colors.dark : colors.red,
                    padding: 5,
                    backgroundColor:
                      slot.available === true
                        ? getSlotId.includes(slot.id)
                          ? colors.green
                          : colors.white
                        : colors.red,
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    slotColorHandler(slot.id);
                  }}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      color:
                        slot.available === true
                          ? getSlotId.includes(slot.id)
                            ? colors.white
                            : colors.dark
                          : colors.white,
                    }}>
                    {slot.timing}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
        <View style={{ marginTop: height * 0.03, justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              bookAppointment();
            }}>
            <LinearGradient
              colors={[colors.orange, colors.red]}
              style={[styles.button]}>
              <Text style={styles.textBtn}>Confirm</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View>
          <Modal
            modalTitle={
              <ModalTitle
                textStyle={{ color: colors.white }}
                style={{ backgroundColor: colors.red }}
                title="Appointment Confirmed"
              />
            }
            visible={modalVisibility}
            footer={
              <ModalFooter>
                <ModalButton
                  textStyle={{ color: colors.red, fontSize: 16 }}
                  text="CANCEL"
                  onPress={() => {
                    setModalVisibility(false);
                  }}
                />
                <ModalButton
                  textStyle={{ color: colors.red, fontSize: 16 }}
                  text="OK"
                  onPress={() => {
                    setModalVisibility(false);
                    props.navigation.navigate('Appointments');
                  }}
                />
              </ModalFooter>
            }>
            <ModalContent
              style={{
                fontSize: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{ flexWrap: 'wrap', alignSelf: 'center', fontSize: 16 }}>
                Your appointment is booked. Go to appointments screen.
              </Text>
            </ModalContent>
          </Modal>
        </View>
        {show && (
          <DateTimePicker
            onChange={onChange}
            value={date}
            mode="date"
            display="default"
            maximumDate={moment().add(30, 'days').toDate()}
            minimumDate={new Date()}
          />
        )}
      </View>
    </>
  );
};

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
    // elevation: 5,
  },
  rowInput: {
    width: '100%',
  },
  textInput: {
    flexDirection: 'row',
    height: 40,
    borderRadius: 20,
    elevation: 5,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    margin: 15,
    borderWidth: 1,
    borderColor: colors.light2,
    backgroundColor: colors.light2,
  },
  button: {
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    elevation: 5,
    marginVertical: 10,
    marginHorizontal: '8%',
  },
  textBtn: {
    color: colors.white,
    fontSize: 18,
    textTransform: 'uppercase',
  },
});
export default TimeSelectionScreen;
