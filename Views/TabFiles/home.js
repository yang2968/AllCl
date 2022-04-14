import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
} from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import styles from "../../styles/style";
import API from "../../API/API";
import Climb from "../../images/climb.jpeg";
import Climb2 from "../../images/climb2.jpeg";
import Color from "../../styles/Color";

export default ({ navigation }) => {

  const [data, setData] = useState(testData);

  useEffect(() => {

  }, [])

  const testData = [
    {
      index: 0,
      title: '연경 도약대',
      content: '대구광역시 북구 연경동819',
      image: Climb
    },
    {
      index: 1,
      title: '천등산',
      content: '전라북도 연주군',
      image: Climb2
    },
    {
      index: 2,
      title: '연경 도약대',
      content: '대구광역시 북구 연경동819',
      image: Climb
    },
    {
      index: 3,
      title: '천등산',
      content: '전라북도 연주군',
      image: Climb2
    },
    {
      index: 4,
      title: '연경 도약대',
      content: '대구광역시 북구 연경동819',
      image: Climb
    },
    {
      index: 5,
      title: '천등산',
      content: '전라북도 연주군',
      image: Climb2
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{}}
        onPress={() => {
          navigation.navigate("RCW");
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

          <View style={{ flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
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
            <Text style={{ color: "black", fontWeight: "bold" }}  ellipsizeMode="tail">이렇게 해도 저렇게 해도 못 올</Text>
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

          <View style={{ flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <Text style={{ color: "black", fontWeight: "bold" }}>여기는 게시판</Text>
            <Text style={{ color: "black", fontWeight: "bold" }}>할말이 이렇게 없나</Text>
            <View style={{ flexDirection: "row" }}>
              <Icon
                name={"heart"}
                size={15}
                color={"#B33938"} />
              <Text style={{ marginLeft: 7 }}>20</Text>
            </View>
          </View>

        </View>
        {/*  */}

        {/* 요약 */}
        <View style={styles.homeContentMargin}>
          <Text style={styles.homeContentTitle}>요약</Text>
        </View>

        <TouchableOpacity style={styles.homeBoard2}
        onPress={()=>{

        }}>
           <Icon
                name={"plus"}
                size={50}
                color={Color.loginBackground} />
          <Text style={{ color: Color.loginBackground, fontSize: 15, fontWeight: "bold", textAlign: "center" }}>
            {"요약할 정보가 없습니다." + "\n" + "Clear루트를 설정해주세요!"}
          </Text>
        </TouchableOpacity>


      </View>
    </ScrollView>
  )
};