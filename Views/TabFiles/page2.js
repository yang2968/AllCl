import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Image
} from "react-native";
import map from "../../images/map.png"

export default ({ navigation }) => {

  useEffect(() => {
   
  }, [])

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={Keyboard.dismiss}>

      <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
          <Image
          source={map}
           resizeMode="contain" />
      </View>

    </TouchableWithoutFeedback>
  )
};