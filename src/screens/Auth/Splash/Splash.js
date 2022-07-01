import React, {useEffect} from 'react';
import {Text, View, Image, ImageBackground, StyleSheet} from 'react-native';
import {firecci} from '../../../assets';
import styles from './styles';
import {connect} from 'react-redux';
import {CommonActions} from '@react-navigation/routers';

const Splash = ({navigation, isLoggedIn, from}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Root'}],
          }),
        );
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'PrivacyPolicy'}],
          }),
        );
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Image
        style={{height: 200, width: 200}}
        resizeMode="contain"
        source={firecci}
      />
    </View>
  );
};
const mapStateToProps = state => {
  const {isLoggedIn} = state.auth;
  return {isLoggedIn};
};
export default connect(mapStateToProps)(Splash);
