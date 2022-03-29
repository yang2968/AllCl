import React, { useEffect, useState } from "react";
import { Alert, TouchableOpacity, Text, StyleSheet, View, BackHandler } from "react-native";
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tab from './Tab';
import RecommendClimbingWall from "../Views/StackFiles/recommendClimbingWall";

const Stack = createNativeStackNavigator();
// 헤더 이름
// const LogoTitle = (name) => {
//     var title = "ASF"
//     switch (name.children) {
//         case 'Singup':
//             title = "회원가입"
//             break;
//         case 'Find':
//             title = "아이디 찾기"
//             break;
//         case 'Repassword':
//             title = "비밀번호 초기화"
//             break;
//         case 'Userinfo':
//             title = "회원정보"
//             break;
//         case 'ReUserinfo':
//             title = "회원정보 수정"
//             break;
//         case 'Remove':
//             title = "회원탈퇴"
//             break;
//         case 'Settings':
//             title = "설정"
//             break;

//         default:
//             title = "ASF"
//             break;
//     }
//     // 헤더 이름 변경하기 
//     return (
//         <View>
//             <Text style={styles.headerTitle}>{title}</Text>
//         </View>
//     );
// }

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
            initialRouteName={"Tab"}
            screenOptions={({ navigation, route }) => ({
                // headerTitle: props => <LogoTitle {...props} />,
                // 뒤로가기 버튼에 전 스택스크린이름표시여부
                headerBackTitleVisible: false,
                headerStyle: {
                    backgroundColor: "#ffffff"
                },
                headerTitleAlign: "center",
                headerLeft: () => {
                    let iconName = Platform.OS === "ios" ? "ios-" : "md-";

                    if (route.name == "Tab") {
                        iconName = "code";
                        return (
                            // 메뉴 버튼
                            <TouchableOpacity
                                style={{ marginLeft: 10 }}
                                onPress={() => navigation.toggleDrawer()}>
                                <Icon
                                    name={iconName}
                                    size={30}
                                    color={"#000000"} />
                            </TouchableOpacity>
                        )
                    }

                    else {
                        iconName += "chevron-back";
                        return (
                            // 뒤로가기 버튼
                            <TouchableOpacity
                                style={{ marginLeft: 10 }}
                                onPress={() => navigation.goBack()}>
                                <Icon
                                    name={iconName}
                                    size={30}
                                    color={"#ffffff"} />
                            </TouchableOpacity>
                        )
                    }
                }
            })}>

            <Stack.Screen name="Tab" component={Tab} options={{ headerShown: false }} />
            <Stack.Screen name="RCW" component={RecommendClimbingWall} options={{ headerShown: false }} />
            
        </Stack.Navigator>
    )
}