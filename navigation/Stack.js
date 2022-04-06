import React, { useEffect, useState } from "react";
import { Alert, TouchableOpacity, Text, StyleSheet, View, BackHandler } from "react-native";
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Icon2 from 'react-native-vector-icons/dist/FontAwesome';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Color from "../styles/Color";
import Tab from './Tab';
import RecommendClimbingWall from "../Views/StackFiles/recommendClimbingWall";
import Login from "../Views/StackFiles/login";
import Posting from "../Views/StackFiles/posting";
import WatchPost from "../Views/StackFiles/watchPost";

const Stack = createNativeStackNavigator();

export default () => {

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
        <Stack.Navigator
            initialRouteName={"Login"}
            screenOptions={({ navigation, route }) => ({
                // 뒤로가기 버튼에 전 스택스크린이름표시여부
               
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
                    let iconName = Platform.OS === "ios" ? "ios-" : "md-";
                    if (route.name == "게시글 작성") {
                        iconName += "arrow-back";
                        return (
                            // 뒤로가기 버튼
                            <TouchableOpacity
                                style={{ padding: 5}}
                                onPress={() => navigation.goBack()}>
                                <Icon
                                    name={iconName}
                                    size={25}
                                    color={"black"} />
                            </TouchableOpacity>
                        )
                    }

                    else {
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
                                onPress={() => navigation.goBack()}>
                                <Text style={{ color: "white", fontWeight: "bold" }}>완료</Text>
                            </TouchableOpacity>
                        )
                    } else if(route.name == "RCW"){
                        
                    } else {
                        iconName = "ellipsis-horizontal-sharp";
                        return(
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
            <Stack.Screen name="RCW" component={RecommendClimbingWall} options={{ headerShown: false }} />
            <Stack.Screen name="게시글 작성" component={Posting} options={{ headerShown: true }} />
            <Stack.Screen name="자유 게시판" component={WatchPost} options={{ headerShown: true }} />

        </Stack.Navigator>
    )
}