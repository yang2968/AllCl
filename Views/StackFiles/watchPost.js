import React, { useState, useEffect, useRef, useContext } from "react";
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
import { useRoute, StackActions, TabActions } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Icon3 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SimplePopupMenu from 'react-native-simple-popup-menu';
import AppContext from "../../AppContext";
import Color from "../../styles/Color"
import styles from "../../styles/style";
import API from "../../API/API";

export default ({ navigation, route }) => {
    const routeName = useRoute();
    const globalVariables = useContext(AppContext);
    globalVariables.setRouteName(routeName.name);
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
    // 답글 정보
    const [commentReplyData, setCommentReplyData] = useState([]);
    // 선택한 댓글 인덱스
    const [commentIndex, setCommentIndex] = useState(0);
    // 좋아요 눌렀는지 유무
    const [tabLike, setTabLike] = useState(0);
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
    const items2 = [
        { id: '삭제', label: '삭제' },
    ];
    // 사용자 닉네임 가져오기
    useEffect(() => {
        async function getId() {
            const getData = await AsyncStorage.getItem('userInfo', (err, result) => { });
            const userInfo = JSON.parse(getData);
            setUserNickname(userInfo.nickname);
            globalVariables.setNickname(userInfo.nickname);
        }
        getId();
    }, [])
    // 게시물 정보 조회
    useEffect(() => {
        async function getData() {
            
            // 선택한 게시물 정보 조회
            const postData = await API.watchPost(data.post_index);
            console.log(postData);
            globalVariables.setNickname(postData[0].nickname);
            setNickName(postData[0].nickname);
            setHeader(postData[0].header);
            setPostDate(postData[0].post_date);
            setBody(postData[0].body);
            setLikeCount(postData[0].like_count);
            setCommentCount(postData[0].comment_count);
            setTabLike(data.isLike);
            
            globalVariables.setRouteName(routeName.name);
            globalVariables.setPostIndex(data.post_index);
            globalVariables.setHeader(postData[0].header);
            globalVariables.setBody(postData[0].body);

            // 선택한 게시물 댓글 정보 조회
            if (data.comment_count != 0) {
                const postCommentReplyData = await API.watchReply(data.post_index); // 답글
                // console.log(postCommentReplyData);
                setCommentReplyData(postCommentReplyData);

                const postCommentData = await API.watchComment(data.post_index); // 댓글
                // console.log(postCommentData);
                setCommentData(postCommentData);
            }

        }
        getData();
    }, [])
    // 좋아요 판별 여부
    useEffect(() => {
        async function getLike() {
            // const postData2 = await API.watchPost(data.post_index);
            // console.log("111", postData2);
            // setTabLike(postData2[0].isLike);
        }
        getLike();
    }, [tabLike])


    // 댓글
    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.watchPostItemView}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ justifyContent: "center" }}>
                        {/* 익명 */}
                        <View style={styles.watchPostItemHeader}>
                            <View style={styles.watchPostItemHeader2}>
                                <Icon
                                    name={"user-o"}
                                    size={20}
                                    color={"white"} />
                            </View>

                            <Text style={styles.watchPostItemHeaderText}>{item.nickname}</Text>
                        </View>
                        {/* 댓글 내용 */}
                        <Text style={styles.watchPostItemBodyText}
                            numberOfLines={1}
                            ellipsizeMode="tail">{item.comment}</Text>
                        {/* 시간 */}
                        <Text style={styles.watchPostItemTimeText}>{item.record_time}</Text>
                    </View>

                    {
                        item.nickname == userNickname ? // 댓글의 닉네임과 사용자의 닉네임 비교
                            <View style={styles.watchPostItemView2}>
                                <TouchableOpacity style={{ padding: 5, marginRight: 5 }}
                                    onPress={async () => {
                                        console.log(data.post_index);
                                        console.log(nickName);
                                        console.log(item.comment_index);
                                    
                                        const writeReply = await API.writeReply(nickName, data.post_index, item.comment_index, "답글입니다!");
                                        console.log("답글 생성", writeReply);
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
                            :
                            <View />

                    }



                </View>
                {/* 답글 */}


                {/* 답글 */}
            
            </View>
        );
    };

    return (
        <View style={styles.watchPostView}>

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
                    <View>
                        <View style={styles.watchPostHeaderView}>
                            <View style={styles.watchPostHeaderView2}>
                                <Icon
                                    name={"user-o"}
                                    size={25}
                                    color={"white"} />
                            </View>

                            <View style={{ justifyContent: "center", marginLeft: 15 }}>
                                <Text style={styles.watchPostNicknameText}>{nickName}</Text>
                                <Text style={styles.watchPostTimeText}>{post_date}</Text>
                            </View>

                        </View>

                        {/* 제목  */}
                        <Text style={styles.watchPostHeaderText}>{header}</Text>
                        {/*  */}

                        {/* 내용  */}
                        <Text style={styles.watchPostBodyText}
                            ellipsizeMode="head">{body}</Text>
                        {/*  */}

                        <View style={styles.watchPostSettingView}>
                            {/* 좋아요 */}
                            <TouchableOpacity style={{ paddingLeft: 7, paddingRight: 7, paddingTop: 10, paddingBottom: 10, }}
                                onPress={async () => {
                                    const setLike = await API.tabLike(nickName, data.post_index);
                                    console.log(setLike[0]);
                                    console.log(tabLike);
                                    if (setLike[0] == 200) {
                                        //setLikeCount(like_count);
                                        setTabLike(1);
                                    } else {
                                        //setLikeCount(like_count);
                                        setTabLike(0);
                                    }
                                }}>
                                {
                                    tabLike == 1 ?
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

            <KeyboardAvoidingView style={styles.watchPostKeyBoardView}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 65 : 0}>

                <TextInput style={styles.watchPostTextInput}
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