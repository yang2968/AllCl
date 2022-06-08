import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity
} from "react-native";
import { useIsFocused, useRoute, StackActions, TabActions } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import styles from "../../styles/style";
import Color from "../../styles/Color";
import API from "../../API/API";

export default ({ navigation }) => {
  const isFocused = useIsFocused();
  const [userIndex, setUserIndex] = useState(3);
  const [summary, setSummary] = useState(0);
  const [userAvg, setUserAvg] = useState(0);
  const [clearRouteByClimbing, setClearRouteByClimbing] = useState([]);
  const [EmailCheck, setEmailCheck] = useState(false);
  const [SNSCheck, setSNSCheck] = useState(false);

  useEffect(() => {
    async function getData() {
      // get User nickname
      const getData = await AsyncStorage.getItem('userInfo', (err, result) => { });
      const userInfo = JSON.parse(getData);
      setUserIndex(userInfo.userIndex);

      // 클리어한 루트 수 가져오기
      const clearRouteCount = await API.getUserClearRouteCount(userInfo.userIndex);

      if (clearRouteCount == 0) {
        setSummary(clearRouteCount);

      } else {
        setSummary(clearRouteCount);
        // 클리어한 루트 난이도 평균 가져오기
        const clearRouteAvg = await API.getUserClearRouteInAvg(userInfo.userIndex);
        if (clearRouteAvg == 0) {
          console.log("평균", "에러");
          setUserAvg(0);
        } else if (clearRouteAvg == "") {
          console.log("평균", "완등루트 없음");
          setUserAvg(0);
        } else {
          
          setUserAvg(clearRouteAvg);
        }

         // 클리어한 암벽장별 루트 개수 가져오기
         const clearRoutebyClimbing = await API.getUserClearRouteInClimbing(userInfo.userIndex);
         if(clearRoutebyClimbing == 0) {
           setClearRouteByClimbing(0);
         } else {
           setClearRouteByClimbing(clearRoutebyClimbing);
         }
      
      }

    }
    getData();
  }, [isFocused])

  const clearRouteByClimbingView = (item) => {

    if (item.length != 0) {
      var item2 = item.slice(0, 3);
      var percentArray = [];
      for (var i = 0; i < item2.length; i++) {
        percentArray.push({ percent: Math.floor(item2[i].clearCount * 100 / item2[i].routeCount) })
      }
      return (
        item2.map((item3, index) =>
        (
          <View style={{ flexDirection: "row", marginBottom: 20, alignItems: "center", justifyContent: "flex-end" }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 10, textAlign: "left" }}>{item3.name}</Text>
            </View>
            <View style={{ backgroundColor: "#BBBBBB", height: 5, flexDirection: "row", flex: 1 }}>
              <View style={{ backgroundColor: "white", width: String(percentArray[index].percent + "%") }}></View>
            </View>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 10, textAlign: "center", marginLeft: 5, marginRight: 10 }}>{item3.clearCount + "/" + item3.routeCount}</Text>
          </View>
        ))
      )

    } else {
      return (
        <Text style={{ color: "white", fontSize: 15, fontWeight: "bold", textAlign: "center" }}>
          {"루트 정보가 없습니다."}
        </Text>
      )
    }
  };

  return (
    <ScrollView
      style={styles.myPageScrollView}>

      <SafeAreaView style={styles.myPageContainerView}>
        {/* 헤더 */}
        <View style={styles.homeHeader}>
          <Text style={styles.homeAllClimb}>내 정보</Text>
        </View>
        {/* 유저 이름  */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginBottom: "5%" }}>
          <View style={{ backgroundColor: Color.loginBackground, padding: 6, marginRight: 10, borderRadius: 5 }}>
            <Icon
              name={"user-o"}
              size={35}
              color={"white"} />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
            <Text style={{ color: "black", fontSize: 15, fontWeight: "bold" }}>장재원</Text>
            <Text style={{ color: "black", fontSize: 15 }}> 님</Text>
          </View>
        </View>


        {/* 유저의 목록 버튼 */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", marginBottom: "5%" }}>
          <TouchableOpacity style={{ borderWidth: 2, borderColor: Color.loginBackground, paddingVertical: 3, paddingHorizontal: 6 }}
          onPress={()=>{
            navigation.navigate("완등 중인 암벽장 목록");
          }}>
            <Text style={{ color: "black", fontSize: 15 }}>암벽장 목록</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ borderWidth: 2, borderColor: Color.loginBackground, paddingVertical: 3, paddingHorizontal: 6 }}
           onPress={()=>{
             navigation.navigate("완등한 루트 목록");
          }}>
            <Text style={{ color: "black", fontSize: 15 }}>Clear 목록</Text>
          </TouchableOpacity>

        </View>

        {/* 유저 요약 정보 */}
        {
          summary === 0 ?
            // 요약 정보 X
            <View style={styles.homeBoard2}
              onPress={() => {
                
              }}>
              <Icon
                name={"plus"}
                size={50}
                color={"white"} />
              <Text style={{ color: "white", fontSize: 15, fontWeight: "bold", textAlign: "center" }}>
                {"요약할 정보가 없습니다." + "\n" + "Clear루트를 설정해주세요!"}
              </Text>
            </View>
            :
            // 요약 정보 O
            <View style={styles.homeBoard3}
              onPress={() => {
                console.log(clearRouteByClimbing);
              }}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 17, marginBottom: 20 }}>평균 Clear 난이도</Text>

                <View style={{ borderColor: "white", borderWidth: 3, borderRadius: 120 / 2, width: 120, height: 120, marginBottom: 20, alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ color: "white", fontWeight: "bold", fontSize: 17 }}>{"약 " + userAvg}</Text>
                </View>

                <Text style={{ color: "white", fontWeight: "bold", fontSize: 15, textAlign: "center" }}>{"총 Clear 루트" + "\n" + summary}</Text>

              </View>

              <View style={{ flex: 1, height: "100%", }}>
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 17, textAlign: "left", marginBottom: 20 }}>{"암벽장별 Clear"}</Text>

                <View style={{ flex: 1, width: "100%", justifyContent: "flex-start", marginBottom: 20, marginRight: 5 }}>
                  {clearRouteByClimbingView(clearRouteByClimbing)}
                </View>
              </View>
            </View>
        }

        <View style={{ margin: "5%" }}></View>

        {/* E-mail */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderColor: "#B7B7B7", padding: 5, marginBottom: "9%" }}>
          <Text style={{ color: "black", fontSize: 15 }}>이메일</Text>
          <View style={{ flexDirection: "row", width: "60%", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={{ color: "black", fontSize: 15 }}>fndl48@naver.com</Text>
            <TouchableOpacity style={{ marginLeft: 25 }}>
              <Text style={{ color: "black", fontSize: 15 }}>변경</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* 전화번호 */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderColor: "#B7B7B7", padding: 5, marginBottom: "9%" }}>
          <Text style={{ color: "black", fontSize: 15 }}>전화번호</Text>
          <View style={{ flexDirection: "row", width: "60%", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={{ color: "black", fontSize: 15 }}>010-1234-5678</Text>
            <TouchableOpacity style={{ marginLeft: 25 }}>
              <Text style={{ color: "black", fontSize: 15 }}>변경</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* 비밀번호 */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderColor: "#B7B7B7", padding: 5, marginBottom: "9%" }}>
          <Text style={{ color: "black", fontSize: 15 }}>비밀번호</Text>
          <View style={{ flexDirection: "row", width: "60%", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={{ color: "black", fontSize: 15 }}>********</Text>
            <TouchableOpacity style={{ marginLeft: 25 }}>
              <Text style={{ color: "black", fontSize: 15 }}>변경</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ margin: "5%" }}></View>
        {/* 이메일 수신 허용 */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderColor: "#B7B7B7", padding: 5, marginBottom: "9%" }}>
          <Text style={{ color: "black", fontSize: 15 }}>이메일 수신 허용</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity style={{ padding: 2, transform: [{ rotateZ: "180deg" }], marginRight: 20 }}>
              <Icon2
                name={"triangle-sharp"}
                size={18}
                color={"#707070"} />
            </TouchableOpacity>
            <CheckBox
              disabled={false}
              value={EmailCheck}
              onValueChange={(newValue) => setEmailCheck(newValue)}
              // android
              tintColors={{ true: Color.loginBackground, false: "#B7B7B7" }}
              // iOS
              onTintColor={Color.loginBackground}
              onCheckColor={Color.loginBackground}
              boxType={"square"}
            />
          </View>
        </View>
        {/* SNS 수신 허용 */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderColor: "#B7B7B7", padding: 5, marginBottom: "9%" }}>
          <Text style={{ color: "black", fontSize: 15 }}>SNS 수신 허용</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity style={{ padding: 2, transform: [{ rotateZ: "180deg" }], marginRight: 20 }}>
              <Icon2
                name={"triangle-sharp"}
                size={18}
                color={"#707070"} />
            </TouchableOpacity>
            <CheckBox
              disabled={false}
              value={SNSCheck}
              onValueChange={(newValue) => setSNSCheck(newValue)}
              // android
              tintColors={{ true: Color.loginBackground, false: "#B7B7B7" }}
              // iOS
              onTintColor={Color.loginBackground}
              onCheckColor={Color.loginBackground}
              boxType={"square"}
            />
          </View>
        </View>

      </SafeAreaView>

    </ScrollView>
  )
};