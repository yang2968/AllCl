import React, { useState, useEffect, useContext } from "react";
import {
    View,
    ScrollView,
    Text,
    ActionSheetIOS,
    FlatList,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
    TouchableOpacity
} from "react-native";
import { useRoute, StackActions, TabActions } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/dist/Ionicons';
import AppContext from "../../AppContext";
import styles from "../../styles/style";
import Color from "../../styles/Color";

export default ({ navigation }) => {
    const globalVariables = useContext(AppContext);
    useEffect(() => {
       
    }, [])

    return (
        <TouchableWithoutFeedback
            style={{ flex: 1 }}
            onPress={Keyboard.dismiss}>

            <View style={styles.postingView}>
                <View style={{ width: "88%", alignItems: "center", marginBottom: 15, paddingBottom: 10, borderBottomWidth: 1, borderColor: "#848484", }}>
                <TextInput style={styles.postingTitle}
                    placeholder="제목"
                    placeholderTextColor="#9D9D9D"
                    value={globalVariables.header}
                    onChangeText={
                        header => globalVariables.setHeader(header)
                    } />
                </View>
                
                <ScrollView style={styles.postingScrollContents}
                showsVerticalScrollIndicator={false}>
                    <TextInput style={styles.postingContent}
                        placeholder="내용을 입력하세요."
                        placeholderTextColor="#9D9D9D"
                        value={globalVariables.body}
                        multiline={true}
                        textAlignVertical={"top"}
                        autoFocus={true}
                        onChangeText={
                            body => globalVariables.setBody(body)
                        } />
                </ScrollView>

                <View style={styles.postingBottomView}>
                <TouchableOpacity style={{ padding: 10 }}
                onPress={() =>{
                    ActionSheetIOS.showActionSheetWithOptions(
                        { 
                          title: "게시판 메뉴",
                          options: ["취소", "촬영", "앨범"],
                          cancelButtonIndex: 0,
                          userInterfaceStyle: 'dark'
                        },
                        buttonIndex => {
                          if (buttonIndex === 0) {
                            // 취소
                          } else if (buttonIndex === 1) {
                            // 카메라
                          } else if (buttonIndex === 2) {
                           // 앨범
                          }
                        }
                      );
                }}>
                    <Icon
                        name={"camera-outline"}
                        size={40}
                        color={Color.loginButtonBackground} />
                </TouchableOpacity>
                </View>

            </View>
        </TouchableWithoutFeedback>
    )
};