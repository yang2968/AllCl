import React, { useState, useEffect } from "react";
import { Alert, View, Text, Platform, BackHandler, Image } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Stack from "./Stack";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {

    let iconName1 = Platform.OS === "ios" ? "ios-" : "md-";
    iconName1 += "log-out-outline";
    let iconName = Platform.OS === "ios" ? "ios-" : "md-";
    iconName += "settings-outline";

  return (
    // Drawer Items
    <DrawerContentScrollView {...props}>

      <View style={{ flex: 1,flexDirection:"column"}}>
        <DrawerItem
          icon={() => {
            return (
              <Icon
                name={"book-outline"}
                size={25}
                color={"#000000"} />
            )
          }}
          label="회원정보"
          labelStyle={{ color: "#000000", fontWeight: 'bold' }}
          onPress={() => {
            props.navigation.toggleDrawer()
            props.navigation.dispatch(
              StackActions.push("Userinfo"))

          }}
        />

        <DrawerItem
          icon={() => {
            return (
              <Icon
                name={iconName}
                size={25}
                color={"#000000"} />
            )
          }}
          label="설정"
          labelStyle={{ color: "#000000", fontWeight: 'bold' }}
          onPress={() => {
            props.navigation.toggleDrawer()
            props.navigation.dispatch(
              StackActions.push("Settings")
            )
          }}
        />


        <DrawerItem
          icon={() => {
            return (
              <Icon
                name={iconName1}
                size={25}
                color={"#000000"} />
            )
          }}
          label="로그아웃"
          labelStyle={{ color: "#000000", fontWeight: 'bold' }}
          onPress={() => {
            props.navigation.toggleDrawer()
            Alert.alert("알림", "로그아웃하시겠습니까?", [
              {
                text: "확인",
                onPress: () => {
                  props.navigation.dispatch(
                    StackActions.replace("Login")
                  )
                }
              }, {
                text: "취소"
              }
            ])
          }}
        />

      </View>

    </DrawerContentScrollView>
  );
}

export default ({ route }) => {



  useEffect(() => {
    const backAction = () => {
      Alert.alert("알림", "앱을 종료하시겠습니까?", [
        {
          text: "취소",
          onPress: () => null,
        },
        { text: "확인", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Drawer.Navigator
      hideStatusBar={true}
      screenOptions={{ swipeEnabled: false }}
      drawerStyle={{ backgroundColor: "#ffffff", borderTopRightRadius: 20, borderBottomRightRadius: 20 }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      {/* drawerLabel: () => null */}
      <Drawer.Screen name="drawerScreen" component={Stack} />

    </Drawer.Navigator>
  );
};