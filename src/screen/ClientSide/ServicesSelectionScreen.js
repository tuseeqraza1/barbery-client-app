/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  LogBox,
} from 'react-native';
import axios from '../../../config';

import LinearGradient from 'react-native-linear-gradient';
import { Picker } from '@react-native-picker/picker';

import LoadingIndicator from '../../components/LoadingIndicator';
import Separator from '../../components/Separator';
import colors from '../../styles/colors';

const ServicesSelectionScreen = (props) => {
  const [deviceHeight, setDeviceHeight] = useState(0);
  const [loading, setLoading] = React.useState(false);

  const [hair, setHair] = useState(0);
  const [selHair, setSelHair] = useState(0);
  const [shave, setShave] = useState(0);
  const [selShave, setSelShave] = useState(0);
  const [styling, setStyling] = useState(0);
  const [selStyling, setSelStyling] = useState(0);
  const [hairColor, setHairColor] = useState(0);
  const [selHairColor, setSelHairColor] = useState(0);
  const [waxing, setWaxing] = useState(0);
  const [selWaxing, setSelWaxing] = useState(0);
  const [menServices, setMenServices] = useState(0);
  const [selMenServices, setSelMenServices] = useState(0);
  const [nails, setNails] = useState(0);
  const [selNails, setSelNails] = useState(0);
  const [others, setOthers] = useState(0);
  const [selOther, setSelOthers] = useState(0);
  const [packages, setPackages] = useState(0);
  const [selPackages, setSelPackages] = useState(0);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    LogBox.ignoreLogs(['Each child in a list should have a unique "key" prop']);
  }, []);

  useEffect(() => {
    setDeviceHeight(Math.round(Dimensions.get('window').height));
  }, []);

  useEffect(() => {
    setLoading(true);
    //services
    axios.get('/saloon/saloonServices/' + props.route.params.id).then((res) => {
      setHair([
        { _id: -1, name: 'Select', cost: 0 },
        ...res.data.filter((SS) => SS.category == 'hair'),
      ]);
      setShave([
        { _id: -1, name: 'Select', cost: 0 },
        ...res.data.filter((SS) => SS.category == 'shaves'),
      ]);
      setStyling([
        { _id: -1, name: 'Select', cost: 0 },
        ...res.data.filter((SS) => SS.category == 'styling'),
      ]);
      setHairColor([
        { _id: -1, name: 'Select', cost: 0 },
        ...res.data.filter((SS) => SS.category == 'hairColor'),
      ]);
      setWaxing([
        { _id: -1, name: 'Select', cost: 0 },
        ...res.data.filter((SS) => SS.category == 'waxing'),
      ]);
      setMenServices([
        { _id: -1, name: 'Select', cost: 0 },
        ...res.data.filter((SS) => SS.category == 'menServices'),
      ]);
      setNails([
        { _id: -1, name: 'Select', cost: 0 },
        ...res.data.filter((SS) => SS.category == 'nails'),
      ]);
      setOthers([
        { _id: -1, name: 'Select', cost: 0 },
        ...res.data.filter((SS) => SS.category == 'other'),
      ]);
      setLoading(false);
    });

    //packages
    axios.get('/saloon/saloonPackages/' + props.route.params.id).then((res) => {
      // console.log(res.data);
      setPackages([{ _id: -1, name: 'Select', cost: 0 }, ...res.data]);
    });
  }, [props.route.params.id]);

  useEffect(() => {
    const totalVal =
      Number(hair ? hair[selHair].cost : 0) +
      Number(shave ? shave[selShave].cost : 0) +
      Number(styling ? styling[selStyling].cost : 0) +
      Number(hairColor ? hairColor[selHairColor].cost : 0) +
      Number(waxing ? waxing[selWaxing].cost : 0) +
      Number(menServices ? menServices[selMenServices].cost : 0) +
      Number(nails ? nails[selNails].cost : 0) +
      Number(others ? others[selOther].cost : 0) +
      Number(packages ? packages[selPackages].cost : 0);
    setTotal(totalVal);
    console.log('value updated', totalVal);
  }, [
    selHair,
    selShave,
    selStyling,
    selHairColor,
    selWaxing,
    selMenServices,
    selNails,
    selOther,
    selPackages,
  ]);

  return (
    <>
      {loading && <LoadingIndicator />}
      <ScrollView style={{ backgroundColor: colors.white }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 15,
            marginTop: deviceHeight * 0.02,
          }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            Choose you service
          </Text>
          <Text style={{ fontSize: 16, color: colors.red, marginEnd: '5%' }}>
            {`Total: ${total}`}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: deviceHeight * 0.03,
          }}>
          <Text style={styles.text}>Hair</Text>
          <View style={styles.textInput}>
            {hair.length !== 0 && hair.length !== 0 && (
              <Picker
                selectedValue={hair[selHair]?._id}
                style={{ flex: 1 }}
                onValueChange={(val, index) => {
                  setSelHair(index);
                }}
                itemStyle={styles.picker}
                mode={'dropdown'}>
                {hair.length > 0 &&
                  hair.map((val) => (
                    <Picker.Item
                      label={`${val.name} (Rs. ${val.cost})`}
                      value={val._id}
                    />
                  ))}
              </Picker>
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: deviceHeight * 0.03,
          }}>
          <Text style={styles.text}>Shave</Text>
          <View style={styles.textInput}>
            <Picker
              selectedValue={shave[selShave]?._id}
              style={{ flex: 1 }}
              onValueChange={(val, index) => {
                setSelShave(index);
              }}
              itemStyle={styles.picker}
              mode={'dropdown'}>
              {shave.length > 0 &&
                shave.map((val) => (
                  <Picker.Item
                    label={`${val.name} (Rs. ${val.cost})`}
                    value={val._id}
                  />
                ))}
            </Picker>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: deviceHeight * 0.03,
          }}>
          <Text style={styles.text}>Styling</Text>
          <View style={styles.textInput}>
            <Picker
              selectedValue={styling[selStyling]?._id}
              style={{ flex: 1 }}
              onValueChange={(val, index) => setSelStyling(index)}
              itemStyle={styles.picker}
              mode={'dropdown'}>
              {styling.length > 0 &&
                styling.map((val) => (
                  <Picker.Item
                    label={`${val.name} (Rs. ${val.cost})`}
                    value={val._id}
                  />
                ))}
            </Picker>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: deviceHeight * 0.03,
          }}>
          <Text style={styles.text}>Hair Color</Text>
          <View style={styles.textInput}>
            <Picker
              selectedValue={hairColor[selHairColor]?._id}
              style={{ flex: 1 }}
              onValueChange={(val, index) => setSelHairColor(index)}
              itemStyle={styles.picker}
              mode={'dropdown'}>
              {hairColor.length > 0 &&
                hairColor.map((val) => (
                  <Picker.Item
                    label={`${val.name} (Rs. ${val.cost})`}
                    value={val._id}
                  />
                ))}
            </Picker>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: deviceHeight * 0.03,
          }}>
          <Text style={styles.text}>Waxing</Text>
          <View style={styles.textInput}>
            <Picker
              selectedValue={waxing[selWaxing]?._id}
              style={{ flex: 1 }}
              onValueChange={(val, index) => setSelWaxing(index)}
              itemStyle={styles.picker}
              mode={'dropdown'}>
              {waxing.length > 0 &&
                waxing.map((val) => (
                  <Picker.Item
                    label={`${val.name} (Rs. ${val.cost})`}
                    value={val._id}
                  />
                ))}
            </Picker>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: deviceHeight * 0.03,
          }}>
          <Text style={styles.text}>Men's Services</Text>
          <View style={styles.textInput}>
            <Picker
              selectedValue={menServices[selMenServices]?._id}
              style={{ flex: 1 }}
              onValueChange={(val, index) => setSelMenServices(index)}
              itemStyle={styles.picker}
              mode={'dropdown'}>
              {menServices.length > 0 &&
                menServices.map((val) => (
                  <Picker.Item
                    label={`${val.name} (Rs. ${val.cost})`}
                    value={val._id}
                  />
                ))}
            </Picker>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: deviceHeight * 0.03,
          }}>
          <Text style={styles.text}>Nails</Text>
          <View style={styles.textInput}>
            <Picker
              selectedValue={nails[selNails]?._id}
              style={{ flex: 1 }}
              onValueChange={(val, index) => setSelNails(index)}
              itemStyle={styles.picker}
              mode={'dropdown'}>
              {nails.length > 0 &&
                nails.map((val) => (
                  <Picker.Item
                    label={`${val.name} (Rs. ${val.cost})`}
                    value={val._id}
                  />
                ))}
            </Picker>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: deviceHeight * 0.03,
          }}>
          <Text style={styles.text}>Others</Text>
          <View style={styles.textInput}>
            <Picker
              selectedValue={others[selOther]?._id}
              style={{ flex: 1 }}
              onValueChange={(val, index) => setSelOthers(index)}
              itemStyle={styles.picker}
              mode={'dropdown'}>
              {others.length > 0 &&
                others.map((val) => (
                  <Picker.Item
                    label={`${val.name} (Rs. ${val.cost})`}
                    value={val._id}
                  />
                ))}
            </Picker>
          </View>
        </View>
        <View style={{ marginTop: deviceHeight * 0.03 }}>
          <Separator />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: deviceHeight * 0.03,
          }}>
          <Text style={styles.text}>Packages</Text>
          <View style={styles.textInput}>
            <Picker
              selectedValue={packages[selPackages]?._id}
              style={{ flex: 1 }}
              onValueChange={(val, index) => setSelPackages(index)}
              itemStyle={styles.picker}
              mode={'dropdown'}>
              {packages.length > 0 &&
                packages.map((val) => (
                  <Picker.Item
                    label={`${val.name} (Rs. ${val.cost})`}
                    value={val._id}
                  />
                ))}
            </Picker>
          </View>
        </View>
        <View style={{ marginTop: deviceHeight * 0.03 }}>
          {total !== 0 && (
            <LinearGradient
              colors={[colors.orange, colors.red]}
              style={[styles.button]}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Select Time', {
                    id: props.route.params.id,
                    selected: {
                      hair: hair[selHair]?._id,
                      shave: shave[selShave]?._id,
                      styling: styling[selStyling]?._id,
                      hairColor: hairColor[selHairColor]?._id,
                      waxing: waxing[selWaxing]?._id,
                      menServices: menServices[selMenServices]?._id,
                      nails: nails[selNails]?._id,
                      others: others[selOther]?._id,
                      packages: packages[selPackages]?._id,
                    },
                    total,
                  });
                }}>
                <Text style={styles.textBtn}>Continue</Text>
              </TouchableOpacity>
            </LinearGradient>
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    elevation: 5,
    marginVertical: 10,
    marginHorizontal: '8%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignContent: 'center',
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  image: {
    height: 170,
    width: 170,
    borderRadius: 10,
    borderColor: colors.red,
    borderWidth: 1,
  },
  text: {
    color: colors.black,
    fontSize: 16,
    paddingHorizontal: 20,
  },
  textBtn: {
    color: colors.white,
    fontSize: 18,
    textTransform: 'uppercase',
  },
  textInput: {
    height: 40,
    fontSize: 14,
    borderRadius: 8,
    elevation: 5,
    backgroundColor: colors.light2,
    paddingHorizontal: 20,
    // paddingVertical: 5,
    marginHorizontal: 10,
    // marginTop: 5,
    // marginBottom: 20,
    width: '60%',
  },
  picker: {
    fontSize: 14,
    height: 40,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ServicesSelectionScreen;
