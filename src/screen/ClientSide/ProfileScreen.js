import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../../styles/colors';
import profileImg from '../../utils/profileImg';
import LoadingIndicator from '../../components/LoadingIndicator';

import { connect } from 'react-redux';
import { logout } from '../../redux/actions/user';
import { getUser, updateUser } from '../../redux/actions/mainRecords';

function ProfileScreen({
  navigation: { goBack, navigate },
  user,
  getUser,
  updateUser,
  loading,
  logout,
}) {
  useEffect(() => {
    if (!user) {
      getUser();
    }
    return () => {};
  }, []);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhone(user.phoneNo);
      setImage(
        user?.image
          ? `data:${user?.image?.type};base64,${user?.image?.data}`
          : profileImg.img,
      );
    }
  }, [user]);

  const [apiMage, setApiMage] = useState({});
  const [image, setImage] = useState(
    user?.image
      ? `data:${user?.image?.type};base64,${user?.image?.data}`
      : profileImg.img,
  );
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phoneNo);

  const [isChange, setChange] = useState(false);

  const update = () => {
    const updateCurrentUser = {
      image: apiMage,
      firstName,
      lastName,
      email,
      phoneNo: phone,
    };
    updateUser(updateCurrentUser);
  };

  const selectFile = () => {
    var options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (res) => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else {
        setApiMage({ type: res.type, data: res.data });
        const uri = `data:${res.type};base64,${res.data}`;
        setImage(uri);
        setChange(true);
      }
    });
  };

  return (
    <>
      {loading && <LoadingIndicator />}
      <ScrollView style={styles.container}>
        <View style={{ width: '100%', height: '100%' }}>
          <TouchableOpacity style={styles.imageContainer} onPress={selectFile}>
            <Image style={styles.profileImage} source={{ uri: image }} />
          </TouchableOpacity>
          <View style={styles.profileData}>
            <View style={styles.row}>
              <View style={styles.rowInput}>
                <Text style={styles.text}>First Name</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={'Ahmed'}
                  maxLength={50}
                  onChangeText={(text) => {
                    setFirstName(text);
                    setChange(true);
                  }}
                  value={firstName}
                />
              </View>
              <View style={styles.rowInput}>
                <Text style={styles.text}>Last Name</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={'Raza'}
                  maxLength={50}
                  onChangeText={(text) => {
                    setLastName(text);
                    setChange(true);
                  }}
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
              onChangeText={(text) => {
                setEmail(text);
                setChange(true);
              }}
              value={email}
            />
            <Text style={styles.text}>Phone no.</Text>
            <TextInput
              style={styles.textInput}
              placeholder={'+92'}
              keyboardType={'phone-pad'}
              maxLength={13}
              minLength={11}
              onChangeText={(text) => {
                setPhone(text);
                setChange(true);
              }}
              value={phone}
            />

            {isChange && (
              <LinearGradient
                colors={[colors.orange, colors.red]}
                style={styles.button}>
                <TouchableOpacity
                  style={{ width: '100%', alignItems: 'center' }}
                  onPress={update}>
                  <Text style={styles.textBtn}>Save</Text>
                </TouchableOpacity>
              </LinearGradient>
            )}

            <LinearGradient
              colors={[colors.orange, colors.red]}
              style={styles.button}>
              <TouchableOpacity
                style={{ width: '100%', alignItems: 'center' }}
                onPress={() => {
                  logout();
                  AsyncStorage.removeItem('@Token');
                  navigate('Welcome');
                }}>
                <Text style={styles.textBtn}>Logout</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
    </>
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
  button: {
    backgroundColor: colors.red,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    elevation: 5,
    marginVertical: 20,
    marginHorizontal: 90,
  },
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: colors.white,
    // paddingHorizontal: 15,
  },
  imageContainer: {
    alignItems: 'center',
    marginHorizontal: 100,
  },
  profileImage: {
    height: 160,
    width: 160,
    borderRadius: 80,
    borderColor: colors.red,
    borderWidth: 3,
    marginVertical: 40,
  },
  CoverImage: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: 250,
    width: '100%',
    borderBottomRightRadius: 50,
  },
  profileData: {
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  rowInput: {
    width: 180,
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
    marginBottom: 15,
  },
  timeRow: {
    flexDirection: 'row',
    height: 40,
    fontSize: 14,
    borderRadius: 25,
    elevation: 5,
    backgroundColor: colors.light,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 15,
    justifyContent: 'space-between',
  },
});

const mapStateToProps = ({ mainRecords: { user, loading } }) => ({
  user,
  loading,
});

const mapActionToProps = { getUser, updateUser, logout };

export default connect(mapStateToProps, mapActionToProps)(ProfileScreen);
