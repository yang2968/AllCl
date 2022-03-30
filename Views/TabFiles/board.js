import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Color from "../../styles/Color";
import styles from "../../styles/style";

export default ({ navigation }) => {

  
  // 인기순
  const likeButton = useRef();
  const likeStyle = useCallback(() => {
    likeButton.current.setNativeProps({ backgroundColor: Color.likeButtonColor });
    commentButton.current.setNativeProps({ backgroundColor: "white" });
  }, []);

  const likeButtonText = useRef();
  const likeTextStyle = useCallback(() => {
    likeButtonText.current.setNativeProps({ style:{ color: "white" }});
    commentButtonText.current.setNativeProps({ style:{ color: "black" }});
  }, []);

  // 댓글순
  const commentButton = useRef();
  const commentStyle = useCallback(() => {
    commentButton.current.setNativeProps({ backgroundColor: Color.loginButtonBackground });
    likeButton.current.setNativeProps({ backgroundColor: "white" });
  }, []);

  const commentButtonText = useRef();
  const commentTextStyle = useCallback(() => {
    commentButtonText.current.setNativeProps({ style:{ color: "white" }});
    likeButtonText.current.setNativeProps({ style:{ color: "black" }});
  }, []);

  const [sortData, setSortData] = useState(0);
  const [data, setData] = useState(testData);
// post_date로 게시물 생성 날짜 
  
  var testData = [
    {
      index: 0,
      post_date: "2022-01-01",
      title: '클라이밍이란?',
      content: '산을 타고 넘고 올라가자',
      like: 9,
      comment: 1,
    },
    {
      index: 1,
      post_date: "2022-01-02",
      title: '어떻게 잘올라감?',
      content: '이렇게 해도 저렇게 해도 못 올라가요 너무 힘듭니다 ',
      like: 8,
      comment: 2,
    },
    {
      index: 2,
      post_date: "2022-01-03",
      title: '장비 추천욤',
      content: 'ㅈㄱㄴ',
      like: 7,
      comment: 3,
    },
    {
      index: 3,
      post_date: "2022-01-04",
      title: '아롯 구독과 종아요 부탁드립니다.',
      content: '아롯 구독과 종아요 부탁드립니다.',
      like: 6,
      comment: 4,
    },
    {
      index: 4,
      post_date: "2022-01-05",
      title: '여기는 게시판 언제까지 어깨 춤을',
      content: '할말이 이렇게 없나',
      like: 5,
      comment: 5,
    },
    {
      index: 5,
      post_date: "2022-01-06",
      title: '근손실 예방법',
      content: '닭가슴살 오지게 먹는다 닭가슴살 오지게 먹는다',
      like: 4,
      comment: 6,
    },
    {
      index: 6,
      post_date: "2022-01-07",
      title: '디자인 잘하는법',
      content: '열심히 공부하자 아자아자 화이팅',
      like: 3,
      comment: 7,
    },
    {
      index: 7,
      post_date: "2022-01-08",
      title: '심심한데 만날 사람',
      content: '지금 드라이브 갈 사람 있나?',
      like: 2,
      comment: 8,
    },
    {
      index: 8,
      post_date: "2022-01-09",
      title: '중간고사 언제부터죠??',
      content: 'ㅈㄱㄴ',
      like: 1,
      comment: 9,
    },
  ];

  useEffect(() => {
    if(sortData == 0) {
      console.log("인기");
      var newLikeData = [...testData];
      newLikeData.sort((a, b) => {
        return a.like > b.like ? -1 : a.like > b.like ? 1 : 0;
      })
      setData(newLikeData);
      console.log("000", newLikeData);

    } else {
      console.log("댓글");
      var newCommentData = [...testData];
      newCommentData.sort((a, b) => {
        return a.comment > b.comment ? -1 : a.comment > b.comment ? 1 : 0;
      })
      setData(newCommentData);
      console.log("111", newCommentData);
    }

  }, [sortData]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ justifyContent: 'center', width: '100%', borderColor: "#a8a8a8", borderBottomWidth: 1, padding: "4%" }}
        onPress={() => {
        }}>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {/* 제목 */}
          <Text style={{ color: 'black', fontSize: 15, fontWeight: "bold", textAlign: 'left', marginBottom: 10 }}>{item.title}</Text>
          <View style={{ flexDirection: "row" }}>
            <Icon
              name={"heart"}
              size={15}
              color={"#B33938"} />
            {/* 좋아요  */}
            <Text style={{ color: "black", fontSize: 10, marginLeft: 5, marginRight: 10 }}>{item.like}</Text>

            <Icon
              name={"comment-o"}
              size={15}
              color={"black"} />
            {/* 댓글 */}
            <Text style={{ color: "black", fontSize: 10, marginLeft: 5 }}>{item.comment}</Text>
          </View>

        </View>
        {/* 내용 */}
        <Text style={{ color: 'gray', fontSize: 10, textAlign: 'left', marginLeft: 10 }}>{item.content}</Text>
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
            <TouchableOpacity style={styles.homeSearch}>
              <Icon
                name={"search"}
                size={20}
                color={"white"} />
            </TouchableOpacity>

            <TouchableOpacity style={{ marginLeft: 20, marginRight: 10 }}>
              <Icon
                name={"ellipsis-h"}
                size={20}
                color={"black"} />
            </TouchableOpacity>

          </View>
        </View>
        {/*  */}

        {/* 공지  */}
        <TouchableOpacity style={{ borderColor: "gray", borderWidth: 1, paddingTop: "5%", paddingBottom: "5%", paddingLeft: "3%", marginBottom: "3%", flexDirection: "row", justifyContent: "center" }}>

          <Text style={{ position: "absolute", left: 10, top: "100%", bottom: 0, color: "black", fontWeight: "bold" }}>공지</Text>

          <Text style={{ textAlign: "center", color: "gray", fontSize: 15 }}>게시판 운영 관련 안내</Text>

        </TouchableOpacity>
        {/*  */}


        {/* 인기순, 댓글순  */}
        <View style={{ width: "100%", flexDirection: "row", marginBottom: "5%" }}>
        <TouchableOpacity style={{ backgroundColor: Color.likeButtonColor, justifyContent: "center", marginRight: 10, paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 15, borderWidth: 1, borderColor: Color.likeButtonColor }}
        ref={likeButton}
        onPress={() => {
          likeStyle();
          likeTextStyle();
          setSortData(0);
        }}>
          <Text style={{ color: "white", fontSize: 15, fontWeight: "bold", textAlign: "center" }}
          ref={likeButtonText}>인기순</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ backgroundColor: "white", justifyContent: "center", marginRight: 10, paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 15, borderWidth: 1, borderColor: Color.loginButtonBackground }}
        ref={commentButton}
        onPress={() => {
          commentStyle();
          commentTextStyle();
          setSortData(1);
        }}>
          <Text style={{ color: "black", fontSize: 15, fontWeight: "bold", textAlign: "center" }}
          ref={commentButtonText}>댓글순</Text>
        </TouchableOpacity>
        </View>
        {/*  */}

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.index}
          disableVirtualization={true} />


      </View>
    </TouchableWithoutFeedback>
  )
};