import React, { useEffect, useState, useContext } from "react";
import { Alert, TouchableOpacity, Text, StyleSheet, View, BackHandler } from "react-native";
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackActions, TabActions } from "@react-navigation/native";
import Color from "../styles/Color";
import AppContext from "../AppContext";
import API from "../API/API";
import Tab from './Tab';
import ClimbingWallInfo from "../Views/StackFiles/ClimbingWallInfo";
import Login from "../Views/StackFiles/login";
import Posting from "../Views/StackFiles/posting";
import WatchPost from "../Views/StackFiles/watchPost";
import BoardSearch from "../Views/StackFiles/boardSearch";
import MyWrittenPosting from "../Views/StackFiles/myWrittenPosting";
import MyWriitenComent from "../Views/StackFiles/myWriitenComent";



const Stack = createNativeStackNavigator();

export default () => {

    const globalVariables = useContext(AppContext);



    useEffect(() => {


        // const backAction = () => {
        //     Alert.alert("알림", "앱을 종료하시겠습니까?", [
        //         {
        //             text: "취소",
        //             onPress: () => null,
        //         },
        //         { text: "확인", onPress: () => BackHandler.exitApp() }
        //     ]);
        //     return true;
        // };

        // const backHandler = BackHandler.addEventListener(
        //     "hardwareBackPress",
        //     backAction
        // );

        // return () => backHandler.remove();
    }, []);

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

    return (
        <Stack.Navigator
            initialRouteName={"Login"}
            resetOnBlur={true}
            screenOptions={({ navigation, route }) => ({
                // 뒤로가기 버튼에 전 스택스크린이름표시여부
                unmountOnBlur: true,
                headerBackTitleVisible: false,
                headerStyle: {
                    backgroundColor: "white",
                },
                headerShadowVisible: false,
                headerTitleStyle: {
                    color: "black",
                    fontWeight: "bold",
                    fontSize: 20
                },
                headerTitleAlign: "center",
                headerLeft: () => {
                    if (route.name == "Tab") {


                        // const backHandler = BackHandler.addEventListener(
                        //     "hardwareBackPress",
                        //     backAction
                        // );

                        // return () => backHandler.remove();

                    }


                    let iconName = Platform.OS === "ios" ? "ios-" : "md-";
                    if (route.name == "게시글 작성") {
                        iconName += "arrow-back";
                        return (
                            // 뒤로가기 버튼
                            <TouchableOpacity
                                style={{ padding: 5 }}
                                onPress={() => navigation.goBack()}>
                                <Icon
                                    name={iconName}
                                    size={25}
                                    color={"black"} />
                            </TouchableOpacity>
                        )
                    } else {
                        iconName += "arrow-back";
                        return (
                            // 뒤로가기 버튼
                            <TouchableOpacity
                                style={{}}
                                onPress={() => navigation.goBack()}>
                                <Icon
                                    name={iconName}
                                    size={25}
                                    color={"black"} />
                            </TouchableOpacity>
                        )
                    }
                },
                headerRight: () => {
                    let iconName = Platform.OS === "ios" ? "ios-" : "md-";
                    if (route.name == "게시글 작성") {
                        return (
                            <TouchableOpacity
                                style={{ backgroundColor: Color.loginBackground, paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 15 }}
                                onPress={async() => {
                                    // 게시글 작성
                                   var test = Math.random();
                                   const postingData = await API.posting("밥셔틀웅이", globalVariables.header, globalVariables.body, String(test));
                                   console.log(postingData[0]);
                                   switch(postingData[0]) {
                                       case 200: case 201:
                                           navigation.goBack()
                                           break;
                                           default:
                                               Alert.alert("알림", "에러가 발생하였습니다.");
                                               break;
                                   }
                                  
                                    
                                }}>
                                <Text style={{ color: "white", fontWeight: "bold" }}>완료</Text>
                            </TouchableOpacity>
                        )
                    } else if (route.name == "ClimbingWallInfo") {

                    } else if (route.name == "자유 게시판") {
                        iconName = "ellipsis-horizontal-sharp";
                        return (
                            <TouchableOpacity
                                style={{ padding: 5 }}
                                onPress={() => {

                                }}>
                                <Icon
                                    name={iconName}
                                    size={20}
                                    color={"black"} />
                            </TouchableOpacity>
                        )
                    }
                }
            })}>

            <Stack.Screen name="Login" component={Login} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Tab" component={Tab} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="ClimbingWallInfo" component={ClimbingWallInfo} options={{ headerShown: false }} />
            <Stack.Screen name="게시글 작성" component={Posting} options={{ headerShown: true }} />
            <Stack.Screen name="자유 게시판" component={WatchPost} options={{ headerShown: true }} />
            <Stack.Screen name="BoardSearch" component={BoardSearch} options={{ headerShown: false }} />
            <Stack.Screen name="내가 쓴 글" component={MyWrittenPosting} options={{ headerShown: true }} />
            <Stack.Screen name="내가 쓴 댓글" component={MyWriitenComent} options={{ headerShown: true }} />

        </Stack.Navigator>
    )
}