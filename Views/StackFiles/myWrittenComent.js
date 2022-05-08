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
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon3 from 'react-native-vector-icons/dist/SimpleLineIcons';
import styles from "../../styles/style";
import Color from "../../styles/Color";
import API from "../../API/API";

export default ({ navigation, route }) => {
  const data = route.params;
  const [myData, setMyData] = useState([]);
  useEffect(() => {
    async function getmyPostList() {
      const myCommentiListData = await API.myCommentList(data.nickname);
      console.log("댓글", myCommentiListData);
      setMyData(myCommentiListData.reverse());
    }
    getmyPostList();
  }, [])

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ justifyContent: 'center', width: '100%', borderColor: "#a8a8a8", borderBottomWidth: 1, paddingLeft: "5%", paddingRight: "5%", paddingTop: "6%", paddingBottom: "1%" }}
        onPress={() => {
          navigation.navigate("자유 게시판", { post_index: item.post_index, comment_count: item.comment_count });
        }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {/* 제목 */}
          <Text style={{ color: 'black', fontSize: 18, fontWeight: "bold", textAlign: 'left', width: "75%", marginBottom: 10 }}
            numberOfLines={1}
            ellipsizeMode="tail">{item.header}</Text>
          <View style={{ flexDirection: "row", }}>
            <Icon
              name={"heart"}
              size={15}
              color={"#B33938"} />
            {/* 좋아요  */}
            <Text style={{ color: "black", fontSize: 10, marginLeft: 5, marginRight: 10 }}>{item.like_count}</Text>
            <Icon
              name={"comment-o"}
              size={15}
              color={"black"} />
            {/* 댓글 */}
            <Text style={{ color: "black", fontSize: 10, marginLeft: 5 }}>{item.comment_count}</Text>
          </View>
        </View>
        {/* 내용 */}
        <Text style={{ color: 'gray', fontSize: 12, textAlign: 'left' }}
          numberOfLines={1}
          ellipsizeMode="tail">{item.body}</Text>
        <Text style={{ color: 'gray', fontSize: 12, textAlign: 'left' }}
          numberOfLines={1}
          ellipsizeMode="tail">{item.post_date}</Text>
      </TouchableOpacity>

    );
  };

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1, paddingHorizontal: "5%" }}>
        {
          myData.length == 0 ?
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <Icon3
                name={"exclamation"}
                size={140}
                color={Color.loginBackground} />
              <Text style={{ color: "black", fontSize: 15, fontWeight: "bold", margin: "7%" }}>검색 결과가 없습니다.</Text>
            </View>
            :
            <FlatList
              data={myData}
              renderItem={renderItem}
              keyExtractor={item => item.post_index}
              disableVirtualization={true}
              showsVerticalScrollIndicator={false} />
        }
      </View>
      </SafeAreaView>
  )
};
