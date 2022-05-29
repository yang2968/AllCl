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
  // useEffect(() => {
  //   fcmService.registerAppWithFCM();
  //   fcmService.register(onRegister, onNotification, onOpenNotification);
  //   //localNotificationService.configure(onOpenNotification);

  //   function onRegister(token) {
  //     console.log('[App] onRegister : token :', token);
  //   }

  //   function onNotification(notify) {
  //     console.log('[App] onNotification : notify :', notify);
  //     const options = {
  //       soundName: 'default',
  //       playSound: true,
  //     };
  //     // localNotificationService.showNotification(
  //     //   0,
  //     //   notify.title,
  //     //   notify.body,
  //     //   notify,
  //     //   options,
  //     // );
  //   }

  //   function onOpenNotification(notify) {
  //     console.log('[App] onOpenNotification : notify :', notify);
  //     //alert('Open Notification : notify.body :' + notify.body);
  //   }
  //   // return () => {
  //   //   console.log('[App] unRegister');
  //   //   fcmService.unRegister();
  //   //   localNotificationService.unregister();
  //   // };
  // }, []);


  // useEffect(() => {
  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open

  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //     // navigation.navigate(remoteMessage.data.type);
  //   });

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //         // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
  //       }
  //     });
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);

  // useEffect(() =>{
  //   var notif = new NotifService(onRegister.bind(this), onNotif.bind(this));
    
  // }, [])

//  function onRegister(token) {
//     this.setState({registerToken: token.token, fcmRegistered: true});
//   }

//   function onNotif(notif) {
//     Alert.alert(notif.title, notif.message);
//   }

//   function handlePerm(perms) {
//     Alert.alert('Permissions', JSON.stringify(perms));
//   }


  const barStyle = Platform.OS === "ios" ? "dark-content" : "default";

  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");
  const [nickname, setNickname] = useState("");
  const [routeName, setRouteName] = useState("");
  const [postIndex, setPostIndex] = useState(0);


  const globalVariables = {
    header: header,
    body: body,
    nickname: nickname,
    routeName: routeName,
    postIndex: postIndex,
    setHeader,
    setBody,
    setNickname,
    setRouteName,
    setPostIndex
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