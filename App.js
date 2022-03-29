import React, { useEffect } from 'react';
import {
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Drawer from './navigation/Drawer';
import Stack from './navigation/Stack';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
  }, 1000);
  }, [])


  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
    </>
  );
};

export default App;