import React, { useEffect } from 'react';
import {
  StatusBar,
  Platform
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Drawer from './navigation/Drawer';
import Stack from './navigation/Stack';
import SplashScreen from 'react-native-splash-screen';

const App = () => {

  const barStyle = Platform.OS === "ios" ? "dark-content" : "default";

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
  }, 1000);
  }, [])


  return (
    <>
      <StatusBar barStyle={barStyle} />
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
    </>
  );
};

export default App;