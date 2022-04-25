import React, { useState, useEffect } from "react";
import {
    View,
    SafeAreaView,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
    TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Icon3 from 'react-native-vector-icons/dist/SimpleLineIcons';
import styles from "../../styles/style";
import Color from "../../styles/Color";

export default ({ navigation }) => {
    // 
    const [text, setText] = useState("");
    const [result, setResult] = useState(0);
    //s
    const [searchMode, setSearchMode] = useState(0);

    useEffect(() => {

    }, [])

    return (
        // <TouchableWithoutFeedback
        //     style={{ flex: 1 }}
        //     onPress={Keyboard.dismiss}>

        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>

            <View style={{ flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "center" }}>

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
                        // 엔터키 입력
                        onSubmitEditing={()=>{
                            console.log("엔터키 입력");
                        }}/>
                </SafeAreaView>

                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    <Text style={{ color: "black", fontSize: 15, fontWeight: "bold" }}>취소</Text>
                </TouchableOpacity>
            </View>


            {
                text.length != 0 ?
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <Icon3
                            name={"exclamation"}
                            size={140}
                            color={Color.loginBackground} />

                        <Text style={{ color: "black", fontSize: 15, fontWeight: "bold", margin: "7%" }}>검색 결과가 없습니다.</Text>


                    </View>

                    :

                    <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
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
            }









        </SafeAreaView>

        // </TouchableWithoutFeedback>
    )
};