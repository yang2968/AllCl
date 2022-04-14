import React, { useState, useEffect } from "react";
import {
    StatusBar,
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
    FlatList
} from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import styles from "../../styles/style";
import Color from "../../styles/Color";
import Climb from "../../images/climb.jpeg";
import Climb2 from "../../images/climb2.jpeg";
import Route from "../../images/route.jpeg";

export default ({ navigation }) => {


    const [data, setData] = useState(testData);

    var imageHeight = Dimensions.get("window").height;

    useEffect(() => {

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

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={{ flexDirection: "row", alignSelf: "center", justifyContent: 'space-between', width: '90%', borderColor: "#a8a8a8", borderBottomWidth: 1, paddingTop: "6%", paddingBottom: "6%" }}
                onPress={() => {
                    //navigation.navigate("자유 게시판", { title: item.title, content: item.content, like: item.like, comment: item.comment });
                }}>

                <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>{(item.index + 1) + ". " + item.title}</Text>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>


                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between', marginRight: 10 }}>


                        <Icon
                            name={"check"}
                            size={19}
                            color={"#96B684"} />

                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 15, marginLeft: 5, marginRight: 10 }}>{item.level}</Text>
                    </View>

                    <Icon
                        name={"heart"}
                        size={15}
                        color={"#B33938"} />

                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 15, marginLeft: 5, marginRight: 10 }}>{item.like}</Text>



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
        // <ScrollView style={styles.RCWScrollView}
        //     showsVerticalScrollIndicator={false}
        //     stickyHeaderIndices={1}
        //     StickyHeaderComponent={
        //         <View style={{ backgroundColor: "#a8a8a8", height: 30 }}>
        //             <Text style={{ color: "white", fontSize: 40 }}>1231231321</Text>
        //         </View>
        //     }>
        <View style={styles.RCWView}>

            <FlatList
                data={testData}

                renderItem={renderItem}
                keyExtractor={item => item.index}
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
                                <Text style={styles.RCWTitleText}>연경 도약대</Text>

                                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginRight: 25 }}>
                                    <Icon
                                        name={"star"}
                                        size={20}
                                        color={"#F0CF54"} />

                                    <Text style={{ color: "#F0CF54", fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>8.4</Text>
                                </TouchableOpacity>


                            </View>
                            <Text style={styles.RCWTitleText2}>대구광역시 북구 연경동819</Text>
                            <Text style={styles.RCWContentText}>Information</Text>
                            <Text style={styles.RCWContentText2}>1990년대 초반 대구지역에 자유등반 붐이 일면서 암장이 정리되고 루트가 개척이 시작되어, 총 50개의 루트가 개척된 암장이다. 암석은 역암으로 되어있으며, 암장의 크기는 안쪽 바위가 높이 약 10m, 폭 약 10m 경사 100도 정도이다. 편리한 접근성과 적당한 난이도로 인기가 많은 자연 암벽장이다. 암장의 크기는 안쪽 바위가 높이 약 10m, 폭 약 10m 경사 100도 정도이다. 편리한 접근성과 적당한 난이도로 인기가 많은 자연 암벽장이다. 대구지역에 자유등반 붐이 일면서 암장이 정리되고 루트가 개척이 시작되어, 총 50개의 루트가 개척된 암장이다. 대구지역에 자유등반 붐이 일면서 암장이 정리되고 루트가 개척이 시작되어, 총 50개의 루트가 개척된 암장이다.</Text>

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
        </View>
    )
};