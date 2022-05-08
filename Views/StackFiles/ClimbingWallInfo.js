import React, { useState, useEffect } from "react";
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
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import StarRating from 'react-native-star-rating';
import styles from "../../styles/style";
import Color from "../../styles/Color";
import API from "../../API/API";
import Climb from "../../images/climb.jpeg";
import Climb2 from "../../images/climb2.jpeg";
import Route from "../../images/route.jpeg";

export default ({ navigation, route }) => {
    const data = route.params;
    const [locationInfo, setLocationInfo] = useState([
        {
          name: "",
          address_province: "",
          address_city: "",
          address_detail: "",
          description: "",
          score: 0,
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

    var imageHeight = Dimensions.get("window").height;

    useEffect(() => {
        async function getLocations() {
            const locationInfo2 = await API.getLocationInfo(data.location_index, data.location_index);
            const routeInfo2 = await API.getRouteInfo(data.location_index);
            // console.log(locationInfo2);
            // console.log(routeInfo2);
        if(locationInfo2 != 0 && routeInfo2 != 0) {
             setLocationInfo(locationInfo2);
             setRouteInfo(routeInfo2);
             setStarCount(Number(locationInfo2[0].score));
        } else {
            Alert.alert("알림", "정보를 불러오지 못했습니다.");
        }
          }
          getLocations();
       
    }, [])

    var testData = [
        {
            index: 0,
            title: '쉬운길',
            level: "5.9",
            like: 10,
        },
        {
            index: 1,
            title: '무지개',
            level: "5.10b",
            like: 11,
        },
        {
            index: 2,
            title: '갈라진 세상',
            level: "5.8",
            like: 8,
        },
        {
            index: 3,
            title: '바위를 좋아하는',
            level: "5.12a",
            like: 3,
        },
    ];
    // Route
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={{ flexDirection: "row", alignSelf: "center", justifyContent: 'space-between', width: '90%', borderColor: "#a8a8a8", borderBottomWidth: 1, paddingTop: "6%", paddingBottom: "6%" }}
                onPress={() => {
                    navigation.navigate("RouteInfo", { location_name: locationInfo[0].name, route_name: item.route_name, location_index: item.location_index, route_index: item.route_index, difficulty: item.difficulty, like_count: item.like_count, image_path: item.image_path });
                }}>

                <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>{item.route_index + ". " + item.route_name}</Text>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>

                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between', marginRight: 10 }}>
                        <Icon
                            name={"check"}
                            size={19}
                            color={"#96B684"} />

                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 15, marginLeft: 5, marginRight: 10 }}>{item.difficulty}</Text>
                    </View>

                    <Icon
                        name={"heart"}
                        size={15}
                        color={"#B33938"} />

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

                                    <Text style={{ color: "#F0CF54", fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>{starCount}</Text>
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
                                <TouchableOpacity style={{ backgroundColor: Color.loginBackground, justifyContent: "center", marginRight: 10, paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 15 }}

                                    onPress={() => {

                                    }}>
                                    <Text style={{ color: "white", fontSize: 15, fontWeight: "bold", textAlign: "center" }}
                                    >완등순</Text>
                                </TouchableOpacity>


                                <TouchableOpacity style={{ backgroundColor: Color.loginButtonBackground, justifyContent: "center", marginRight: 10, paddingLeft: 10, paddingRight: 10, paddingVertical: 7, borderRadius: 15 }}

                                    onPress={() => {

                                    }}>
                                    <Text style={{ color: "white", fontSize: 13, fontWeight: "bold", textAlign: "center" }}
                                    >난이도순</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ backgroundColor: "#B33938", justifyContent: "center", marginRight: 10, paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 15 }}

                                    onPress={() => {


                                    }}>
                                    <Text style={{ color: "white", fontSize: 15, fontWeight: "bold", textAlign: "center" }}
                                    >인기순</Text>
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
                            disabled={false}
                            activeOpacity={0.2}
                            rating={starCount}
                            halfStarEnabled={true}
                            iconSet={'FontAwesome'}
                            emptyStar={'star'}
                            fullStar={'star'}
                            halfStar={'star-half-full'}
                            starSize={30}
                            fullStarColor={"#F0CF54"}
                            halfStarColor={"#F0CF54"}
                            emptyStarColor={"#CCCCCC"}
                            maxStars={5}
                            
                            selectedStar={(rating) => setStarCount(rating)}
                            starStyle={{ marginHorizontal: 10 }} />

                        <TouchableOpacity style={{ backgroundColor: Color.loginButtonBackground, alignItems: "center", justifyContent: "center", marginTop: 20, width: "65%", padding: "2.5%", borderRadius: 12 }}
                            onPress={() => {
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