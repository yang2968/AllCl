import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Icon from 'react-native-vector-icons/dist/Fontisto';
import styles from "../../styles/style";

export default ({ navigation }) => {

  useEffect(() => {
   
  }, [])

  return (
    <TouchableWithoutFeedback
    style={styles.touchableWithoutFeedback}
    onPress={Keyboard.dismiss}>
    <View style={styles.page}>

      {/* 헤더  */}
      <View style={styles.page1Header}>
        <Text style={styles.page1AllClimb}>자유 게시판</Text>

        <View style={styles.page3Plus}>
          <Icon
            name={"plus-a"}
            size={20}
            color={"black"} />
        </View>
      </View>
      {/*  */}

     
    </View>
  </TouchableWithoutFeedback>
  )
};