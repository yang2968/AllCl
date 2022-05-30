import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  Platform,
  Alert
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
  const [nickname, setNickname] = useState("");
  const [routeName, setRouteName] = useState("");
  const [postIndex, setPostIndex] = useState(0);
  const [imageFiles, setImageFiles] = useState([]);


  const globalVariables = {
    header: header,
    body: body,
    nickname: nickname,
    routeName: routeName,
    postIndex: postIndex,
    imageFiles: imageFiles,
    setHeader,
    setBody,
    setNickname,
    setRouteName,
    setPostIndex,
    setImageFiles
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