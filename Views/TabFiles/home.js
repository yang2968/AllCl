import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Image,
  ImageBackground,
} from "react-native";
import { useIsFocused, useRoute, StackActions, TabActions } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import styles from "../../styles/style";
import API from "../../API/API";
import Climb from "../../images/climb.jpeg";
import Climb2 from "../../images/climb2.jpeg";

export default ({ navigation }) => {
  const testData = [
    {
      index: "0",
      title: '연경 도약대',
      content: '대구광역시 북구 연경동819',
      image: Climb
    },
    {
      index: "1",
      title: '천등산',
      content: '전라북도 연주군',
      image: Climb2
    },
  ];
  // const testData2 = [
  //   {"clearCount": 1, "name": "연경도약대", "routeCount": 3},
  //   {"clearCount": 2, "name": "천등산", "routeCount": 50},

  // ];

  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [userNickname, setUserNickname] = useState("");
  const [userIndex, setUserIndex] = useState(3);
  const [summary, setSummary] = useState(0);
  const [userAvg, setUserAvg] = useState(0);
  const [clearRouteByClimbing, setClearRouteByClimbing] = useState([]);

  useEffect(() => {
    async function getData() {
      // get User nickname
      const getData = await AsyncStorage.getItem('userInfo', (err, result) => { });
      const userInfo = JSON.parse(getData);
      setUserNickname(userInfo.nickname);
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
          console.log("평균", clearRouteAvg);
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

      // 게시물 리스트 가져오기
      const postingListData = await API.getPostingList(userInfo.nickname);

      if (postingListData == 0) { // 에러 발생 시
        setPostData(postingListData);

      } else {
        // 날짜순 정렬
        postingListData.sort((a, b) => {
          return a.post_date > b.post_date ? -1 : a.post_date > b.post_date ? 1 : 0;
        })
        var postingListData2 = postingListData.slice(0, 4);
        setPostData(postingListData2);
      }

    }
    getData();
  }, [isFocused])

  const popularData = () => {
    if (postData != 0) {
      return (
        postData.map((item) => (
          <TouchableOpacity style={{ flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "space-between", marginBottom: "5%" }}
            onPress={() => {
              navigation.navigate("자유 게시판", { post_index: item.post_index, comment_count: item.comment_count, like_count: item.like_count, isLike: item.isLike });
            }}>
            <Text style={{ color: "black", fontWeight: "bold" }}>{item.header}</Text>
            <Text style={{ color: "black", fontWeight: "bold" }}>{item.body}</Text>
            <View style={{ flexDirection: "row" }}>
              <Icon
                name={"heart"}
                size={15}
                color={"#B33938"} />
              <Text style={{ marginLeft: 7 }}>{item.like_count}</Text>
            </View>
          </TouchableOpacity>
        ))
      )
    }
  };

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

  const renderItem = ({ item }) => {
    //console.log(item);
    return (
      <TouchableOpacity
        style={{}}
        onPress={() => {
          navigation.navigate("ClimbingWallInfo", { location_index: Number(item.index + 1) });
          //  navigation.navigate("ClimbingWallInfo", { location_index: locationInfo[0].location_index });
        }}>

        <ImageBackground
          imageStyle={{ borderRadius: 30 }}
          style={{ width: 200, height: 300, borderColor: "white", marginRight: 20 }}
          source={item.image}
          resizeMode="cover">

          <View style={{ position: "absolute", left: 14, bottom: 25, marginRight: 20, width: "100%", height: 20, alignItems: "flex-start" }}>
            <Text style={{ fontSize: 17, color: "white", fontWeight: "bold" }}>{item.title}</Text>
            <Text style={{ fontSize: 10, color: "white", fontWeight: "bold" }} ellipsizeMode="tail">{item.content}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>

    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}>
      <View style={styles.page}>

        {/* 헤더  */}
        <View style={styles.homeHeader}>
          <Text style={styles.homeAllClimb}>All Climb</Text>

          <TouchableOpacity style={styles.homeSearch}>
            <Icon
              name={"search"}
              size={20}
              color={"white"} />
          </TouchableOpacity>
        </View>
        {/*  */}

        {/* 추천 암벽장  */}
        <View style={styles.homeContentMargin}>
          <Text style={styles.homeContentTitle}>추천 암벽장</Text>
        </View>


        <View style={styles.homeRecommend}>

          <FlatList
            data={testData}
            renderItem={renderItem}
            horizontal={true}
            keyExtractor={item => item.index}
            showsHorizontalScrollIndicator={false}
            disableVirtualization={true} />

        </View>
        {/*  */}

        {/* 인기 게시판  */}
        <View style={styles.homeContentMargin}>
          <Text style={styles.homeContentTitle}>인기 게시판</Text>
        </View>

        <View style={styles.homeBoard}>

          {postData != 0 ?
            popularData()
            :
            <Text style={{ marginBottom: "5%", textAlign: "center", color: "black", fontSize: 15 }}>게시물이 없습니다.</Text>
          }



        

        </View>
        {/*  */}

        {/* 요약 */}
        <View style={styles.homeContentMargin}>
          <Text style={styles.homeContentTitle}>요약</Text>
        </View>

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
      </View>
    </ScrollView>
  )
};