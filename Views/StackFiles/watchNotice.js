import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Color from "../../styles/Color"
import styles from "../../styles/style";
import API from "../../API/API";


export default ({ navigation, route }) => {
    const data = route.params;
    console.log(data);
  useEffect(() => {

  }, [])

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <View style={styles.watchNoticeSettingView}>
                        <View style={styles.watchPostHeaderView}>

                            <View style={{ justifyContent: "center" }}>
                                {/* <Text style={styles.watchPostNicknameText}>{nickName}</Text> */}
                                <Text style={styles.watchPostTimeText}>{data.notice.post_date}</Text>
                            </View>

                        </View>

                        {/* 제목  */}
                        <Text style={styles.watchPostHeaderText}>{data.notice.header}</Text>
                        {/*  */}

                        {/* 내용  */}
                        <Text style={styles.watchPostBodyText}
                            ellipsizeMode="head">body</Text>
                        {/*  */}

                    </View>

      </SafeAreaView>
  )
};
