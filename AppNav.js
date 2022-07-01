import React, {useEffect, useState} from 'react';
import {View, PermissionsAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

//screens

import {connect} from 'react-redux';
import Splash from './src/screens/Auth/Splash';
import {LogBox} from 'react-native';
import PrivacyPolicy from './src/screens/App/PrivacyPolicy';
import Message from './src/screens/App/Message/Message';
LogBox.ignoreAllLogs();
function AppNav({route}) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Splash'}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false, animationEnabled: true}}
        />

        <Stack.Screen
          name="Message"
          component={Message}
          options={{headerShown: false, animationEnabled: true}}
        />

        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{headerShown: false, animationEnabled: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = state => {
  const {isLoggedIn} = state.auth;
  return {
    isLoggedIn,
  };
};
export default connect(mapStateToProps)(AppNav);
