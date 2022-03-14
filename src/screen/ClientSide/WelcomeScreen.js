import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

import colors from '../../styles/colors';
import { connect } from 'react-redux';

function WelcomeScreen({ navigation: { navigate }, token }) {
  const [isLoading, setLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (token) {
        navigate('MainApp');
      } else {
        navigate('Login');
      }
    }, 3000);

    return () => {};
  }, [token]);

  return (
    <View style={styles.container}>
      <ImageBackground
        blurRadius={1}
        style={styles.background}
        source={require('../../assets/images/image_10.jpg')}
        onLoadEnd={(isLoading) => setLoading(!isLoading)}>
        <Animatable.View animation="pulse" style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../assets/icons/barbery-W.png')}
          />
        </Animatable.View>
      </ImageBackground>
      {/* } */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: colors.white,
  },
  activity: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonsContainer: {
    padding: 20,
    width: '100%',
  },
  button: {
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    elevation: 5,
    marginVertical: 15,
    marginHorizontal: 10,
  },
  textBtn: {
    color: colors.white,
    fontSize: 18,
    textTransform: 'uppercase',
  },
  logo: {
    width: 300,
    height: 300,
  },
  logoContainer: {
    position: 'absolute',
    top: -25,
    alignItems: 'center',
  },
});

const mapStateToProps = ({ user: { token } }) => ({ token });

export default connect(mapStateToProps)(WelcomeScreen);
