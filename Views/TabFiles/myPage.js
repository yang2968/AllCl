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
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import styles from "../../styles/style";
import Color from "../../styles/Color";
import API from "../../API/API";

export default ({ navigation }) => {

  const [EmailCheck, setEmailCheck] = useState(false);
  const [SNSCheck, setSNSCheck] = useState(false);

  useEffect(() => {

  }, [])

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
          <TouchableOpacity style={{ borderWidth: 2, borderColor: Color.loginBackground, paddingVertical: 3, paddingHorizontal: 6 }}>
            <Text style={{ color: "black", fontSize: 15 }}>암벽장 목록</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ borderWidth: 2, borderColor: Color.loginBackground, paddingVertical: 3, paddingHorizontal: 6 }}>
            <Text style={{ color: "black", fontSize: 15 }}>Clear 목록</Text>
          </TouchableOpacity>

        </View>

        {/* 유저 요약 정보 */}
        <TouchableOpacity style={styles.homeBoard3}
          onPress={() => {

          }}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 17, marginBottom: 20 }}>평균 Clear 난이도</Text>

            <View style={{ borderColor: "white", borderWidth: 3, borderRadius: 120 / 2, width: 120, height: 120, marginBottom: 20, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 17 }}>약 5.9b</Text>
            </View>

            <Text style={{ color: "white", fontWeight: "bold", fontSize: 15, textAlign: "center" }}>{"총 Clear 루트" + "\n" + "50"}</Text>

          </View>

          <View style={{ flex: 1, height: "100%", }}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 17, textAlign: "left" }}>{"암벽장별 Clear"}</Text>

            <View style={{ flex: 1, width: "100%", justifyContent: "center", marginBottom: 20, marginRight: 5 }}>


              <View style={{ flexDirection: "row", marginBottom: 20, alignItems: "center", justifyContent: "flex-end" }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: "white", fontWeight: "bold", fontSize: 10, textAlign: "left" }}>연경도약대</Text>
                </View>
                <View style={{ backgroundColor: "#BBBBBB", width: 60, height: 5, flexDirection: "row", flex: 1 }}>
                  <View style={{ backgroundColor: "white", width: 33 }}></View>
                </View>
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 10, textAlign: "center", marginLeft: 5, marginRight: 10 }}>25/50</Text>
              </View>

              <View style={{ flexDirection: "row", marginBottom: 20, alignItems: "center", justifyContent: "flex-end" }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: "white", fontWeight: "bold", fontSize: 10, textAlign: "left" }}>천등산</Text>
                </View>
                <View style={{ backgroundColor: "#BBBBBB", width: 60, height: 5, flexDirection: "row", flex: 1 }}>
                  <View style={{ backgroundColor: "white", width: 22 }}></View>
                </View>
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 10, textAlign: "center", marginLeft: 5, marginRight: 10 }}>10/30</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: "white", fontWeight: "bold", fontSize: 10, textAlign: "left" }}>대구가톨릭대</Text>
                </View>
                <View style={{ backgroundColor: "#BBBBBB", width: 60, height: 5, flexDirection: "row", flex: 1 }}>
                  <View style={{ backgroundColor: "white", width: 45 }}></View>
                </View>
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 10, textAlign: "center", marginLeft: 5, marginRight: 10 }}>15/20</Text>
              </View>

            </View>
          </View>
        </TouchableOpacity>

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