import React, { useState, useEffect, useContext, useRef } from "react";
import {
    StatusBar,
    Alert,
    View,
    SafeAreaView,
    Text,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    TextInput,
    TouchableOpacity,
    FlatList,
    Dimensions,
    ActionSheetIOS
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SimplePopupMenu from 'react-native-simple-popup-menu';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import styles from "../../styles/style";
import Color from "../../styles/Color";
import API from "../../API/API";
import AppContext from "../../AppContext";

export default ({ navigation, route }) => {
    const globalVariables = useContext(AppContext);
    const data = route.params;
    //console.log(data);
  // 게시판 페이지가 포커싱될 떄마다 서버에 요청
    // console.log(globalVariables);
    // console.log(data);

   // 안드로이드 메뉴 아이템
   const items = [
    { id: '삭제', label: '삭제' },
];

    const [userNickname, setUserNickname] = useState("");
    const [userIndex, setUserIndex] = useState(3);
    const [userRouteClear, setUserRouteClear] = useState(0);
    const [userRouteLike, setUserRouteLike] = useState(0);
    const [routeInfo, setRouteInfo] = useState([{
        "route_index": 0,
        "location_index": 0,
        "route_name": " ",
        "bolt_count": "0",
        "difficulty": "0",
        "isImage": 0,
        "like_count": "0",
        "isLike": 0,
        "isClear": 0
    }]);
    const [text, setText] = useState("");
    const [placeholderText, setPlaceholderText] = useState("댓글을 입력하세요.");
    const [routeComments, setRouteComments] = useState([
        {
            "idx": 1,
            "nickname": "귀요미준호",
            "comment": "넘모 쉬웡~",
            "record_time": "2022-05-16 21:31:26"
          },
    ]);

    async function getRouteData() {
        const routeData = await API.getRouteInfo(data.location_index, userIndex);
       
        var selectedRoute = [];
        for(var i=0;i<routeData.length;i++) {
            if(routeData[i].route_index == data.route_index) {
                selectedRoute.push(routeData[i])
            }
        }
        //console.log("루트 정보", selectedRoute);
        return selectedRoute;
    }
    var imageHeight = Dimensions.get("window").height;
    //[{"comment": "댓글댓글", "comment_index": 3, "is_modified": 1, "nickname": "젠장재원", "post_index": 2, "record_time": "2022-04-28 18:22:31"}]

    useEffect(() => {
        globalVariables.setRouteName(data.location_name);
        async function getRouteInfo() {
            const getData = await AsyncStorage.getItem('userInfo', (err, result) => { });
            const userInfo = JSON.parse(getData);
            setUserNickname(userInfo.nickname);
            setUserIndex(userInfo.userIndex);
            setUserRouteClear(data.isClear);
            setUserRouteLike(data.isLike);
            const routeData = await getRouteData();
            setRouteInfo(routeData);

            const commentsData = await API.getRouteComments(data.route_index);
            console.log(commentsData);
           
            if (commentsData != 0) {
                setRouteComments(commentsData);
            } else {
                setRouteComments(0);
            }
        }
        getRouteInfo();
    }, []);

    const setClear = (isClear) => {
        if (isClear) {
            return ( <Icon
                name={"check"}
                size={19}
                color={"#96B684"} />)
        }
        else {
            return ( <Icon
                name={"check"}
                size={19}
                color={"#B73D3A"} />)
        }
    };

    const setLike = (isLike) => {
        if (isLike) {
            return (<Icon
                name={"heart"}
                size={15}
                color={"#B33938"} />)
        }
        else {
            return (<Icon
                name={"heart-o"}
                size={15}
                color={"#B33938"} />)
        }
    };

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

                        <Text style={{ color: 'white', fontSize: 15, fontWeight: "bold", textAlign: 'left' }}>{item.nickname}</Text>
                    </View>
                    {/* 댓글 내용 */}
                    <Text style={{ color: 'white', fontSize: 12, textAlign: 'left', marginVertical: "2%" }}
                        numberOfLines={1}
                        ellipsizeMode="tail">{item.comment}</Text>
                    {/* 시간 */}
                    <Text style={{ color: 'white', fontSize: 12, textAlign: 'left' }}>{item.record_time}</Text>
                </View>

                {
                        item.nickname === userNickname ? // 댓글의 닉네임과 사용자의 닉네임 비교
                            <View style={styles.watchPostItemView2}>
                                {
                                    Platform.OS === "android" ?
                                        <SimplePopupMenu
                                            items={items}
                                            style={{ padding: 5, marginRight: 5  }}
                                            onSelect={async (item2) => {
                                              if (item2.label == "삭제") {
                                                Alert.alert("알림", "댓글을 삭제하시겠습니까?", [
                                                    {
                                                        text: "취소"
                                                    }, {
                                                        text: "확인",
                                                        onPress: async () => {
                                                            const deleteComment = await API.deleteRouteComment(item.idx);
                                                            if (deleteComment[0] == 200) {
                                                                const commentsData = await API.getRouteComments(data.route_index);
                                                                setRouteComments(commentsData);
                                                                setText("");
                                                                
                                                            } else {
                                                                Alert.alert("알림", "에러가 발생하였습니다.");
                                                            }
                                                        }
                                                    }
                                                ])
                                                }
                                            }}>
                                            <Icon2
                                                name={"ellipsis-horizontal-sharp"}
                                                size={20}
                                                color={"white"} />
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
                                                        } else if (buttonIndex === 1) { // 삭제
                                                            Alert.alert("알림", "댓글을 삭제하시겠습니까?", [
                                                                {
                                                                    text: "취소"
                                                                }, {
                                                                    text: "확인",
                                                                    onPress: async () => {
                                                                        const deleteComment = await API.deleteRouteComment(item.idx);
                                                                        if (deleteComment[0] == 200) {
                                                                            const commentsData = await API.getRouteComments(data.route_index);
                                                                            setRouteComments(commentsData);
                                                                            setText("");
                                                                            
                                                                        } else {
                                                                            Alert.alert("알림", "에러가 발생하였습니다.");
                                                                        }
                                                                    }
                                                                }
                                                            ])
                                                        } 
                                                    }
                                                )
                                            }}>
                                            <Icon2
                                                name={"ellipsis-vertical"}
                                                size={15}
                                                color={"white"} />
                                        </TouchableOpacity>
                                }
                            </View>
                            :
                            <></>
                    }


            </View>
        );
    };

    return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
                <StatusBar barStyle={"light-content"}
                    backgroundColor="transparent"
                    translucent={true} />

                <FlatList
                    data={routeComments}
                    renderItem={renderItem}
                    keyExtractor={item => item.idx}
                    disableVirtualization={true}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View style={{ flex: 1, marginBottom: "2%" }}>

                            <View style={{ flexDirection: "row", alignSelf: "center", justifyContent: 'space-between', width: '90%', paddingTop: "2%", paddingBottom: "5%" }}>

                                <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>{(data.index+1) + ". " + routeInfo[0].route_name}</Text>

                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>

                                    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between', marginRight: 10 }}
                                    onPress={async ()=>{
                                        console.log("1");
                                        const getClear = await API.routeClear(routeInfo[0].route_index, userIndex);
                                        switch (getClear[0]) {
                                            case 201:
                                                const routeData = await getRouteData();
                                                setRouteInfo(routeData);
                                                setUserRouteClear(1);
                                                break;
                                            case 200:
                                                const routeData2 = await getRouteData();
                                                setRouteInfo(routeData2);
                                                setUserRouteClear(0);
                                                break;
                                            default:
                                                Alert.alert("알림", "에러가 발생하였습니다.", [
                                                    {
                                                        text: "확인"
                                                    }
                                                ])
                                                break;
                                        }
                                    }}>
                                            { setClear(userRouteClear) }

                                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 15, marginLeft: 5, marginRight: 10 }}>{routeInfo[0].difficulty}</Text>
                                    </TouchableOpacity>


                                    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between', marginRight: 10 }}
                                    onPress={async ()=>{
                                        console.log("2");
                                        const getLike = await API.routeLike(userNickname, routeInfo[0].route_index);
                                        switch (getLike[0]) {
                                            case 201:
                                                const routeData = await getRouteData();     
                                                setRouteInfo(routeData);
                                                setUserRouteLike(1);
                                                break;
                                            case 200:
                                                const routeData2 = await getRouteData();
                                                setRouteInfo(routeData2);
                                                setUserRouteLike(0);
                                                break;
                                            default:
                                                Alert.alert("알림", "에러가 발생하였습니다.", [
                                                    {
                                                        text: "확인"
                                                    }
                                                ])
                                                break;
                                        }
                                    }}>
                                        { setLike(userRouteLike)}

                                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 15, marginLeft: 5 }}>{routeInfo[0].like_count}</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>


                           <View style={{ backgroundColor: "white", width: "90%", height: imageHeight/2.4, alignItems: "center", justifyContent: "center", borderRadius: 25, marginHorizontal: "5%" }}>
                               <Text style={{ color: "black", fontWeight: "bold", fontSize: 20 }}>루트 사진</Text>
                           </View>
                        </View>
                    } />


            <KeyboardAvoidingView style={styles.watchPostKeyBoardView}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 65 : 0}>

                <TextInput style={styles.watchPostTextInput}
                    placeholder={placeholderText}
                    placeholderTextColor="#959595"
                    value={text}
                    onChangeText={
                        text => setText(text)
                    }
                    onSubmitEditing={async () => {
                        const writeComment = await API.writeRouteComment(routeInfo[0].route_index, userNickname, text);
                        console.log(writeComment);
                                if (writeComment[0] == 201) {
                                    const commentsData = await API.getRouteComments(data.route_index);
                                    console.log(commentsData);
                                    setRouteComments(commentsData);
                                    setText("");
                                    
                                } else {
                                    Alert.alert("알림", "에러가 발생하였습니다.");
                                }
                    }} />
            </KeyboardAvoidingView>

            </SafeAreaView>

        // </TouchableWithoutFeedback>
    )
};
