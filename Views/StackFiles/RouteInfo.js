import React, { useState, useEffect, useContext } from "react";
import {
    StatusBar,
    View,
    SafeAreaView,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
    TouchableOpacity,
    FlatList,
    Dimensions
} from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import styles from "../../styles/style";
import Color from "../../styles/Color";
import API from "../../API/API";
import AppContext from "../../AppContext";

export default ({ navigation, route }) => {
    const globalVariables = useContext(AppContext);
    const data = route.params;
    // console.log(globalVariables);
    // console.log(data);

    const [routeComments, setRouteComments] = useState([
        {
            post_index: 2,
            comment_index: 0,
            comment: "Test Comment",
            nickname: "젠장재원",
            is_modified: 1,
            record_time: "2022-04-28 18:22:31",
        },
        {
            post_index: 2,
            comment_index: 1,
            comment: "Test Comment",
            nickname: "젠장재원",
            is_modified: 1,
            record_time: "2022-04-28 18:22:31",
        },
        {
            post_index: 2,
            comment_index: 2,
            comment: "Test Comment",
            nickname: "젠장재원",
            is_modified: 1,
            record_time: "2022-04-28 18:22:31",
        },
        {
            post_index: 2,
            comment_index: 3,
            comment: "Test Comment",
            nickname: "젠장재원",
            is_modified: 1,
            record_time: "2022-04-28 18:22:31",
        },
        {
            post_index: 2,
            comment_index: 4,
            comment: "Test Comment",
            nickname: "젠장재원",
            is_modified: 1,
            record_time: "2022-04-28 18:22:31",
        },
    ]);
    var imageHeight = Dimensions.get("window").height;
    //[{"comment": "댓글댓글", "comment_index": 3, "is_modified": 1, "nickname": "젠장재원", "post_index": 2, "record_time": "2022-04-28 18:22:31"}]

    useEffect(() => {
        globalVariables.setRouteName(data.location_name);
    }, []);

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


            </View>
        );
    };

    return (
        // <TouchableWithoutFeedback
        //     style={{ flex: 1 }}
        //     onPress={Keyboard.dismiss}>

            <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
                <StatusBar barStyle={"light-content"}
                    backgroundColor="transparent"
                    translucent={true} />

                <FlatList
                    data={routeComments}
                    renderItem={renderItem}
                    keyExtractor={item => item.comment_index}
                    disableVirtualization={true}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View style={{ flex: 1, marginBottom: "2%" }}>

                            <View style={{ flexDirection: "row", alignSelf: "center", justifyContent: 'space-between', width: '90%', paddingTop: "2%", paddingBottom: "5%" }}>

                                <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>{data.route_index + ". " + data.route_name}</Text>

                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>

                                    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between', marginRight: 10 }}>
                                        <Icon
                                            name={"check"}
                                            size={19}
                                            color={"#96B684"} />

                                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 15, marginLeft: 5, marginRight: 10 }}>{data.difficulty}</Text>
                                    </TouchableOpacity>


                                    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between', marginRight: 10 }}>
                                    <Icon
                                        name={"heart"}
                                        size={15}
                                        color={"#B33938"} />

                                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 15, marginLeft: 5 }}>{data.like_count}</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>


                           <View style={{ backgroundColor: "white", width: "90%", height: imageHeight/2.4, alignItems: "center", justifyContent: "center", borderRadius: 25, marginHorizontal: "5%" }}>
                               <Text style={{ color: "black", fontWeight: "bold", fontSize: 20 }}>루트 사진</Text>
                           </View>
                        </View>
                    } />

            </SafeAreaView>

        // </TouchableWithoutFeedback>
    )
};
