import React, { useState, useEffect, useRef, useCallback, useContext } from "react";
import {
  View,
  Text,
  ActionSheetIOS,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TouchableOpacity,
  Platform
} from "react-native";
import { useIsFocused, useRoute, StackActions, TabActions } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Color from "../../styles/Color";
import styles from "../../styles/style";
import API from "../../API/API";
import moment from "moment";
import SimplePopupMenu from 'react-native-simple-popup-menu';
import AppContext from "../../AppContext";

export default ({ navigation, route }) => {
  const globalVariables = useContext(AppContext);
  globalVariables.setRouteName(route.name);
  // 날짜순
  const dateStyle = useCallback(() => {
    likeButton.current.setNativeProps({ backgroundColor: "white" });
    commentButton.current.setNativeProps({ backgroundColor: "white" });
  }, []);
  const dateTextStyle = useCallback(() => {
    likeButtonText.current.setNativeProps({ style: { color: "black" } });
    commentButtonText.current.setNativeProps({ style: { color: "black" } });
  }, []);
  // 인기순
  const likeButton = useRef();
  const likeStyle = useCallback(() => {
    likeButton.current.setNativeProps({ backgroundColor: Color.likeButtonColor });
    commentButton.current.setNativeProps({ backgroundColor: "white" });
  }, []);
  const likeButtonText = useRef();
  const likeTextStyle = useCallback(() => {
    likeButtonText.current.setNativeProps({ style: { color: "white" } });
    commentButtonText.current.setNativeProps({ style: { color: "black" } });
  }, []);
  const [likeButtonDisable, setLikeButtonDisable] = useState(true);

  // 댓글순
  const commentButton = useRef();
  const commentStyle = useCallback(() => {
    commentButton.current.setNativeProps({ backgroundColor: Color.loginButtonBackground });
    likeButton.current.setNativeProps({ backgroundColor: "white" });
  }, []);

  const commentButtonText = useRef();
  const commentTextStyle = useCallback(() => {
    commentButtonText.current.setNativeProps({ style: { color: "white" } });
    likeButtonText.current.setNativeProps({ style: { color: "black" } });
  }, []);
  const [commentButtonDisable, setCommentButtonDisable] = useState(true);
  // 게시판 페이지가 포커싱될 떄마다 서버에 요청
  const isFocused = useIsFocused();

  const [userNickname, setUserNickname] = useState("");
  const [sortData, setSortData] = useState(0);
  const [data, setData] = useState([]);

  // 게시물 리스트 데이터 받아오기
  useEffect(() => {
    async function getData() {
      // get User nickname
      const getData = await AsyncStorage.getItem('userInfo', (err, result) => { });
      const userInfo = JSON.parse(getData);
      setUserNickname(userInfo.nickname);
      // 게시물 리스트 가져오기
      const postingListData = await API.getPostingList(userInfo.nickname);
      //console.log(postingListData);
      if (postingListData == 0) { // 에러 발생 시
        setData([postingListData]);

      } else {
        // 날짜순 정렬
        postingListData.sort((a, b) => {
          return a.post_date > b.post_date ? -1 : a.post_date > b.post_date ? 1 : 0;
        })
        setData(postingListData);
        setLikeButtonDisable(false);
        setCommentButtonDisable(false);
      }

    }
    getData();
  }, [isFocused]);
  // 게시물 리스트 정렬
  // useEffect(() => {
  //   if (sortData == 0) {
  //     var newDateData = [...data];

  //     newDateData.sort((a, b) => {
  //       return a.post_date > b.post_date ? -1 : a.post_date > b.post_date ? 1 : 0;
  //     })
  //     setData(newDateData);


  //     //console.log("날짜순");

  //   } else if (sortData == 1) {
  //     var newLikeData = [...data];
  //     newLikeData.sort((a, b) => {
  //       return a.like_count > b.like_count ? -1 : a.like_count > b.like_count ? 1 : 0;
  //     })
  //     setData(newLikeData);
  //     //console.log("인기순");

  //   } else if (sortData == 2) {
  //     var newCommentData = [...data];
  //     newCommentData.sort((a, b) => {
  //       return a.comment_count > b.comment_count ? -1 : a.comment_count > b.comment_count ? 1 : 0;
  //     })
  //     setData(newCommentData);
  //     //console.log("댓글순");

  //   } else {
  //     setData(data);
  //   }

  // }, [sortData]);

  // 안드로이드 메뉴 아이템
  const items = [
    { id: '글 쓰기', label: '글 쓰기' },
    { id: '내가 쓴 글', label: '내가 쓴 글' },
    { id: '내가 쓴 댓글', label: '내가 쓴 댓글' },
  ];

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ justifyContent: 'center', width: '100%', borderColor: "#a8a8a8", borderBottomWidth: 1, paddingLeft: "5%", paddingRight: "5%", paddingTop: "6%", paddingBottom: "6%" }}
        onPress={() => {
          navigation.navigate("자유 게시판", { post_index: item.post_index, comment_count: item.comment_count, isLike: item.isLike });
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
        <Text style={{ color: 'gray', fontSize: 12, textAlign: 'left', marginLeft: 10 }}
          numberOfLines={1}
          ellipsizeMode="tail">{item.body}</Text>
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

          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
            <TouchableOpacity style={styles.homeSearch}
              onPress={() => {
                navigation.navigate("BoardSearch");
              }}>
              <Icon
                name={"search"}
                size={20}
                color={"white"} />
            </TouchableOpacity>

            {
              Platform.OS === "android" ?
                <SimplePopupMenu
                  items={items}
                  style={{ marginLeft: 20, marginRight: 5 }}
                  onSelect={(item) => {
                    if (item.label == "글 쓰기") {
                      navigation.navigate("게시글 작성");
                    } else if (item.label == "내가 쓴 글") {
                      console.log("내가 쓴 글");
                      navigation.navigate("내가 쓴 글", { nickname: userNickname });
                    } else if (item.label == "내가 쓴 댓글") {  // 내가 쓴 글
                      console.log("내가 쓴 댓글");
                      navigation.navigate("내가 쓴 댓글", { nickname: userNickname });
                    }
                  }}>
                  <Icon2
                    name={"ellipsis-horizontal-sharp"}
                    size={20}
                    color={"black"} />
                </SimplePopupMenu>
                :
                <TouchableOpacity style={{ marginLeft: 20, marginRight: 5 }}
                  onPress={() => {
                    ActionSheetIOS.showActionSheetWithOptions(
                      {
                        title: "게시판 메뉴",
                        options: ["취소", "글 쓰기", "내가 쓴 글", "내가 쓴 댓글"],
                        cancelButtonIndex: 0,
                        userInterfaceStyle: 'dark'
                      },
                      buttonIndex => {
                        if (buttonIndex === 0) { // 취소
                        } else if (buttonIndex === 1) {
                          globalVariables.setHeader("")
                          globalVariables.setBody("")
                          navigation.navigate("게시글 작성");
                        } else if (buttonIndex === 2) {  // 내가 쓴 글
                          navigation.navigate("내가 쓴 글", { nickname: userNickname });
                        } else if (buttonIndex === 3) {// 내가 쓴 댓글
                          navigation.navigate("내가 쓴 댓글", { nickname: userNickname });
                        }
                      }
                    )
                  }}>
                  <Icon2
                    name={"ellipsis-horizontal-sharp"}
                    size={20}
                    color={"black"} />
                </TouchableOpacity>
            }
          </View>
        </View>
        {/*  */}

        {/* 공지  */}
        <TouchableOpacity style={{ borderColor: "gray", borderWidth: 1, paddingTop: "5%", paddingBottom: "5%", paddingLeft: "3%", marginBottom: "3%", flexDirection: "row", justifyContent: "center" }}>

          <Text style={{ position: "absolute", left: 10, top: 18, bottom: 0, color: "black", fontSize: 16, fontWeight: "bold" }}>공지</Text>

          <Text style={{ textAlign: "center", color: "black", fontSize: 15 }}>게시판 운영 관련 안내</Text>

        </TouchableOpacity>
        {/*  */}


        {/* 인기순, 댓글순  */}
        <View style={{ width: "100%", flexDirection: "row", marginBottom: "5%" }}>
          <TouchableOpacity style={{ backgroundColor: "white", justifyContent: "center", marginRight: 10, paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 15, borderWidth: 1, borderColor: Color.likeButtonColor }}
            ref={likeButton}
            disabled={likeButtonDisable}
            onPress={async () => {
              if (sortData == 1) {
                const dateData = await API.getPostingList("밥셔틀웅이");
                dateData.reverse();
                setData(dateData);
                dateStyle();
                dateTextStyle();
                setSortData(0);


              } else {
                const popularData = await API.getPopularPostingList("밥셔틀웅이");
                setData(popularData);
                likeStyle();
                likeTextStyle();
                setSortData(1);
              }

            }}>
            <Text style={{ color: "black", fontSize: 15, fontWeight: "bold", textAlign: "center" }}
              ref={likeButtonText}>인기순</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ backgroundColor: "white", justifyContent: "center", marginRight: 10, paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 15, borderWidth: 1, borderColor: Color.loginButtonBackground }}
            ref={commentButton}
            disabled={commentButtonDisable}
            onPress={async () => {
              if (sortData == 2) {
                const dateData = await API.getPostingList("밥셔틀웅이");
                dateData.reverse();
                setData(dateData);
                dateStyle();
                dateTextStyle();
                setSortData(0);
              } else {
                const commentsdata = await API.getCommentsPostingList("밥셔틀웅이");
                setData(commentsdata);
                commentStyle();
                commentTextStyle();
                setSortData(2);
              }

            }}>
            <Text style={{ color: "black", fontSize: 15, fontWeight: "bold", textAlign: "center" }}
              ref={commentButtonText}>댓글순</Text>
          </TouchableOpacity>
        </View>
        {/*  */}

        {
          data == 0 ?
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ color: "black" }}>게시물이 없습니다.</Text>

            </View>
            :
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.post_index}
              disableVirtualization={true}
              showsVerticalScrollIndicator={false} />

        }

      </View>
    </TouchableWithoutFeedback>
  )
};