import React, { useState, useEffect, useCallback, useRef } from "react";
import {
    StatusBar,
    Alert,
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Keyboard,
    Image,
    ImageBackground,
    ScrollView,
    Dimensions,
    FlatList,
    Modal
} from "react-native";
import { useIsFocused, useRoute, StackActions, TabActions } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import StarRating from 'react-native-star-rating-widget';
import styles from "../../styles/style";
import Color from "../../styles/Color";
import API from "../../API/API";
import Climb from "../../images/climb.jpeg";
import Climb2 from "../../images/climb2.jpeg";
import Route from "../../images/route.jpeg";

export default ({ navigation, route }) => {
    const data = route.params;
    // 날짜순
    const dateStyle = useCallback(() => {
        likeButton.current.setNativeProps({ backgroundColor: "white" });
        commentButton.current.setNativeProps({ backgroundColor: "white" });
    }, []);
    const dateTextStyle = useCallback(() => {
        likeButtonText.current.setNativeProps({ style: { color: Color.likeButtonColor } });
        commentButtonText.current.setNativeProps({ style: { color: Color.loginButtonBackground } });
    }, []);
    // 인기순
    const likeButton = useRef();
    const likeStyle = useCallback(() => {
        likeButton.current.setNativeProps({ backgroundColor: Color.likeButtonColor });
        commentButton.current.setNativeProps({ backgroundColor: "white" });
    }, []);
    const likeButtonText = useRef();
    const likeTextStyle = useCallback(() => {
        likeButtonText.current.setNativeProps({ style: { color: "white" } });
        commentButtonText.current.setNativeProps({ style: { color: Color.loginButtonBackground } });
    }, []);
    const [likeButtonDisable, setLikeButtonDisable] = useState(true);
    // 댓글순
    const commentButton = useRef();
    const commentStyle = useCallback(() => {
        commentButton.current.setNativeProps({ backgroundColor: Color.loginButtonBackground });
        likeButton.current.setNativeProps({ backgroundColor: "white" });
    }, []);

    const commentButtonText = useRef();
    const commentTextStyle = useCallback(() => {
        commentButtonText.current.setNativeProps({ style: { color: "white" } });
        likeButtonText.current.setNativeProps({ style: { color: Color.likeButtonColor } });
    }, []);
    const [commentButtonDisable, setCommentButtonDisable] = useState(true);

    const [userIndex, setUserIndex] = useState(1);

    const [sortData, setSortData] = useState(0);

    const [locationInfo, setLocationInfo] = useState([
        {
            name: "",
            address_province: "",
            address_city: "",
            address_detail: "",
            description: "",
            score: 0,
            userScore: 0,
            image_path: "",
        }
    ]);
    //
    const [routeInfo, setRouteInfo] = useState([
        {
            location_index: "",
            route_index: 0,
            route_name: "",
            difficulty: "",
            bolt_count: "",
            like_count: "",
            image_path: "",
        }
    ]);
    // 장치 목록 모달 표시 여부 변수
    const [modalVisible, setModalVisible] = useState(false);
    const [starCount, setStarCount] = useState(locationInfo[0].score);
    const isFocused = useIsFocused();
    var imageHeight = Dimensions.get("window").height;

    useEffect(() => {
        async function getLocations() {
            const getData = await AsyncStorage.getItem('userInfo', (err, result) => { });
            const userInfo = JSON.parse(getData);
            setUserIndex(userInfo.userIndex);

            const locationInfo2 = await API.getLocationInfo(data.location_index, userInfo.userIndex);
            const routeInfo2 = await API.getRouteInfo(data.location_index, userInfo.userIndex);

            if (locationInfo2 != 0 && routeInfo2 != 0) {
                setLocationInfo(locationInfo2);
                setRouteInfo(routeInfo2);
                setLikeButtonDisable(false);
                setCommentButtonDisable(false);
                if (locationInfo2[0].userScore == undefined) {
                    setStarCount(0);
                } else {
                    setStarCount(Number(locationInfo2[0].userScore));
                }
            } else {
                Alert.alert("알림", "정보를 불러오지 못했습니다.");
            }
        }
        getLocations();

    }, [isFocused])
    // Route
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={{ flexDirection: "row", alignSelf: "center", justifyContent: 'space-between', width: '90%', borderColor: "#a8a8a8", borderBottomWidth: 1, paddingTop: "6%", paddingBottom: "6%" }}
                onPress={() => {
                    navigation.navigate("RouteInfo", { location_name: locationInfo[0].name, route_name: item.route_name, location_index: item.location_index, route_index: item.route_index, difficulty: item.difficulty, like_count: item.like_count, image_path: item.image_path, index: index, isLike: item.isLike, isClear: item.isClear });
                }}>
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>{(index + 1) + ". " + item.route_name}</Text>

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
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 15, marginLeft: 5, marginRight: 10 }}>{item.difficulty}</Text>
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
                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 15, marginLeft: 5, marginRight: 10 }}>{item.like_count}</Text>

                    <View style={{ marginLeft: 10, transform: [{ rotateZ: "180deg" }] }}>
                        <Icon2
                            name={"triangle-sharp"}
                            size={18}
                            color={"#707070"} />
                    </View>

                </View>
            </TouchableOpacity>

        );
    };

    return (
        <View style={styles.RCWView}>

            <FlatList
                data={routeInfo}
                renderItem={renderItem}
                keyExtractor={item => item.route_index}
                disableVirtualization={true}
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[1]}
                ListHeaderComponent={
                    <View>
                        <StatusBar barStyle={"dark-content"}
                            backgroundColor="transparent"
                            translucent={true} />

                        <ImageBackground
                            imageStyle={{ borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
                            style={{ width: "100%", height: imageHeight / 1.7, justifyContent: 'flex-end' }}
                            source={Climb}
                            resizeMode="cover">

                            <View style={{ backgroundColor: 'black', height: "5%", borderTopLeftRadius: 25, borderTopRightRadius: 25 }}>

                            </View>

                        </ImageBackground>

                        <View style={{ backgroundColor: 'black', paddingHorizontal: "5%", borderTopLeftRadius: 24, borderTopRightRadius: 45 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={styles.RCWTitleText}>{locationInfo[0].name}</Text>

                                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginRight: 25 }}
                                    onPress={() => {
                                        setModalVisible(true);
                                    }}>
                                    <Icon
                                        name={"star"}
                                        size={20}
                                        color={"#F0CF54"} />

                                    <Text style={{ color: "#F0CF54", fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>{locationInfo[0].score}</Text>
                                </TouchableOpacity>


                            </View>
                            <Text style={styles.RCWTitleText2}>{locationInfo[0].address_province + " " + locationInfo[0].address_city + " " + locationInfo[0].address_detail}</Text>
                            <Text style={styles.RCWContentText}>Information</Text>
                            <Text style={styles.RCWContentText2}>{locationInfo[0].description}</Text>

                            {/* Route Info */}
                            <Text style={styles.RCWTitleText2}>루트 안내</Text>
                            <Image
                                style={{ width: "100%", height: 300, borderRadius: 20 }}
                                source={Route}
                                resizeMode="cover" />

                            <View style={styles.RCWSearchView}>
                                <TextInput style={styles.mapSearchTextInput}
                                    placeholder="루트 검색"
                                    placeholderTextColor="#9D9D9D"
                                    onChangeText={
                                        title => setTitle(title)
                                    } />
                                {/* Search Location */}
                                <TouchableOpacity style={styles.mapSearch}
                                    onPress={() => {

                                    }}>
                                    <Icon
                                        name={"search"}
                                        size={20}
                                        color={"white"} />
                                </TouchableOpacity>
                            </View>



                            <View style={{ width: "100%", flexDirection: "row", marginBottom: "5%", alignItems: "center" }}>

                                <TouchableOpacity style={{ backgroundColor: "white", justifyContent: "center", marginRight: 10, paddingLeft: 10, paddingRight: 10, paddingVertical: 7, borderRadius: 15 }}
                                    ref={commentButton}
                                    //disabled={commentButtonDisable}
                                    onPress={async () => {
                                        console.log(data, userIndex);
                                        if (sortData == 2) {
                                            const dateData = await API.getRouteInfo(Number(data.location_index), userIndex);
                                            console.log(dateData);
                                            //dateData.reverse();
                                            setRouteInfo(dateData);
                                            dateStyle();
                                            dateTextStyle();
                                            setSortData(0);
                                        } else {
                                            const commentsdata = await API.getDifficultyRouteInfo(Number(data.location_index), userIndex);
                                            console.log(commentsdata);
                                            setRouteInfo(commentsdata);
                                            commentStyle();
                                            commentTextStyle();
                                            setSortData(2);
                                        }
                                    }}>
                                    <Text style={{ color: Color.loginButtonBackground, fontSize: 13, fontWeight: "bold", textAlign: "center" }}
                                        ref={commentButtonText}>난이도순</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ backgroundColor: "white", justifyContent: "center", marginRight: 10, paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 15 }}
                                    ref={likeButton}
                                    //disabled={likeButtonDisable}
                                    onPress={async () => {
                                        console.log(data, userIndex);
                                        if (sortData == 1) {
                                            const dateData = await API.getRouteInfo(Number(data.location_index), userIndex);
                                            console.log(dateData);
                                            //dateData.reverse();
                                            setRouteInfo(dateData);
                                            dateStyle();
                                            dateTextStyle();
                                            setSortData(0);
                                        } else {
                                            const popularData = await API.getPopularRouteInfo(Number(data.location_index), userIndex);
                                            console.log(popularData);
                                            setRouteInfo(popularData);
                                            likeStyle();
                                            likeTextStyle();
                                            setSortData(1);
                                        }

                                    }}>
                                    <Text style={{ color: Color.likeButtonColor, fontSize: 15, fontWeight: "bold", textAlign: "center" }}
                                        ref={likeButtonText}>인기순</Text>
                                </TouchableOpacity>
                            </View>



                        </View>
                    </View>

                } />





            {/* 별점 페이지 */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
                onBackdropPress={() => {
                    setModalVisible(false);
                }}>
                <View style={{ flex: 1, width: "90%", alignSelf: "center", alignItems: "center", justifyContent: "center" }}>
                    <View style={{ width: "100%", backgroundColor: Color.loginBackground, alignItems: "center", justifyContent: "center", paddingVertical: "5%", borderRadius: 25 }}>
                        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>별점 주기</Text>

                        <StarRating
                            style={{ alignSelf: "center" }}
                            color={"#F0CF54"}
                            maxStars={5}
                            starSize={35}
                            starStyle={{ marginHorizontal: 10, }}
                            emptyColor={"#CCCCCC"}
                            rating={starCount}
                            onChange={(rating) => setStarCount(rating)} />

                        <TouchableOpacity style={{ backgroundColor: Color.loginButtonBackground, alignItems: "center", justifyContent: "center", marginTop: 20, width: "65%", padding: "2.5%", borderRadius: 12 }}
                            onPress={async () => {
                                if (Number(locationInfo[0].userScore) == undefined) { // 유저스코어를 알 수 없는 경우 분기
                                    // createScore
                                    console.log("createScore");
                                    const createScoreRes = await API.createScore(userIndex, locationInfo[0].location_index, starCount);
                                    switch (createScoreRes[0]) {
                                        case 200: case 201:
                                            const locationInfo2 = await API.getLocationInfo(locationInfo[0].location_index, userIndex);
                                            setLocationInfo(locationInfo2);
                                            break;
                                        default:
                                            Alert.alert("알림", "에러가 발생하였습니다.");
                                            break;
                                    }
                                } else { // modifyScore
                                    console.log("modifyScore");
                                    const modifyScoreRes = await API.modifyScore(userIndex, locationInfo[0].location_index, starCount);
                                    switch (modifyScoreRes[0]) {
                                        case 200: case 201:
                                            const locationInfo2 = await API.getLocationInfo(locationInfo[0].location_index, userIndex);
                                            setLocationInfo(locationInfo2);
                                            break;
                                        default:
                                            Alert.alert("알림", "에러가 발생하였습니다.");
                                            break;
                                    }
                                }
                                setModalVisible(false);
                            }}>
                            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>완료</Text>
                        </TouchableOpacity>





                    </View>
                </View>


            </Modal>



        </View>
    )
};