import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TouchableOpacity
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon3 from 'react-native-vector-icons/dist/SimpleLineIcons';
import styles from "../../styles/style";
import Color from "../../styles/Color";
import API from "../../API/API";

export default ({ navigation, route }) => {
//   const data = route.params;

  const [myData, setMyData] = useState([]);
  const [userIndex, setUserIndex] = useState(3);

  useEffect(() => {
    async function getmyPostList() {
      // get User nickname
      const getData = await AsyncStorage.getItem('userInfo', (err, result) => { });
      const userInfo = JSON.parse(getData);
      setUserIndex(userInfo.userIndex);

      const userClimbingData = await API.getUserClearClimbing(userInfo.userIndex);
      console.log("test", userClimbingData);
      setMyData(userClimbingData);


    }
    getmyPostList();
  }, [])

  const renderItem = ({ item }) => {
    return (
        <TouchableOpacity
            style={{ justifyContent: 'center', width: '100%', borderColor: "#a8a8a8", borderBottomWidth: 1, paddingLeft: "5%", paddingRight: "5%", paddingTop: "6%", paddingBottom: "1%" }}
            onPress={() => {
                navigation.navigate("ClimbingWallInfo", { location_index: item.location_index });
            }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                {/* 제목 */}
                <Text style={{ color: 'black', fontSize: 18, fontWeight: "bold", textAlign: 'left', width: "75%", marginBottom: 10 }}
                    numberOfLines={1}
                    ellipsizeMode="tail">{item.name}</Text>
               
            </View>
      </TouchableOpacity>

    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1, paddingHorizontal: "5%" }}>
        {
          myData == 0 ?
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              
              <Text style={{ color: "black", fontSize: 15, fontWeight: "bold", margin: "7%" }}>완등한 암벽장이 없습니다.</Text>
            </View>
            :
            //<Text style={{ color: "black", fontSize: 15, fontWeight: "bold", margin: "7%" }}>검색 결과가 없습니다.</Text>
            <FlatList
              data={myData}
              renderItem={renderItem}
              keyExtractor={item => item.location_index}
              disableVirtualization={true}
              showsVerticalScrollIndicator={false} />
        }
      </View>
    </SafeAreaView>
  )
};
