import React, { useEffect } from 'react';
import {
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Drawer from './navigation/Drawer';
import Stack from './navigation/Stack';

const App = () => {
  useEffect(() => {
 
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