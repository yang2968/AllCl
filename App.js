import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  Platform
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Drawer from './navigation/Drawer';
import Stack from './navigation/Stack';
import SplashScreen from 'react-native-splash-screen';
import AppContext from './AppContext';

const App = () => {

  const barStyle = Platform.OS === "ios" ? "dark-content" : "default";

  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");

  const requestHeader = (header) => {
    setHeader(header);
  }
  const requestBody = (body) => {
    setBody(body);
  }

  const globalVariables = {
    header: header,
    body: body,
    requestHeader,
    requestBody
  }

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, [])


  return (
    <>
      <AppContext.Provider value={globalVariables}>
        <StatusBar barStyle={barStyle} />
        <NavigationContainer>
          <Stack />
        </NavigationContainer>
      </AppContext.Provider>
    </>
  );
};

export default App;