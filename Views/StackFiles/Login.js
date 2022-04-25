import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
    TouchableOpacity
} from "react-native";
import styles from "../../styles/style";
import Color from "../../styles/Color";


export default ({ navigation }) => {

    useEffect(() => {

    }, [])

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    return (
        <TouchableWithoutFeedback
            style={styles.touchableWithoutFeedback}
            onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, backgroundColor: Color.loginBackground }}>
                {/* 헤더 */}
                <View style={styles.loginSection1}>
                    <Text style={styles.loginHeaderText}>All Climb</Text>
                </View>
                {/*  */}

                {/* 아이디, 비밀번호 */}
                <View style={styles.loginSection2}>
                    <TextInput style={styles.loginTextInput}
                        placeholder="아이디"
                        placeholderTextColor="#9D9D9D"
                        onChangeText={
                            id => setId(id)
                        } />

                    <View style={{ margin: "4%" }} />

                    <TextInput style={styles.loginTextInput}
                        placeholder="비밀번호"
                        placeholderTextColor="#9D9D9D"
                        onChangeText={
                            password => setPassword(password)
                        } />
                </View>
                {/*  */}

                {/* 로그인, SNS 로그인, 회원가입 */}
                <View style={styles.loginSection3}>
                    <TouchableOpacity
                        style={styles.loginLoginButton}
                        onPress={() => { navigation.navigate("Tab") }}>
                        <Text style={styles.loginLoginButtonText}>로그인</Text>
                    </TouchableOpacity>

                    <View style={styles.loginETCButtonView}>
                    <TouchableOpacity
                        style={styles.loginETCButton}
                        onPress={() => { navigation.navigate("Tab") }}>
                        <Text style={styles.loginETCButtonText}>아이디/비밀번호 찾기</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.loginETCButton}
                        onPress={() => { navigation.navigate("Tab") }}>
                        <Text style={styles.loginETCButtonText}>회원가입</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                {/*  */}




            </View>
        </TouchableWithoutFeedback>
    )
};