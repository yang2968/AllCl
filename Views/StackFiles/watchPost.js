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
    Dimensions
} from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import useKeyboardHeight from 'react-native-use-keyboard-height';
import Color from "../../styles/Color"
import styles from "../../styles/style";

export default ({ navigation, route }) => {
    // 게시물 정보 추출
    const data = route.params;
    //console.log(data);
    const textInputPadding = Platform.OS === "ios" ? 15 : 10;

    const keyboardHeight = useKeyboardHeight();
    console.log(keyboardHeight);


    const [title, setTitle] = useState("");

    var testWidth = Dimensions.get("window").width;
    //console.log("ttt", testWidth);

    var testData = [
        {
            index: 0,
            name: "익명1",
            post_date: "03/31 16:20",
            content: '정말 유익한 정보에요!'
        },
        {
            index: 1,
            name: "익명2",
            post_date: "03/31 16:20",

            content: '정말 유익한 정보에요!',
        },
        {
            index: 2,
            name: "익명3",
            post_date: "03/31 16:20",
            content: '정말 유익한 정보에요!',
        },
        {
            index: 3,
            name: "익명4",
            post_date: "03/31",
            content: '정말 유익한 정보에요!',
        },
        {
            index: 4,
            name: "익명5",
            post_date: "03/31 16:20",
            content: '정말 유익한 정보에요!',
        },
        {
            index: 5,
            name: "익명6",
            post_date: "03/31 16:20",
            content: '정말 유익한 정보에요!',
        },
        {
            index: 6,
            name: "익명7",
            post_date: "03/31 16:20",
            content: '정말 유익한 정보에요!',
        },
        {
            index: 7,
            name: "익명8",
            post_date: "03/31 16:20",
            content: '정말 유익한 정보에요!',
        },
        {
            index: 8,
            name: "익명9",
            post_date: "03/31 16:20",
            content: '정말 유익한 정보에요!',
        },
    ];

    useEffect(() => {

    }, [])

    const renderItem = ({ item }) => {
        return (
            <View style={{ borderColor: "#DBD9D9", borderBottomWidth: 1, paddingTop: "3%", paddingBottom: "3%", justifyContent: "center" }}>
                {/* 익명 */}
                <View style={{ flexDirection: "row", paddingBottom: "3%", alignItems: "center" }}>
                    <View style={{ backgroundColor: Color.loginBackground, paddingVertical: 4, paddingHorizontal: 4, marginRight: 7, borderRadius: 5 }}>
                        <Icon
                            name={"user-o"}
                            size={20}
                            color={"white"} />
                    </View>

                    <Text style={{ color: 'black', fontSize: 15, fontWeight: "bold", textAlign: 'left' }}>{item.name}</Text>
                </View>
                {/* 댓글 내용 */}
                <Text style={{ color: 'black', fontSize: 12, textAlign: 'left', paddingBottom: "1%" }}
                    numberOfLines={1}
                    ellipsizeMode="tail">{item.content}</Text>
                {/* 시간 */}
                <Text style={{ color: 'gray', fontSize: 12, textAlign: 'left' }}>{item.post_date}</Text>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: "white", paddingLeft: "5%", paddingRight: "5%", paddingTop: "3%" }}>

            <FlatList
                data={testData}
                renderItem={renderItem}
                keyExtractor={item => item.index}
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
                                <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>익명</Text>
                                <Text style={{ color: "#AFAFAF", fontSize: 14 }}>03/31 11:55</Text>
                            </View>

                        </View>

                        {/* 제목  */}
                        <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>{data.title}</Text>
                        {/*  */}

                        {/* 내용  */}
                        <Text style={{ color: "black", fontSize: 15, paddingTop: "5%", paddingBottom: "5%" }}
                            ellipsizeMode="head">{data.content}</Text>
                        {/*  */}

                        <View style={{ width: "100%", flexDirection: "row", paddingBottom: "1%", borderBottomWidth: 1, borderColor: "#DBD9D9", alignItems: "center" }}>
                            {/* 좋아요 */}
                            <TouchableOpacity style={{ paddingLeft: 7, paddingRight: 7, paddingTop: 10, paddingBottom: 10, }}>
                                <Icon
                                    name={"heart"}
                                    size={18}
                                    color={"#B33938"} />
                            </TouchableOpacity>

                            <Text style={{ color: "black", fontSize: 15 }}>{data.like}</Text>

                            <View style={{ marginRight: 15 }} />

                            <View style={{ marginRight: 7 }}>
                                {/* 댓글  */}
                                <Icon
                                    name={"comment-o"}
                                    size={18}
                                    color={"black"} />
                            </View>
                            <Text style={{ color: "black", fontSize: 15 }}>{data.comment}</Text>
                        </View>
                    </View>} />

            <KeyboardAvoidingView style={{ width: "100%", alignItems: "center", justifyContent: "center", backgroundColor: " white" }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}>
                
                    <TextInput style={{ color: "black", fontSize: 16, width: "100%", height: 50, borderWidth: 1, borderColor: "#707070", borderRadius: 17, paddingLeft: 20, marginVertical: 10, backgroundColor: "white" }}
                        placeholder="댓글을 입력하세요."
                        placeholderTextColor="#959595"
                        onChangeText={
                            title => setTitle(title)
                        } />
     

            </KeyboardAvoidingView>

        </View>

    )
};