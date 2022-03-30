import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
} from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import styles from "../../styles/style";
import Climb from "../../images/climb.jpeg";
import Climb2 from "../../images/climb2.jpeg";

export default ({ navigation }) => {

  useEffect(() => {

  }, [])

  return (
    <TouchableWithoutFeedback
      style={styles.touchableWithoutFeedback}
      onPress={Keyboard.dismiss}>
      <View style={styles.page}>

        {/* 헤더  */}
        <View style={styles.homeHeader}>
          <Text style={styles.homeAllClimb}>All Climb</Text>

          <View style={styles.homeSearch}>
            <Icon
              name={"search"}
              size={20}
              color={"white"} />
          </View>
        </View>
        {/*  */}

        {/* 추천 암벽장  */}
        <View style={styles.homeContentMargin}>
          <Text style={styles.homeContentTitle}>추천 암벽장</Text>
        </View>

        <View style={styles.homeRecommend}>


          <TouchableOpacity onPress={()=>{
            navigation.navigate("RCW");
          }}>
            <ImageBackground
              imageStyle={{ borderWidth: 1, borderRadius: 30 }}
              style={{ width: 150, height: 200, borderColor: "white", marginRight: 20 }}
              source={Climb}
              resizeMode="cover">

              <View style={{ position: "absolute", left: 14, bottom: 25, marginRight: 20, width: "100%", height: 20, alignItems: "flex-start" }}>
                <Text style={{ fontSize: 17, color: "white", fontWeight: "bold" }}>연경 도약대</Text>
                <Text style={{ fontSize: 10, color: "white", fontWeight: "bold" }} ellipsizeMode="tail">대구광역시 북구 연경동819</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity>
            <ImageBackground
              imageStyle={{ borderWidth: 1, borderRadius: 30 }}
              style={{ width: 150, height: 200, borderColor: "white", marginRight: 20 }}
              source={Climb2}
              resizeMode="cover">
                

              <View style={{ position: "absolute", left: 14, bottom: 25, marginRight: 20, width: "100%", height: 20, alignItems: "flex-start" }}>
                <Text style={{ fontSize: 17, color: "white", fontWeight: "bold" }}>천등산</Text>
                <Text style={{ fontSize: 10, color: "white", fontWeight: "bold" }}>전라북도 연주군</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>

        </View>
        {/*  */}

        {/* 게시판  */}
        <View style={styles.homeContentMargin}>
          <Text style={styles.homeContentTitle}>게시판</Text>
        </View>

        <View style={styles.homeBoard}>

        </View>
        {/*  */}

      </View>
    </TouchableWithoutFeedback>
  )
};