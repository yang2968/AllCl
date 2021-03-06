import React, { useEffect, useState, useContext } from "react";
import { Alert, TouchableOpacity, Text, StyleSheet, View, BackHandler, ActionSheetIOS } from "react-native";
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRoute, StackActions, TabActions } from "@react-navigation/native";
import SimplePopupMenu from 'react-native-simple-popup-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Color from "../styles/Color";
import AppContext from "../AppContext";
import API from "../API/API";
import Tab from './Tab';
import ClimbingWallInfo from "../Views/StackFiles/ClimbingWallInfo";
import RouteInfo from "../Views/StackFiles/RouteInfo";
import Login from "../Views/StackFiles/login";
import Posting from "../Views/StackFiles/posting";
import WatchNotice from "../Views/StackFiles/watchNotice";
import WatchPost from "../Views/StackFiles/watchPost";
import BoardSearch from "../Views/StackFiles/boardSearch";
import MyWrittenPosting from "../Views/StackFiles/myWrittenPosting";
import MyWriitenComent from "../Views/StackFiles/myWrittenComent";
import ClearRoute from "../Views/StackFiles/clearRoute";
import UserClimbingList from "../Views/StackFiles/userClimbingList";

const Stack = createNativeStackNavigator();

export default () => {

    const globalVariables = useContext(AppContext);

    const items = [
        { id: '수정', label: '수정' },
        { id: '삭제', label: '삭제' },
    ];
    const items2 = [
        { id: '신고하기', label: '신고하기' },
    ];
    const items3 = [
        { id: '게시글 수정', label: '게시글 수정' },
        { id: '게시글 삭제', label: '게시글 삭제' },
    ];


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
                    backgroundColor: route.name == "RouteInfo" ? "black" : "white",
                },
                headerBackTitle: null,
                headerShadowVisible: false,
                headerTitle: (name) => {
                    if (route.name == "RouteInfo") {
                        name = globalVariables.routeName
                    } else {
                        name = route.name
                    }
                    return (<Text style={{ color: route.name == "RouteInfo" ? "white" : "black", fontWeight: "bold", fontSize: 20 }}>{name}</Text>);
                },
                headerTitleAlign: "center",
                headerBackVisible: false,
                headerLeft: () => {
                    let iconName = Platform.OS === "ios" ? "ios-" : "md-";
                    iconName += "arrow-back";
                    // 뒤로가기 버튼
                    return(
                        <TouchableOpacity
                    style={{}}
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    <Icon
                        name={iconName}
                        size={25}
                        color={"black"} />
                </TouchableOpacity>
                    )
                    // if (route.name == "게시글 작성") {
                    //     
                    //     return (
                            
                    //     )

                    // } else if (route.name == "RouteInfo") {
                    //     iconName += "arrow-back";
                    //     return (
                    //         // 뒤로가기 버튼
                    //         <TouchableOpacity
                    //             style={{ padding: 5 }}
                    //             onPress={() => navigation.goBack()}>
                    //             <Icon
                    //                 name={iconName}
                    //                 size={25}
                    //                 color={"white"} />
                    //         </TouchableOpacity>
                    //     )
                    // } else {
                    //     iconName += "arrow-back";
                    //     return (
                    //         // 뒤로가기 버튼
                    //         <TouchableOpacity
                    //             style={{}}
                    //             onPress={() => navigation.goBack()}>
                    //             <Icon
                    //                 name={iconName}
                    //                 size={25}
                    //                 color={"black"} />
                    //         </TouchableOpacity>
                    //     )
                    // }
                },
                headerRight: () => {
                    let iconName = Platform.OS === "ios" ? "ios-" : "md-";
                    if (route.name == "게시글 작성") {
                        return (
                            <TouchableOpacity
                                style={{ backgroundColor: Color.loginBackground, paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 15 }}
                                onPress={async () => {
                                    if (globalVariables.routeName == "게시판") { // 게시글울 작성하는 경우
                                        var postingData;
                                        if(globalVariables.imageFiles.length != 0) {
                                            postingData = await API.posting("밥셔틀웅이", globalVariables.header, globalVariables.body, 1);
                                        } else {
                                            postingData = await API.posting("밥셔틀웅이", globalVariables.header, globalVariables.body, 0);
                                        }
                                        switch (postingData[0]) {
                                            case 200: case 201:
                                                if(globalVariables.imageFiles.length != 0) {
                                                    const uploadImage = await API.uploadImage(globalVariables.imageFiles);
                                                    console.log("이미지 업로드", uploadImage);
                                                }
                                                //globalVariables.setImageFiles([]);
                                                navigation.goBack();
                                                globalVariables.setRouteName("");
                                                break;
                                            default:
                                                Alert.alert("알림", "에러가 발생하였습니다.");
                                                break;
                                        }
                                    } else { // 게시글을 수정하는 경우
                                        const modifyPostData = await API.modifyPost(globalVariables.postIndex, globalVariables.header, globalVariables.body);
                                        switch (modifyPostData[0]) {
                                            case 200: case 201:
                                                navigation.navigate("게시판");
                                                globalVariables.setRouteName("");
                                                break;
                                            default:
                                                Alert.alert("알림", "에러가 발생하였습니다.");
                                                break;
                                        }
                                    }
                                }}>
                                <Text style={{ color: "white", fontWeight: "bold" }}>완료</Text>
                            </TouchableOpacity>
                        )
                    } else if (route.name == "자유 게시판") {
                        iconName = "ellipsis-horizontal-sharp";
                        if (globalVariables.nickname == "밥셔틀웅이") {
                            return (
                                (
                                    Platform.OS === "android" ?
                                        <SimplePopupMenu
                                            items={items3}
                                            style={{ padding: 5 }}
                                            onSelect={async (item) => {

                                                if (item.label == "게시글 수정") {
                                                    navigation.navigate("게시글 작성");
                                                } else if (item.label == "게시글 삭제") {
                                                    Alert.alert("알림", "게시물을 삭제하시겠습니까?", [
                                                        {
                                                            text: "확인",
                                                            onPress: async () => {
                                                                const deletePostData = await API.deletePost(globalVariables.postIndex);
                                                                switch (deletePostData[0]) {
                                                                    case 200: case 201:
                                                                        navigation.goBack();
                                                                        break;
                                                                    default:
                                                                        Alert.alert("알림", "에러가 발생하였습니다.");
                                                                        break;
                                                                }
                                                            }
                                                        },
                                                        {
                                                            text: "취소",
                                                            style: 'cancel',
                                                        }
                                                    ])
                                                }
                                            }}>
                                            <Icon
                                                name={"ellipsis-horizontal-sharp"}
                                                size={20}
                                                color={"black"} />
                                        </SimplePopupMenu>
                                        :
                                        <TouchableOpacity
                                            style={{ padding: 5 }}
                                            onPress={() => {
                                                ActionSheetIOS.showActionSheetWithOptions(
                                                    {
                                                        title: "게시판 메뉴",
                                                        options: ["취소", "게시글 수정", "게시글 삭제"],
                                                        cancelButtonIndex: 0,
                                                        userInterfaceStyle: 'dark'
                                                    },
                                                    async (buttonIndex) => {
                                                        if (buttonIndex === 0) { // 취소
                                                        } else if (buttonIndex === 1) { // 수정   수정을 누르면 댓글입력칸이 수정할 댓글을 입력하세요로 변경 텍스트 입력 후 댓글 수정
                                                            navigation.navigate("게시글 작성");
                                                        } else if (buttonIndex === 2) {  // 삭제
                                                            Alert.alert("알림", "게시물을 삭제하시겠습니까?", [
                                                                {
                                                                    text: "확인",
                                                                    onPress: async () => {
                                                                        const deletePostData = await API.deletePost(globalVariables.postIndex);
                                                                        switch (deletePostData[0]) {
                                                                            case 200: case 201:
                                                                                navigation.goBack();
                                                                                break;
                                                                            default:
                                                                                Alert.alert("알림", "에러가 발생하였습니다.");
                                                                                break;
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    text: "취소",
                                                                    style: 'cancel',
                                                                }
                                                            ])
                                                        }
                                                    }
                                                )
                                            }}>
                                            <Icon
                                                name={iconName}
                                                size={20}
                                                color={"black"} />
                                        </TouchableOpacity>
                                )
                            )
                        } else {
                            return (
                                (
                                    Platform.OS === "android" ?
                                        <SimplePopupMenu
                                            items={items2}
                                            style={{ padding: 5 }}
                                            onSelect={async (item3) => {
                                                if (item3.label == "신고하기") {
                                                    console.log("신고하기");
                                                }
                                            }}>
                                            <Icon
                                                name={"ellipsis-horizontal-sharp"}
                                                size={20}
                                                color={"black"} />
                                        </SimplePopupMenu>
                                        :
                                        <TouchableOpacity
                                            style={{ padding: 5 }}
                                            onPress={() => {

                                                ActionSheetIOS.showActionSheetWithOptions(
                                                    {
                                                        title: "게시판 메뉴",
                                                        options: ["취소", "신고하기"],
                                                        cancelButtonIndex: 0,
                                                        userInterfaceStyle: 'dark'
                                                    },
                                                    async (buttonIndex) => {
                                                        if (buttonIndex === 0) { // 취소
                                                        } else if (buttonIndex === 1) { // 신고 
                                                            //navigation.navigate("게시글 작성");
                                                        }
                                                    }
                                                )
                                            }}>
                                            <Icon
                                                name={iconName}
                                                size={20}
                                                color={"black"} />
                                        </TouchableOpacity>
                                )

                            )
                        }


                    }
                }
            })}>

            <Stack.Screen name="Login" component={Login} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Tab" component={Tab} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="ClimbingWallInfo" component={ClimbingWallInfo} options={{ headerShown: false }} />
            <Stack.Screen name="RouteInfo" component={RouteInfo} options={{ headerShown: true }} />
            <Stack.Screen name="게시글 작성" component={Posting} options={{ headerShown: true }} />
            <Stack.Screen name="자유 게시판" component={WatchPost} options={{ headerShown: true }} />
            <Stack.Screen name="공지" component={WatchNotice} options={{ headerShown: true }} />
            <Stack.Screen name="BoardSearch" component={BoardSearch} options={{ headerShown: false }} />
            <Stack.Screen name="내가 쓴 글" component={MyWrittenPosting} options={{ headerShown: true }} />
            <Stack.Screen name="내가 쓴 댓글" component={MyWriitenComent} options={{ headerShown: true }} />
            <Stack.Screen name="완등 중인 암벽장 목록" component={UserClimbingList} options={{ headerShown: true }} />
            <Stack.Screen name="완등한 루트 목록" component={ClearRoute} options={{ headerShown: true }} />

        </Stack.Navigator>
    )
}