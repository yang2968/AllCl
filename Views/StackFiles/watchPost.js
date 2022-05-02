import React, { useState, useEffect, useRef } from "react";
import {
    Alert,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import SimplePopupMenu from 'react-native-simple-popup-menu';
import Color from "../../styles/Color"
import styles from "../../styles/style";
import API from "../../API/API";

export default ({ navigation, route }) => {
    // 게시물 인덱스 받아오기
    const data = route.params;
    // 게시물 정보
    const [userNickname, setUserNickname] = useState("");
    const [nickName, setNickName] = useState("");
    const [header, setHeader] = useState("");
    const [body, setBody] = useState("");
    const [like_count, setLikeCount] = useState("");
    const [comment_count, setCommentCount] = useState("");
    const [post_date, setPostDate] = useState("");
    // 댓글 정보
    const [commentData, setCommentData] = useState([]);
    // 선택한 댓글 인덱스
    const [commentIndex, setCommentIndex] = useState(0);
    // 좋아요 눌렀는지 유무
    const [tabLike, setTabLike] = useState(false);
    // 댓글 입력 변수
    const [text, setText] = useState("");
    const [placeholderText, setPlaceholderText] = useState("댓글을 입력하세요.");
    const [writeMode, setWriteMode] = useState(0); // 0 : 댓글, 1 : 수정할 댓글, 2: 답글
    // FlatList ref
    var flatList = useRef();
    // TextInput ref
    var textInput = useRef();
    // 안드로이드 메뉴 아이템
    const items = [
        { id: '수정', label: '수정' },
        { id: '삭제', label: '삭제' },
    ];

    useEffect(() => {
        async function getId() {
            const getData = await AsyncStorage.getItem('userInfo', (err, result) => { });
            const userInfo = JSON.parse(getData);
            setUserNickname(userInfo.nickname);
        }
        getId();
    }, [])

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
            if (data.comment_count != 0) {
                const postCommentData = await API.watchComment(data.post_index);
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
                    {
                        Platform.OS === "android" ?
                            <SimplePopupMenu
                                items={items}
                                style={{ padding: 5 }}
                                onSelect={async (item3) => {
                                    if (item3.label == "수정") {
                                        setPlaceholderText("수정할 댓글을 입력하세요.");
                                        setWriteMode(1);
                                        setCommentIndex(item.comment_index);

                                    } else if (item3.label == "삭제") {
                                        const deleteComment = await API.deleteComment(data.post_index, item.comment_index);
                                        console.log(deleteComment);
                                        switch (deleteComment[0]) {
                                            case 200: case 201:
                                                const postCommentData = await API.watchComment(data.post_index);
                                                setCommentData(postCommentData);
                                                const postData = await API.watchPost(data.post_index);
                                                setCommentCount(postData[0].comment_count);
                                                break;
                                            default:
                                                Alert.alert("알림", "에러가 발생하였습니다.");
                                                break;
                                        }
                                    }
                                }}>
                                <Icon2
                                    name={"ellipsis-horizontal-sharp"}
                                    size={20}
                                    color={"black"} />
                            </SimplePopupMenu>
                            :
                            <TouchableOpacity style={{ padding: 5 }}
                                onPress={() => {
                                    ActionSheetIOS.showActionSheetWithOptions(
                                        {
                                            title: "게시판 메뉴",
                                            options: ["취소", "수정", "삭제"],
                                            cancelButtonIndex: 0,
                                            userInterfaceStyle: 'dark'
                                        },
                                        async (buttonIndex) => {
                                            if (buttonIndex === 0) { // 취소
                                            } else if (buttonIndex === 1) { // 수정   수정을 누르면 댓글입력칸이 수정할 댓글을 입력하세요로 변경 텍스트 입력 후 댓글 수정
                                                setPlaceholderText("수정할 댓글을 입력하세요.");
                                                setWriteMode(1);
                                                setCommentIndex(item.comment_index);
                                            } else if (buttonIndex === 2) {  // 삭제

                                                const deleteComment = await API.deleteComment(data.post_index, item.comment_index);
                                                switch (deleteComment[0]) {
                                                    case 200: case 201:
                                                        const postCommentData = await API.watchComment(data.post_index);
                                                        setCommentData(postCommentData);
                                                        const postData = await API.watchPost(data.post_index);
                                                        setCommentCount(postData[0].comment_count);
                                                        break;
                                                    default:
                                                        Alert.alert("알림", "에러가 발생하였습니다.");
                                                        break;
                                                }

                                            }
                                        }
                                    )
                                }}>
                                <Icon2
                                    name={"ellipsis-vertical"}
                                    size={15}
                                    color={"black"} />
                            </TouchableOpacity>
                    }
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
                ref={ref => flatList = ref}
                //onLayout={() => flatList.scrollToEnd({ animated: true })}
                //onContentSizeChange={() => flatList.scrollToEnd(console.log("1"))}
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
                                    if (setLike == 200) {
                                        setLikeCount(like_count);
                                        setTabLike(false);
                                    } else {
                                        setLikeCount(like_count);
                                        setTabLike(true);
                                    }
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

            <KeyboardAvoidingView style={{ width: "100%", alignItems: "center", justifyContent: "center", backgroundColor: " white" }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 65 : 0}>

                <TextInput style={{ color: "black", fontSize: 16, width: "100%", height: 50, borderWidth: 1, borderColor: "#707070", borderRadius: 17, paddingLeft: 20, marginVertical: 10, backgroundColor: "white" }}
                    ref={ref => textInput = ref}
                    placeholder={placeholderText}
                    placeholderTextColor="#959595"
                    value={text}
                    onChangeText={
                        text => setText(text)
                    }
                    onSubmitEditing={async () => {
                        switch (writeMode) {
                            case 0: // 댓글
                                const writeComment = await API.writeComment(userNickname, text, data.post_index);
                                if (writeComment[0] == 201) {
                                    const postCommentData = await API.watchComment(data.post_index);
                                    setCommentData(postCommentData);
                                    setText("");
                                    const postData = await API.watchPost(data.post_index);
                                    setCommentCount(postData[0].comment_count);
                                } else {
                                    Alert.alert("알림", "에러가 발생하였습니다.");
                                }
                                break;
                            case 1: // 수정할 댓글
                                const modifyComment = await API.modifyComment(text, commentIndex);
                                switch (modifyComment[0]) {
                                    case 200: case 201:
                                        //
                                        // 
                                        const postCommentData = await API.watchComment(data.post_index);
                                        setCommentData(postCommentData);
                                        setText("");
                                        setPlaceholderText("댓글을 입력하세요.");
                                        setWriteMode(0);
                                        const postData = await API.watchPost(data.post_index);
                                        setCommentCount(postData[0].comment_count);
                                        break;
                                }
                                break;
                            case 2: // 답글
                                break;
                            default:
                                break;
                        }
                        // test

                    }} />
            </KeyboardAvoidingView>

        </View>
    )
};