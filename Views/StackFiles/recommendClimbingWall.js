import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    ImageBackground,
    ScrollView
} from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import styles from "../../styles/style";
import Climb from "../../images/climb.jpeg";
import Climb2 from "../../images/climb2.jpeg";

export default ({ navigation }) => {

    useEffect(() => {

    }, [])

    return (
        <TouchableWithoutFeedback
            style={{ flex: 1 }}
            onPress={Keyboard.dismiss}>

            <View style={{ flex: 1, backgroundColor: "black" }}>

                <ImageBackground
                    style={{ width: "100%", height: "100%" }}
                    source={Climb}
                    resizeMode="cover">

                    <ScrollView style={styles.RCWScrollView}>
                        <View style={styles.RCWScrollViewView}>
                            <Text style={styles.RCWTitleText}>연경 도약대</Text>
                            


                        </View>
                    </ScrollView>


                </ImageBackground>

            </View>

        </TouchableWithoutFeedback>
    )
};