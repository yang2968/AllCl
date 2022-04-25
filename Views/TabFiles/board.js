import React, { useState, useEffect, useRef, useCallback } from "react";
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
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Color from "../../styles/Color";
import styles from "../../styles/style";
import API from "../../API/API";
import moment from "moment";


export default ({ navigation }) => {


  const [color, setColor] = useState('blue');
  const [circle, setCircle] = useState(false)

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

  const [sortData, setSortData] = useState(0);
  const [data, setData] = useState([]);
  // post_date로 게시물 생성 날짜 

  var testData = [
    {
      index: 0,
      post_date: "2022-01-19",
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
      post_date: "2022-01-15",
      title: '장비 추천욤',
      content: 'ㅈㄱㄴ',
      like: 7,
      comment: 3,
    },
    {
      index: 3,
      post_date: "2022-01-10",
      title: '아롯 구독과 좋아요 부탁드립니다.',
      content: '아롯 구독과 종아요 부탁드립니다.',
      like: 6,
      comment: 4,
    },
    {
      index: 4,
      post_date: "2022-01-05",
      title: '여기는 게시판 언제까지 어깨 춤을 가나다 라마 바사',
      content: '할말이 이렇게 없나 가나다 라 바사가 나다 라마바사가 나다라마바 사가나 다라 마바사 가나 다라마 바사 가나다 라마 바사아',
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
      post_date: "2022-01-30",
      title: '심심한데 만날 사람',
      content: '지금 드라이브 갈 사람 있나?',
      like: 2,
      comment: 8,
    },
    {
      index: 8,
      post_date: "2022-04-11 11:37:58",
      title: '중간고사 언제부터죠??',
      content: 'ㅈㄱㄴ',
      like: 1,
      comment: 9,
    },
  ];

// 게시물 리스트 데이터 받아오기
useEffect(() => {
  async function getData() {
    const postingListData = await API.getPostingList();
    console.log("게시물 리스트 데이터 받아오기", postingListData);
    if (postingListData == 0) {
      setData(postingListData);
    } else {
      // 날짜순 정렬
      postingListData.sort((a, b) => {
        return a.post_date > b.post_date ? -1 : a.post_date > b.post_date ? 1 : 0;
      })
      setData(postingListData);
    }

  }
  getData();
}, []);
// 게시물 리스트 정렬
useEffect(() => {
  if (sortData == 0) {

    console.log("게시물 리스트 정렬", typeof (data));
    if (typeof (data) != Number) {
      var newDateData = [...data];
      console.log("00", newDateData);
      // console.log("11");
      // console.log("22", data[2].post_date);
      //var test = moment(newDateData[2].post_date).format("YYYYMMDDHHmmss");
      //console.log("33", test);


      newDateData.sort((a, b) => {
        return a.post_date > b.post_date ? -1 : a.post_date > b.post_date ? 1 : 0;
      })
      setData(newDateData);
    } else {
      setData(0);
    }

    //console.log("날짜순");

  } else if (sortData == 1) {
    console.log("1");
    var newLikeData = [...data];
    newLikeData.sort((a, b) => {
      return a.like_count > b.like_count ? -1 : a.like_count > b.like_count ? 1 : 0;
    })
    setData(newLikeData);
    //console.log("인기순");

  } else if (sortData == 2) {
    console.log("2");
    var newCommentData = [...data];
    newCommentData.sort((a, b) => {
      return a.comment_count > b.comment_count ? -1 : a.comment_count > b.comment_count ? 1 : 0;
    })
    setData(newCommentData);
    //console.log("댓글순");

  } else {
    setData(data);
  }

}, [sortData]);

const renderItem = ({ item }) => {
  return (
    <TouchableOpacity
      style={{ justifyContent: 'center', width: '100%', borderColor: "#a8a8a8", borderBottomWidth: 1, paddingLeft: "5%", paddingRight: "5%", paddingTop: "6%", paddingBottom: "6%" }}
      onPress={() => {
        navigation.navigate("자유 게시판", { title: item.title, content: item.content, like: item.like, comment: item.comment });
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
        ellipsizeMode="tail">{item.post_date}</Text>
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

          <TouchableOpacity style={{ marginLeft: 20, marginRight: 5 }}
            onPress={() => {
              {
                Platform.OS === "android" ?


                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "black" }}>no data</Text>
    
    
    
              </View>
            
           

                 
                    :
                  ActionSheetIOS.showActionSheetWithOptions(
                    {
                      title: "게시판 메뉴",
                      options: ["취소", "글 쓰기", "내가 쓴 글", "내가 쓴 댓글"],
                      cancelButtonIndex: 0,
                      userInterfaceStyle: 'dark'
                    },
                    buttonIndex => {
                      if (buttonIndex === 0) {
                        // 취소
                      } else if (buttonIndex === 1) {
                        navigation.navigate("게시글 작성");
                      } else if (buttonIndex === 2) {
                        // 내가 쓴 글
                      } else if (buttonIndex === 3) {
                        // 내가 쓴 댓글
                      }
                    }
                  )

              }
            }}>
            <Icon2
              name={"ellipsis-horizontal-sharp"}
              size={20}
              color={"black"} />
          </TouchableOpacity>

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
          onPress={() => {
            if (sortData == 1) {
              dateStyle();
              dateTextStyle();
              setSortData(0);

            } else {
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
          onPress={() => {
            if (sortData == 2) {
              dateStyle();
              dateTextStyle();
              setSortData(0);
            } else {
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
            <Text style={{ color: "black" }}>no data</Text>



          </View>
          :
          // <FlatList
          //   data={data}
          //   renderItem={renderItem}
          //   keyExtractor={item => item.post_index}
          //   disableVirtualization={true}
          //   showsVerticalScrollIndicator={false} />
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: "black" }}>data</Text>



        </View>


      }



    </View>
  </TouchableWithoutFeedback>
)
};