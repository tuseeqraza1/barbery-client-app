import React, { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

import LoadingIndicator from '../../components/LoadingIndicator';
import colors from '../../styles/colors';
import { connect } from 'react-redux';
import { signup } from '../../redux/actions/user';

function RegisterScreen({ navigation: { navigate }, token, loading, signup }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');

  useEffect(() => {
    if (token) {
      navigate('MainApp');
    }
    return () => {};
  }, [token]);

  return (
    <View style={styles.container}>
      {loading && <LoadingIndicator />}
      <LinearGradient
        colors={[colors.orange, colors.red]}
        style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../../assets/icons/barbery-W.png')}
        />
      </LinearGradient>
      <Animatable.View animation="slideInUp" style={styles.footer}>
        <View style={styles.row}>
          <View style={styles.rowInput}>
            <Text style={styles.text}>First Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder={'Ahmed'}
              maxLength={50}
              onChangeText={(text) => setFirstName(text)}
              value={firstName}
            />
          </View>
          <View style={styles.rowInput}>
            <Text style={styles.text}>Last Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder={'Raza'}
              maxLength={50}
              onChangeText={(text) => setLastName(text)}
              value={lastName}
            />
          </View>
        </View>
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder={'e.g. abc@gmail.com'}
          maxLength={50}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <Text style={styles.text}>Phone no.</Text>
        <TextInput
          style={styles.textInput}
          placeholder={'+92'}
          keyboardType={'phone-pad'}
          maxLength={13}
          minLength={11}
          onChangeText={(text) => setPhone(text)}
          value={phone}
        />
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.textInput}
          placeholder={'*****'}
          maxLength={20}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          value={password}
        />
        <Text style={styles.text}>Confirm-Password</Text>
        <TextInput
          style={styles.textInput}
          placeholder={'*****'}
          maxLength={20}
          onChangeText={(text) => setConPassword(text)}
          secureTextEntry={true}
          value={conPassword}
        />
        <LinearGradient
          colors={[colors.orange, colors.red]}
          style={[styles.button]}>
          <TouchableOpacity
            style={{
              width: '100%',
              alignItems: 'center',
            }}
            onPress={() =>
              signup({ firstName, lastName, email, phoneNo: phone, password })
            }>
            <Text style={styles.textBtn}>Register</Text>
          </TouchableOpacity>
        </LinearGradient>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.red,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    elevation: 5,
    marginVertical: 20,
    marginHorizontal: 40,
  },
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: colors.red,
  },
  row: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',

    // marginVertical: 40,
    // marginHorizontal: 20,
  },
  rowInput: {
    width: 170,
  },
  text: {
    color: colors.black,
    fontSize: 14,
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
    borderRadius: 25,
    elevation: 5,
    backgroundColor: colors.light,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 20,
  },
  logo: {
    // tintColor: colors.red,
    width: 300,
    height: 300,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  footer: {
    flex: 4,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});

const mapStateToProps = ({ user: { token, loading } }) => ({ token, loading });

const mapActionToProps = { signup };

export default connect(mapStateToProps, mapActionToProps)(RegisterScreen);
