import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/dist/Fontisto';
import styles from "../../styles/style";

export default ({ navigation }) => {

  useEffect(() => {

  }, [])

  var testData = [
    {
      index: 0,
      title: '클라이밍이란?',
      content: '산을 타고 넘고 올라가자',
      like: 3,
      comment: 5,
    },
    {
      index: 1,
      title: '어떻게 잘올라감?',
      content: '이렇게 해도 저렇게 해도 못 올라가요 너무 힘듭니다 ',
      like: 3,
      comment: 5,
    },
    {
      index: 2,
      title: '장비 추천욤',
      content: 'ㅈㄱㄴ',
      like: 3,
      comment: 5,
    },
    {
      index: 3,
      title: '아롯 구독과 종아요 부탁드립니다.',
      content: '아롯 구독과 종아요 부탁드립니다.',
      like: 3,
      comment: 5,
    },
    {
      index: 4,
      title: '여기는 게시판 언제까지 어깨 춤을',
      content: '할말이 이렇게 없나',
      like: 3,
      comment: 5,
    },
    {
      index: 5,
      title: '근손실 예방법',
      content: '닭가슴살 오지게 먹는다 닭가슴살 오지게 먹는다',
      like: 3,
      comment: 5,
    },
    {
      index: 6,
      title: '디자인 잘하는법',
      content: '열심히 공부하자 아자아자 화이팅',
      like: 3,
      comment: 5,
    },
    {
      index: 7,
      title: '심심한데 만날 사람',
      content: '지금 드라이브 갈 사람 있나?',
      like: 3,
      comment: 5,
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ justifyContent: 'center', width: '100%', borderColor: "#a8a8a8", borderBottomWidth: 1, padding: "4%" }}
        onPress={() => {
        }}>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: 'black', fontSize: 15, fontWeight: "bold", textAlign: 'left', marginBottom: 10 }}>{item.title}</Text>
          <View style={{ flexDirection: "row" }}>
            <Icon
              name={"heart"}
              size={15}
              color={"#B33938"} />

            <Text style={{ color: "black", fontSize: 10, marginLeft: 5, marginRight: 10 }}>{item.like}</Text>

            <Icon
              name={"comment"}
              size={15}
              color={"black"} />

            <Text style={{ color: "black", fontSize: 10, marginLeft: 5 }}>{item.comment}</Text>
          </View>



        </View>

        <Text style={{ color: 'gray', fontSize: 12, textAlign: 'left', marginLeft: 10 }}>{item.content}</Text>
      </TouchableOpacity>

    );
  };

  return (
    <TouchableWithoutFeedback
      style={styles.touchableWithoutFeedback}
      onPress={Keyboard.dismiss}>
      <View style={styles.page}>

        {/* 헤더  */}
        <View style={styles.homeHeader}>
          <Text style={styles.homeAllClimb}>자유 게시판</Text>

          <View style={styles.boardPlus}>
            <Icon
              name={"plus-a"}
              size={20}
              color={"black"} />
          </View>
        </View>
        {/*  */}

        {/* 공지  */}
        <View style={{ borderColor: "gray", borderWidth: 1, paddingTop: "5%", paddingBottom: "5%", paddingLeft: "3%", marginBottom: "5%", flexDirection: "row", justifyContent: "center" }}>

          <Text style={{ position: "absolute", left: 10, top: "90%", bottom: 0, color: "black", fontWeight: "bold" }}>공지</Text>


          <Text style={{ textAlign: "center", color: "gray" }}>게시판 운영 관련 안내</Text>

        </View>
        {/*  */}



        <FlatList
          data={testData}
          renderItem={renderItem}
          keyExtractor={item => item.index}
          disableVirtualization={true} />


      </View>
    </TouchableWithoutFeedback>
  )
};