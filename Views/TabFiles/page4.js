import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export default ({ navigation }) => {

  useEffect(() => {
   
  }, [])

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={Keyboard.dismiss}>

      <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
          <Text>4</Text>
        
      </View>

    </TouchableWithoutFeedback>
  )
};