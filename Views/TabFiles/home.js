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
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [userNickname, setUserNickname] = useState("");
  const [userIndex, setUserIndex] = useState(3);
  const [summary, setSummary] = useState(0);

  useEffect(() => {
    async function getData() {
      // get User nickname
      const getData = await AsyncStorage.getItem('userInfo', (err, result) => { });
      const userInfo = JSON.parse(getData);
      setUserNickname(userInfo.nickname);
      setUserIndex(userInfo.userIndex);



       // 클리어한 루트 수 가져오기
       const clearRouteCount = await API.getUserClearRouteCount(userInfo.userIndex);
     
       if(clearRouteCount == 0) {
         setSummary(clearRouteCount);

       } else {
        setSummary(clearRouteCount);
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
        var postingListData2 = postingListData.slice(0,4);
        console.log(postingListData2);
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
          onPress={()=>{
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
    // {
    //   index: 2,
    //   title: '연경 도약대',
    //   content: '대구광역시 북구 연경동819',
    //   image: Climb
    // },
    // {
    //   index: 3,
    //   title: '천등산',
    //   content: '전라북도 연주군',
    //   image: Climb2
    // },
    // {
    //   index: 4,
    //   title: '연경 도약대',
    //   content: '대구광역시 북구 연경동819',
    //   image: Climb
    // },
    // {
    //   index: 5,
    //   title: '천등산',
    //   content: '전라북도 연주군',
    //   image: Climb2
    // },
  ];

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{}}
        onPress={() => {
          navigation.navigate("ClimbingWallInfo", { location_index: item.index+1 });
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
          {popularData()}

          {/* <View style={{ flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <Text style={{ color: "black", fontWeight: "bold" }}>클라이밍이란?</Text>
            <Text style={{ color: "black", fontWeight: "bold" }}>산을 타고 넘고 올라가자</Text>
            <View style={{ flexDirection: "row" }}>
              <Icon
                name={"heart"}
                size={15}
                color={"#B33938"} />
              <Text style={{ marginLeft: 7 }}>20</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <Text style={{ color: "black", fontWeight: "bold" }}>어떻게 잘올라감?</Text>
            <Text style={{ color: "black", fontWeight: "bold" }} ellipsizeMode="tail">이렇게 해도 저렇게 해도 못 올</Text>
            <View style={{ flexDirection: "row" }}>
              <Icon
                name={"heart"}
                size={15}
                color={"#B33938"} />
              <Text style={{ marginLeft: 7 }}>15</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <Text style={{ color: "black", fontWeight: "bold" }}>장비 추천욤</Text>
            <Text style={{ color: "black", fontWeight: "bold" }}>ㅈㄱㄴ</Text>
            <View style={{ flexDirection: "row" }}>
              <Icon
                name={"heart"}
                size={15}
                color={"#B33938"} />
              <Text style={{ marginLeft: 7 }}>17</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={{ color: "black", fontWeight: "bold" }}>여기는 게시판</Text>
            <Text style={{ color: "black", fontWeight: "bold" }}>할말이 이렇게 없나</Text>
            <View style={{ flexDirection: "row" }}>
              <Icon
                name={"heart"}
                size={15}
                color={"#B33938"} />
              <Text style={{ marginLeft: 7 }}>20</Text>
            </View>
          </View> */}

        </View>
        {/*  */}

        {/* 요약 */}
        <View style={styles.homeContentMargin}>
          <Text style={styles.homeContentTitle}>요약</Text>
        </View>

        {
          summary === 0 ?
          // 요약 정보 X
            <TouchableOpacity style={styles.homeBoard2}
              onPress={() => {

              }}>
              <Icon
                name={"plus"}
                size={50}
                color={"white"} />
              <Text style={{ color: "white", fontSize: 15, fontWeight: "bold", textAlign: "center" }}>
                {"요약할 정보가 없습니다." + "\n" + "Clear루트를 설정해주세요!"}
              </Text>
            </TouchableOpacity>
            :
            // 요약 정보 O
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
        }
      </View>
    </ScrollView>
  )
};