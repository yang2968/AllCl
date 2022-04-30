import React, { useState, useEffect } from "react";
import {
    View,
    SafeAreaView,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    FlatList,
    TextInput,
    TouchableOpacity,
    Dimensions,
    ActionSheetIOS
} from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Color from "../../styles/Color"
import styles from "../../styles/style";
import API from "../../API/API";

export default ({ navigation, route }) => {
    // 게시물 인덱스 받아오기
    const data = route.params;
    // 게시물 정보
    const [nickName, setNickName] = useState("");
    const [header, setHeader] = useState("");
    const [body, setBody] = useState("");
    const [like_count, setLikeCount] = useState("");
    const [comment_count, setCommentCount] = useState("");
    const [post_date, setPostDate] = useState("");
    // 댓글 정보
    const [commentData, setCommentData] = useState([]);

    const [tabLike, setTabLike] = useState(false);
    const [text, setText] = useState("");

    var testWidth = Dimensions.get("window").width;
    useEffect(() => {
        async function getData() {
            // 선택한 게시물 정보 조회
            const postData = await API.watchPost(data.post_index);
            setNickName(postData[0].nickname);
            setHeader(postData[0].header);
            setPostDate(postData[0].post_date);
            setBody(postData[0].body);
            setLikeCount(postData[0].like_count);
            setCommentCount(postData[0].comment_count);
             // 선택한 게시물 댓글 정보 조회
             if(data.comment_count != 0) {
                const postCommentData = await API.watchComment(data.post_index);
                console.log(postCommentData);
                setCommentData(postCommentData);
             }
             
        }
        getData();
    }, [tabLike])
    // 댓글
    const renderItem = ({ item }) => {
        return (
            <View style={{ flexDirection: "row", borderColor: "#DBD9D9", borderBottomWidth: 1, paddingTop: "3%", paddingBottom: "3%" }}>
                <View style={{ justifyContent: "center" }}>
                    {/* 익명 */}
                    <View style={{ flexDirection: "row", paddingBottom: "3%", alignItems: "center" }}>
                        <View style={{ backgroundColor: Color.loginBackground, paddingVertical: 4, paddingHorizontal: 4, marginRight: 7, borderRadius: 5 }}>
                            <Icon
                                name={"user-o"}
                                size={20}
                                color={"white"} />
                        </View>

                        <Text style={{ color: 'black', fontSize: 15, fontWeight: "bold", textAlign: 'left' }}>{item.nickname}</Text>
                    </View>
                    {/* 댓글 내용 */}
                    <Text style={{ color: 'black', fontSize: 12, textAlign: 'left', marginVertical: "2%" }}
                        numberOfLines={1}
                        ellipsizeMode="tail">{item.comment}</Text>
                    {/* 시간 */}
                    <Text style={{ color: 'gray', fontSize: 12, textAlign: 'left' }}>{item.record_time}</Text>
                </View>

                <View style={{ flexDirection: "row", flex: 1, justifyContent: "flex-end" }}>
                    <TouchableOpacity style={{ padding: 5, marginRight: 5 }}
                        onPress={() => {

                        }}>
                        <Icon
                            name={"comment-o"}
                            size={15}
                            color={"black"} />

                    </TouchableOpacity>

                    <TouchableOpacity style={{ padding: 5 }}
                        onPress={() => {
                            {
                                Platform.OS === "android" ?
                                    <View>

                                    </View>
                                    :
                                    ActionSheetIOS.showActionSheetWithOptions(
                                        {
                                            title: "게시판 메뉴",
                                            options: ["취소", "수정", "삭제"],
                                            cancelButtonIndex: 0,
                                            userInterfaceStyle: 'dark'
                                        },
                                        async (buttonIndex) => {
                                            if (buttonIndex === 0) { // 취소
                                            } else if (buttonIndex === 1) { // 수정
                                                const modifyComment = await API.modifyComment("댓글댓글", item.comment_index);
                                                switch (modifyComment[0]) {
                                                    case 200: case 201:
                                                        const postCommentData = await API.watchComment(data.post_index);
                                                        setCommentData(postCommentData);
                                                        break;

                                                } 
                                            } else if (buttonIndex === 2) {  // 삭제
                                                
                                                const deleteComment = await API.deleteComment(item.comment_index);
                                                console.log("result", deleteComment);
                                                switch (deleteComment[0]) {
                                                    case 200: case 201:
                                                        const postCommentData = await API.watchComment(data.post_index);
                                                        setCommentData(postCommentData);
                                                        break;

                                                } 
                                                
                                            }
                                        }
                                    )

                            }


                        }}>
                        <Icon2
                            name={"ellipsis-vertical"}
                            size={15}
                            color={"black"} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: "white", paddingLeft: "5%", paddingRight: "5%", paddingTop: "3%" }}>

            <FlatList
                data={commentData}
                renderItem={renderItem}
                keyExtractor={item => item.comment_index}
                disableVirtualization={true}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View style={{}}>
                        <View style={{ width: "100%", flexDirection: "row", marginBottom: "5%", alignItems: "center" }}>
                            <View style={{ alignItems: "center", justifyContent: "center", width: 35, height: 38, backgroundColor: Color.loginBackground, borderRadius: 5, paddingVertical: 4, paddingHorizontal: 4 }}>
                                <Icon
                                    name={"user-o"}
                                    size={25}
                                    color={"white"} />
                            </View>

                            <View style={{ justifyContent: "center", marginLeft: 15 }}>
                                <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>{nickName}</Text>
                                <Text style={{ color: "#AFAFAF", fontSize: 14 }}>{post_date}</Text>
                            </View>

                        </View>

                        {/* 제목  */}
                        <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>{header}</Text>
                        {/*  */}

                        {/* 내용  */}
                        <Text style={{ color: "black", fontSize: 15, paddingTop: "5%", paddingBottom: "5%" }}
                            ellipsizeMode="head">{body}</Text>
                        {/*  */}

                        <View style={{ width: "100%", flexDirection: "row", paddingBottom: "1%", borderBottomWidth: 1, borderColor: "#DBD9D9", alignItems: "center" }}>
                            {/* 좋아요 */}
                            <TouchableOpacity style={{ paddingLeft: 7, paddingRight: 7, paddingTop: 10, paddingBottom: 10, }}
                                onPress={async () => {
                                    const setLike = await API.tabLike("귀요미준호", data.post_index);
                                    console.log(setLike[0]);
                                    if (setLike == 200) {
                                        setLikeCount(like_count);
                                        setTabLike(false);
                                    } else {
                                        setLikeCount(like_count);
                                        setTabLike(true);
                                    }
                                    // console.log("좋아요 누르기", tabLike);
                                    // switch (tabLike) {
                                    //     case true:
                                    //         setTabLike(false);
                                    //         break;
                                    //         case false:
                                    //         setTabLike(true);
                                    //         break;
                                    // }
                                }}>
                                {
                                    tabLike === true ?
                                        <Icon
                                            name={"heart"}
                                            size={20}
                                            color={"#B33938"} />
                                        :
                                        <Icon
                                            name={"heart-o"}
                                            size={20}
                                            color={"#B33938"} />

                                }

                            </TouchableOpacity>

                            <Text style={{ color: "black", fontSize: 15 }}>{like_count}</Text>

                            <View style={{ marginRight: 15 }} />

                            <View style={{ marginRight: 7 }}>
                                {/* 댓글  */}
                                <Icon
                                    name={"comment-o"}
                                    size={20}
                                    color={"black"} />
                            </View>
                            <Text style={{ color: "black", fontSize: 15 }}>{comment_count}</Text>
                        </View>
                    </View>} />

            {/* <KeyboardAvoidingView style={{ width: "100%", alignItems: "center", justifyContent: "center", backgroundColor: " white" }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}>

                <TextInput style={{ color: "black", fontSize: 16, width: "100%", height: 50, borderWidth: 1, borderColor: "#707070", borderRadius: 17, paddingLeft: 20, marginVertical: 10, backgroundColor: "white" }}
                    placeholder="댓글을 입력하세요."
                    placeholderTextColor="#959595"
                    onChangeText={
                        text => setText(text)
                    } />


            </KeyboardAvoidingView> */}

        </View>

    )
};