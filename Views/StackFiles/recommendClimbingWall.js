import React, { useState, useEffect } from "react";
import {
    StatusBar,
    View,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    ImageBackground,
    ScrollView
} from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import styles from "../../styles/style";
import Climb from "../../images/climb.jpeg";
import Climb2 from "../../images/climb2.jpeg";
import Route from "../../images/route.jpeg";

export default ({ navigation }) => {

    useEffect(() => {

    }, [])

    return (
        // <TouchableWithoutFeedback
        //     style={{ flex: 1 }}
        //     onPress={Keyboard.dismiss}>

        //     <View style={{ flex: 1, backgroundColor: "white" }}>

        //         <ImageBackground
        //             style={{ width: "100%", height: "20%" }}
        //             source={Climb}
        //             resizeMode="cover">

                
        //         </ImageBackground>
        
                 <ScrollView style={styles.RCWScrollView}
                 showsVerticalScrollIndicator={false}
                 stickyHeaderIndices={1}
                 StickyHeaderComponent={
                     <View style={{ backgroundColor: "#a8a8a8", height: 30 }}>
                         <Text style={{ color: "white", fontSize: 40}}>1231231321</Text>
                     </View>
                 }>
                        <View style={styles.RCWScrollViewView}>
                        <StatusBar barStyle={"light-content"} />

                            <Text style={styles.RCWTitleText}>연경 도약대</Text>
                            <Text style={styles.RCWTitleText2}>대구광역시 북구 연경동819</Text>
                            <Text style={styles.RCWContentText}>Information</Text>
                            <Text style={styles.RCWContentText2}>1990년대 초반 대구지역에 자유등반 붐이 일면서 암장이 정리되고 루트가 개척이 시작되어, 총 50개의 루트가 개척된 암장이다. 암석은 역암으로 되어있으며, 암장의 크기는 안쪽 바위가 높이 약 10m, 폭 약 10m 경사 100도 정도이다. 편리한 접근성과 적당한 난이도로 인기가 많은 자연 암벽장이다. 암장의 크기는 안쪽 바위가 높이 약 10m, 폭 약 10m 경사 100도 정도이다. 편리한 접근성과 적당한 난이도로 인기가 많은 자연 암벽장이다. 대구지역에 자유등반 붐이 일면서 암장이 정리되고 루트가 개척이 시작되어, 총 50개의 루트가 개척된 암장이다. 대구지역에 자유등반 붐이 일면서 암장이 정리되고 루트가 개척이 시작되어, 총 50개의 루트가 개척된 암장이다.</Text>

                            <Text style={styles.RCWTitleText2}>루트 안내</Text>
                            <Image
                            
                                style={{ width: "100%", height: 300, borderRadius: 20 }}
                                source={Route}
                                resizeMode="cover" />


                        </View>
                    </ScrollView>

        //     </View>

        // </TouchableWithoutFeedback>
    )
};