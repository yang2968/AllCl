import React, { useState, useEffect } from "react";
import {
    View,
    SafeAreaView,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
    TouchableOpacity,
    FlatList,
} from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Icon3 from 'react-native-vector-icons/dist/SimpleLineIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../../styles/style";
import Color from "../../styles/Color";
import API from "../../API/API";

export default ({ navigation }) => {
    // 
    const [text, setText] = useState("");
    const [result, setResult] = useState(0);
    //s
    const [searchMode, setSearchMode] = useState(0);
    const [submitEditing, setSubmitEditing] = useState(false);

    const [searchedData, setSearchedData] = useState([]);

    useEffect(() => {
        async function getId() {
            const getData = await AsyncStorage.getItem('userInfo', (err, result) => { });
            const userInfo = JSON.parse(getData);
            console.log(userInfo.nickname);
        }
        getId();
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
        <TouchableWithoutFeedback
            style={{ flex: 1 }}
            onPress={Keyboard.dismiss}>

            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>

                <View style={{ flexDirection: "row", width: "90%", alignItems: "center", justifyContent: "center", marginHorizontal: "5%", marginTop: 10, marginBottom: 10 }}>

                    <SafeAreaView style={styles.boardSearchView2}>
                        {/* Search Text */}
                        <TouchableOpacity style={styles.boardSearch2}
                            onPress={() => {
                                switch (searchMode) {
                                    case 0:
                                        setSearchMode(1);
                                        break;
                                    case 1:
                                        setSearchMode(0);
                                        break;
                                }
                            }}>
                            <Icon
                                name={"search"}
                                size={25}
                                color={Color.loginBackground} />
                        </TouchableOpacity>
                        <TextInput style={styles.boardSearchTextInput2}
                            placeholder={searchMode === 0 ? "제목 + 내용 검색" : "작성자 검색"}
                            placeholderTextColor="#9D9D9D"
                            onChangeText={
                                text => setText(text)
                            }
                            onFocus={() => {
                                setSubmitEditing(false);
                                console.log(submitEditing);
                            }}
                            // 엔터키 입력
                            onSubmitEditing={async () => {
                                console.log("입력한 텍스트 : ", text);
                                switch (searchMode) {
                                    case 0: // 제목 + 내용
                                        console.log("제목 + 내용 : ", searchMode);
                                        const searchContent = await API.searchContent(text);
                                        console.log(searchContent);
                                        setSearchedData(searchContent);
                                        setSubmitEditing(true);
                                        break;
                                    case 1: // 작성자
                                        console.log("작성자 : ", searchMode);
                                        const searchNickname = await API.searchNickname(text);
                                        console.log(searchNickname);
                                        setSearchedData(searchNickname);
                                        setSubmitEditing(true);
                                        break;
                                    default: // 에러
                                        break;
                                }
                            }} />
                    </SafeAreaView>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}>
                        <Text style={{ color: "black", fontSize: 15, fontWeight: "bold" }}>취소</Text>
                    </TouchableOpacity>
                </View>


                {
                    submitEditing == true ? // 엔터키 입력 유무
                        (
                            searchedData != 0 ? // 검색 결과 유무
                                <View style={{ flex: 1, paddingHorizontal: "5%" }}>
                                    <FlatList
                                        data={searchedData}
                                        renderItem={renderItem}
                                        keyExtractor={item => item.post_index}
                                        disableVirtualization={true}
                                        showsVerticalScrollIndicator={false} />
                                </View>
                                :
                                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                    <Icon3
                                        name={"exclamation"}
                                        size={140}
                                        color={Color.loginBackground} />

                                    <Text style={{ color: "black", fontSize: 15, fontWeight: "bold", margin: "7%" }}>검색 결과가 없습니다.</Text>
                                </View>
                        )
                        :
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <TouchableOpacity style={{ alignItems: "center", justifyContent: "center" }}
                                onPress={() => {
                                    switch (searchMode) {
                                        case 0:
                                            setSearchMode(1);
                                            break;
                                        case 1:
                                            setSearchMode(0);
                                            break;
                                    }
                                }}>
                                <Icon2
                                    name={"search-outline"}
                                    size={150}
                                    color={Color.loginBackground} />

                                {
                                    searchMode === 0 ?
                                        <Text style={{ color: "#A3A3A3", fontSize: 15, fontWeight: "bold" }}>제목 + 내용으로 게시글을 검색합니다.</Text>
                                        :
                                        <Text style={{ color: "#A3A3A3", fontSize: 15, fontWeight: "bold" }}>작성자로 게시글을 검색합니다.</Text>

                                }
                            </TouchableOpacity>
                        </View>
                }
            </SafeAreaView>

        </TouchableWithoutFeedback>
    )
};