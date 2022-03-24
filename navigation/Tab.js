import React from "react";
import {
    Platform,
     } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import Page1 from '../Views/TabFiles/page1';
import Page2 from '../Views/TabFiles/page2';
import Page3 from '../Views/TabFiles/page3';
import Page4 from '../Views/TabFiles/page4';

const Tab = createBottomTabNavigator();

export default ({ route }) => {
  // 바텀 네비게이션
  return (
    <Tab.Navigator
      initialRouteName={"페이지1"}
      resetOnBlur={true}
      detachInactiveScreens={true}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "black", //탭의 text color변경 
        tabBarInactiveTintColor: "white",
        tabBarLabelStyle: {
            fontWeight: 'bold',// text 의 굵기 지정
            fontSize: 10 //text 사이즈 
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
          } else if (route.name == "페이지4") {
            iconName = "user"
          }

          if(iconName =="list-alt"){
            return(
              <Icon
              name={iconName} 
              size={20}
              color={focused ? "black" : "grey"} />
            )
          }
          else{
            return (
              <Icon
                name={iconName} //이게 아이콘 마다 이름을 불오는 거좌나? 그럼 저 listalit만 따로 뺴서 크기 지정 할수 있지 않을까?
                size={25}
                color={focused ? "black" : "grey"} />
            )

          }    
   
        },
      })}

  
    >
      
      <Tab.Screen name="홈" component={Page1} options={{ headerShown: false }} />
      <Tab.Screen name="지도" component={Page2} options={{ headerShown: false }} />
      <Tab.Screen name="게시판" component={Page3} options={{ headerShown: false }} />
      <Tab.Screen name="페이지4" component={Page4} options={{ headerShown: false }} />
    
    </Tab.Navigator>

  );
};