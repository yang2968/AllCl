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
    Image,
    Modal,
    ActionSheetIOS
} from "react-native";
import { useRoute, StackActions, TabActions } from "@react-navigation/native";
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Icon3 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/dist/Fontisto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SimplePopupMenu from 'react-native-simple-popup-menu';
import AppContext from "../../AppContext";
import Color from "../../styles/Color"
import styles from "../../styles/style";
import API from "../../API/API";

export default ({ navigation, route }) => {
    const routeName = useRoute();
    const globalVariables = useContext(AppContext);
    // 게시물 인덱스 받아오기
    const data = route.params;
    // user
    const [userNickname, setUserNickname] = useState("");
    // 게시물 정보
    const [nickName, setNickName] = useState("");
    const [header, setHeader] = useState("");
    const [body, setBody] = useState("");
    const [like_count, setLikeCount] = useState("");
    const [comment_count, setCommentCount] = useState("");
    const [post_date, setPostDate] = useState("");
    // Image
    const [postImage, setPostImage] = useState([]);
    // 이미지 모달 표시 여부 변수
    const [imageModalVisible, setImageModalVisible] = useState(false);
    // 이미지 url을 담을 변수
    const [showImage, setShowImage] = useState("");
    // 이미지 높낮이 동적 설정 위한 변수
    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);
    const [ratio, setRatio] = useState(0);
    // 댓글 정보
    const [commentData, setCommentData] = useState([]);
    // 답글 정보
    const [commentReplyData, setCommentReplyData] = useState([]);
    const [commentReplyData2, setCommentReplyData2] = useState([]);
    // 선택한 댓글 인덱스
    const [commentIndex, setCommentIndex] = useState(0);
    // 좋아요 눌렀는지 유무
    const [tabLike, setTabLike] = useState(0);
    // 댓글 입력 변수
    const [text, setText] = useState("");
    const [placeholderText, setPlaceholderText] = useState("댓글을 입력하세요.");
    const [writeMode, setWriteMode] = useState(0); // 0 : 댓글, 1 : 수정할 댓글, 2: 답글
    const [refresh, setRefresh] = useState(false);


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
    const mainURL = "http://13.209.75.70:8080";
    // 사용자 닉네임 가져오기
    useEffect(() => {
        const dimensions = Dimensions.get('window');
        const imageWidth = dimensions.width;
        const imageHeight = Math.round(dimensions.height);
        setImageWidth(imageWidth);
        setImageHeight(imageHeight / 2);
        setRatio(imageWidth / 541);
    }, [])
    // 게시물 정보 조회
    useEffect(() => {
        async function getData() {
            const getData = await AsyncStorage.getItem('userInfo', (err, result) => { });
            const userInfo = JSON.parse(getData);
            // 선택한 게시물 정보 조회
            const postData = await API.watchPost(data.post_index, userInfo.nickname);
            console.log("게시물 정보", postData[0]);
            globalVariables.setNickname(userInfo.nickname);
            globalVariables.setRouteName(routeName.name);
            globalVariables.setPostIndex(data.post_index);
            globalVariables.setHeader(postData[0].header);
            globalVariables.setBody(postData[0].body);
            globalVariables.setNickname(postData[0].nickname);
            setUserNickname(userInfo.nickname);
            setNickName(postData[0].nickname);
            setHeader(postData[0].header);
            setPostDate(postData[0].post_date);
            setBody(postData[0].body);
            setLikeCount(postData[0].like_count);
            setCommentCount(postData[0].comment_count);
            setTabLike(postData[0].isLike);

            // 게시물의 이미지가 있다면 이미지 조회
            if (postData[0].isImage != 0) {
                const postImageData = await API.getPostImage(data.post_index);
                setPostImage(postImageData);
                console.log(postImageData);
            }

            // 선택한 게시물 댓글 정보 조회
            if (data.comment_count != 0) {
                const postCommentReplyData = await API.watchReply(data.post_index); // 답글
                //console.log("답글 정보", postCommentReplyData);
                setCommentReplyData(postCommentReplyData);

                const postCommentData = await API.watchComment(data.post_index); // 댓글
                //console.log("댓글 정보", postCommentData);
                setCommentData(postCommentData);
            }

        }
        getData();
    }, [])
    // 좋아요 판별 여부
    // useEffect(() => {
    //     async function getLike() {
    //         const postData2 = await API.watchPost(data.post_index);
    //         console.log("like", postData2);
    //         setLikeCount(postData2[0].like_count);
    //     }
    //     getLike();
    // }, [tabLike])

    const getImageSize = (showImage) => {
        Image.getSize(showImage, (width, height) => {
           // console.log("123123 : : ", width, height);
        })
    }




    // useEffect(() => {
    //     async function test() {
    //         console.log("test");
    //     }
    //     test();
    // }, [showImage])


    const renderImage = ({ item }) => {
        // console.log(item);
        getImageSize(mainURL + item.path)
        return (
            <TouchableOpacity onPress={() => {
                setShowImage(mainURL + item.path)
                // getImageSize(showImage)
                setImageModalVisible(true);
            }}>
                <Image style={{ width: 250, height: 250, backgroundColor: "white" }}
                    resizeMode="contain"
                    source={{ uri: mainURL + item.path }}
                />
            </TouchableOpacity>
        )
    }
    // 답글
    const commentReply = (comment_index) => {
        var postCommentReplyData = [];
        if (commentReplyData != 0) {
            for (var i = 0; i < commentReplyData.length; i++) {
                // comment_index가 같은 답글 데이터 합치기
                if (commentReplyData[i].comment_index == comment_index) {
                    postCommentReplyData.push(commentReplyData[i]);
                }
            }
            // 답글 출력
            return (
                <FlatList
                    data={postCommentReplyData}
                    renderItem={renderItem2}
                    keyExtractor={item => item.idx}
                    disableVirtualization={true}
                    showsVerticalScrollIndicator={false} />
            )
        }
    }
    // 답글 ui setting
    const renderItem2 = ({ item }) => {
        //setCommentReplyData2({...commentReplyData2}, [item]);
        return (
            /// 여기에 답글 UI 넣기
            <View style={{ flexDirection: "row", marginTop: "3%" }}>
                <Icon3
                    name={"subdirectory-arrow-right"}
                    size={20}
                    color={"#656565"} />

                <View style={{ flexDirection: "row", borderRadius: 15, backgroundColor: "#DDDADA", flex: 1, paddingLeft: "5%", paddingRight: "3%", paddingVertical: "2%" }}>
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
                            ellipsizeMode="tail">{item.reply}</Text>
                        {/* 시간 */}
                        <Text style={styles.watchPostItemTimeText}>{item.record_time}</Text>
                    </View>

                    {
                        item.nickname == userNickname ? // 답글의 닉네임과 사용자의 닉네임 비교
                            <View style={styles.watchPostItemView2}>

                                {
                                    Platform.OS === "android" ?
                                        <SimplePopupMenu
                                            items={items2}
                                            style={{ padding: 5 }}
                                            onSelect={async (item3) => {
                                                if (item3.label == "삭제") { // 답글 삭제
                                                    const deleteCommentReply = await API.deleteCommentReply(data.post_index, item.idx);
                                                    console.log(deleteCommentReply);
                                                    switch (deleteCommentReply[0]) {
                                                        case 200: case 201:
                                                            const postCommentReplyData = await API.watchReply(data.post_index);
                                                            const postCommentData = await API.watchComment(data.post_index);
                                                            const postData = await API.watchPost(data.post_index);
                                                            setCommentReplyData(postCommentReplyData);
                                                            setCommentData(postCommentData);
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
                                                        options: ["취소", "삭제"],
                                                        cancelButtonIndex: 0,
                                                        userInterfaceStyle: 'dark'
                                                    },
                                                    async (buttonIndex) => {
                                                        if (buttonIndex === 0) { // 취소
                                                        } else if (buttonIndex === 1) {  // 삭제

                                                            const deleteCommentReply = await API.deleteCommentReply(data.post_index, item.idx);
                                                            console.log(deleteCommentReply);
                                                            switch (deleteCommentReply[0]) {
                                                                case 200: case 201:
                                                                    const postCommentReplyData = await API.watchReply(data.post_index);
                                                                    console.log(postCommentReplyData);
                                                                    const postCommentData = await API.watchComment(data.post_index);
                                                                    const postData = await API.watchPost(data.post_index, userNickname);
                                                                    setCommentReplyData(postCommentReplyData);
                                                                    setCommentData(postCommentData);
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
            </View>
        )
    }

    const setLike = (tabLike) => {
        if (tabLike) {
            return (<Icon
                name={"heart"}
                size={20}
                color={"#B33938"} />)
        }
        else {
            return (<Icon
                name={"heart-o"}
                size={20}
                color={"#B33938"} />)
        }
    };

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
                        item.nickname === userNickname ? // 댓글의 닉네임과 사용자의 닉네임 비교
                            <View style={styles.watchPostItemView2}>
                                <TouchableOpacity style={{ padding: 5, marginRight: 5 }}
                                    onPress={async () => {
                                        console.log(commentReplyData2);
                                        Alert.alert("알림", "답글을 작성하시겠습니까?", [
                                            {
                                                text: "취소",
                                            },
                                            {
                                                text: "확인",
                                                onPress: () => {
                                                    setPlaceholderText("답글을 입력하세요.");
                                                    setWriteMode(2);
                                                    setCommentIndex(item.comment_index);
                                                }
                                            }
                                        ]);
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
                                                            const postData = await API.watchPost(data.post_index, userNickname);
                                                            setCommentData(postCommentData);
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
                                                                    const postData = await API.watchPost(data.post_index);
                                                                    setCommentData(postCommentData);
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
                            <View style={styles.watchPostItemView2}>
                                <TouchableOpacity style={{ padding: 5, marginRight: 5 }}
                                    onPress={async () => {
                                        Alert.alert("알림", "답글을 작성하시겠습니까?", [
                                            {
                                                text: "취소",
                                            },
                                            {
                                                text: "확인",
                                                onPress: () => {
                                                    setPlaceholderText("답글을 입력하세요.");
                                                    setWriteMode(2);
                                                    setCommentIndex(item.comment_index);
                                                }
                                            }
                                        ]);
                                    }}>
                                    <Icon
                                        name={"comment-o"}
                                        size={15}
                                        color={"black"} />

                                </TouchableOpacity>
                            </View>
                    }
                </View>
                {/* 답글 */}
                {commentReply(item.comment_index)}
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
                // onContentSizeChange={() => {
                //     if (writeMode == 0) flatList.scrollToEnd()
                // }}
                onRefresh={async () => {
                    setRefresh(true)
                    console.log("refresh");
                    // 선택한 게시물 정보 조회
                    const postData = await API.watchPost(data.post_index, userNickname);
                    console.log(postData[0]);
                    globalVariables.setNickname(postData[0].nickname);
                    setNickName(postData[0].nickname);
                    setHeader(postData[0].header);
                    setPostDate(postData[0].post_date);
                    setBody(postData[0].body);
                    setLikeCount(postData[0].like_count);
                    setCommentCount(postData[0].comment_count);
                    setTabLike(postData[0].isLike);

                    globalVariables.setRouteName(routeName.name);
                    globalVariables.setPostIndex(data.post_index);
                    globalVariables.setHeader(postData[0].header);
                    globalVariables.setBody(postData[0].body);

                    // 선택한 게시물 댓글 정보 조회
                    if (data.comment_count != 0) {
                        const postCommentReplyData = await API.watchReply(data.post_index); // 답글
                        // console.log("답글 정보", postCommentReplyData);
                        setCommentReplyData(postCommentReplyData);

                        const postCommentData = await API.watchComment(data.post_index); // 댓글
                        // console.log("댓글 정보", postCommentData);
                        setCommentData(postCommentData);
                    }
                    setRefresh(false);
                }}
                refreshing={refresh}
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


                        <FlatList
                            data={postImage}
                            renderItem={renderImage}
                            keyExtractor={item => item.image_index}
                            horizontal={true}
                            disableVirtualization={true}
                            showsHorizontalScrollIndicator={false} />

                        <View style={styles.watchPostSettingView}>
                            {/* 좋아요 */}
                            <TouchableOpacity style={{ paddingLeft: 7, paddingRight: 7, paddingTop: 10, paddingBottom: 10, }}
                                onPress={async () => {
                                    const setLike = await API.tabLike(userNickname, data.post_index);
                                    console.log(setLike);
                                    const postData2 = await API.watchPost(data.post_index, userNickname);
                                    console.log(postData2);

                                    if (setLike[0] == 200) {
                                        setTabLike(0);
                                        setLikeCount(postData2[0].like_count);
                                        // setLikeCount(like_count);
                                    } else {
                                        setTabLike(1);
                                        setLikeCount(postData2[0].like_count);
                                        //setLikeCount(like_count);
                                    }
                                }}>

                                {
                                    setLike(tabLike)
                                }
                                {/* {
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
                                } */}

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
                                const writeReply = await API.writeReply(userNickname, data.post_index, commentIndex, text);
                                console.log("222222", writeReply);
                                switch (writeReply[0]) {
                                    case 200: case 201:
                                        const postCommentData = await API.watchComment(data.post_index);
                                        console.log(postCommentData);

                                        const postData = await API.watchPost(data.post_index);
                                        setCommentData(postCommentData);
                                        setText("");
                                        setPlaceholderText("댓글을 입력하세요.");
                                        setWriteMode(0);
                                        setCommentCount(postData[0].comment_count);
                                        break;
                                }
                                break;
                            default:
                                break;
                        }
                    }} />
            </KeyboardAvoidingView>

            {/* 감지 알림의 이미지를 클릭했을 때 뜰 Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={imageModalVisible}
                onRequestClose={() => {
                    setImageModalVisible(!imageModalVisible);
                }}>
                <View style={{ width: '100%', height: "100%", backgroundColor: 'rgba(0,0,0,0.5)', alignContent: 'center' }}>
                    <View style={{ alignContent: 'center', justifyContent: 'center', flex: 1 }}>
                        <View style={{ alignSelf: 'center' }}>
                            <ImageViewer
                                imageUrls={[{
                                    url: showImage,
                                    width: imageWidth,
                                    height: 362 * ratio,
                                }]}

                                style={{ width: imageWidth, resizeMode: "cover" }}
                                backgroundColor='rgba(0,0,0,0.0)'
                                // 이미지 개수 표시
                                renderIndicator={() => null}
                            />
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    style={{ alignSelf: 'flex-end', padding: '3%', position: "absolute", marginTop: 20, }}
                    onPress={() => {
                        setImageModalVisible(false)
                    }}>
                    <Icon4
                        name={"close-a"}
                        size={20}
                        color={"#ffffff"} />
                </TouchableOpacity>



            </Modal>

        </View>
    )
};
