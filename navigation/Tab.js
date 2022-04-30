import React, { useEffect, useState, useCallback } from "react";
import {
  Platform,
  BackHandler,
  Alert,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRoute, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Color from '../styles/Color';
import Page1 from '../Views/TabFiles/home';
import Page2 from '../Views/TabFiles/map';
import Page3 from '../Views/TabFiles/board';
import Page4 from '../Views/TabFiles/myPage';

const Tab = createBottomTabNavigator();

export default ({ route }) => {
  route = useRoute();

  useFocusEffect(
    useCallback(() => {
      // 원하는 페이지의 안드로이드 백버튼 비활성화
      const onBackPress = () => {
        if (route.name === 'Tab') {
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [route]),
  );
  // 바텀 네비게이션
  return (
    <Tab.Navigator
      initialRouteName={"페이지1"}
      resetOnBlur={true}
      detachInactiveScreens={true}
      screenOptions={({ route }) => ({
        unmountOnBlur: true,
        tabBarActiveTintColor: Color.loginButtonBackground, //탭의 text color변경 
        tabBarInactiveTintColor: "white",
        tabBarActiveBackgroundColor: Color.loginBackground,
        tabBarItemStyle: {
          borderRadius: 30,
          marginHorizontal: 12,
        },
        tabBarLabelStyle: {
          fontWeight: 'bold',// text 의 굵기 지정
          fontSize: 11 //text 사이즈 
        },
        tabBarStyle: {
          backgroundColor: "white",
          height: 60,
          padding: 5,
          paddingBottom: 5,

        },
        headerTitleAlign: "left",
        // 탭바 아이콘 설정
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name == "홈") {
            iconName = "home"
          } else if (route.name == "지도") {
            iconName = "mountain"
          } else if (route.name == "게시판") {
            iconName = "list-alt"
          } else if (route.name == "Me") {
            iconName = "user"
          }

          if (iconName == "list-alt") {
            return (
              <Icon
                name={iconName}
                size={20}
                color={focused ? Color.loginButtonBackground : "grey"} />
            )
          }
          else {
            return (
              <Icon
                name={iconName} //이게 아이콘 마다 이름을 불오는 거좌나? 그럼 저 listalit만 따로 뺴서 크기 지정 할수 있지 않을까?
                size={25}
                color={focused ? Color.loginButtonBackground : "grey"} />
            )

          }

        },
      })}


    >

      <Tab.Screen name="홈" component={Page1} options={{ headerShown: false }} />
      <Tab.Screen name="지도" component={Page2} options={{ headerShown: false }} />
      <Tab.Screen name="게시판" component={Page3} options={{ headerShown: false,  }} />
      <Tab.Screen name="Me" component={Page4} options={{ headerShown: false }} />

    </Tab.Navigator>

  );
};