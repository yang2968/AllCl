import React, { useState, useEffect } from "react";
import {
    View,
    SafeAreaView,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    FlatList,
    TouchableOpacity
} from "react-native";
import { useIsFocused, useRoute, StackActions, TabActions } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon3 from 'react-native-vector-icons/dist/SimpleLineIcons';
import styles from "../../styles/style";
import Color from "../../styles/Color";
import API from "../../API/API";

export default ({ navigation, route }) => {
    const isFocused = useIsFocused();

    const [myData, setMyData] = useState([]);
    const [userIndex, setUserIndex] = useState(3);

    useEffect(() => {
        async function getmyPostList() {
            // get User nickname
            const getData = await AsyncStorage.getItem('userInfo', (err, result) => { });
            const userInfo = JSON.parse(getData);
            setUserIndex(userInfo.userIndex);

            const userCleaerRouteData = await API.getUserClearRoute(1, userInfo.userIndex);
            console.log("test", userCleaerRouteData.length);
            setMyData(userCleaerRouteData);


        }
        getmyPostList();
    }, [isFocused]);

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
            style={{ flexDirection: "row", alignSelf: "center", justifyContent: 'space-between', width: '90%', borderColor: "#a8a8a8", borderBottomWidth: 1, paddingTop: "6%", paddingBottom: "6%" }}
            onPress={() => {
                navigation.navigate("RouteInfo", { route_name: item.route_name, location_index: item.location_index, route_index: item.route_index, difficulty: item.difficulty, like_count: item.like_count, image_path: item.image_path, index: index, isLike: item.isLike, isClear: item.isClear });
            }}>
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 15 }}>{(index + 1) + ". " + item.route_name}</Text>

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between', marginRight: 10 }}>
                    {
                        item.isClear != 0 ?
                            <Icon
                                name={"check"}
                                size={19}
                                color={"#96B684"} />
                            :
                            <Icon
                                name={"check"}
                                size={19}
                                color={"#B73D3A"} />
                    }
                    <Text style={{ color: "black", fontWeight: "bold", fontSize: 15, marginLeft: 5, marginRight: 10 }}>{item.difficulty}</Text>
                </View>
                {
                    item.isLike != 0 ?
                        <Icon
                            name={"heart"}
                            size={15}
                            color={"#B33938"} />
                        :
                        <Icon
                            name={"heart-o"}
                            size={15}
                            color={"#B33938"} />
                }
                <Text style={{ color: "black", fontWeight: "bold", fontSize: 15, marginLeft: 5, marginRight: 10 }}>{item.like_count}</Text>

            </View>
        </TouchableOpacity>


        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ flex: 1, paddingHorizontal: "5%" }}>
                {
                    myData == 0 ?
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: "black", fontSize: 15, fontWeight: "bold", margin: "7%" }}>완등한 루트가 없습니다.</Text>
                        </View>
                        :
                        //<Text style={{ color: "black", fontSize: 15, fontWeight: "bold", margin: "7%" }}>검색 결과가 없습니다.</Text>
                        <FlatList
                            data={myData}
                            renderItem={renderItem}
                            keyExtractor={item => item.route_index}
                            disableVirtualization={true}
                            showsVerticalScrollIndicator={false} />
                }
            </View>
        </SafeAreaView>
    )
};
