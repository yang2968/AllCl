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
import Color from "../../styles/Color"

export default ({ navigation }) => {

  useEffect(() => {

  }, [])

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={Keyboard.dismiss}>

      <SafeAreaView style={{ flex: 1, backgroundColor: Color.loginBackground }}>
        <Text>All Climb</Text>

      </SafeAreaView>

    </TouchableWithoutFeedback>
  )
};