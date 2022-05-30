import React, { useState, useEffect, useContext } from "react";
import {
    View,
    ScrollView,
    Text,
    ActionSheetIOS,
    FlatList,
    TouchableWithoutFeedback,
    PermissionsAndroid,
    Keyboard,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Image,
    ImageBackground
} from "react-native";
import { useRoute, StackActions, TabActions } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/dist/Ionicons';
import SimplePopupMenu from 'react-native-simple-popup-menu';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AppContext from "../../AppContext";
import styles from "../../styles/style";
import Color from "../../styles/Color";

export default ({ navigation }) => {
    const globalVariables = useContext(AppContext);
    const items = [
        { id: '카메라', label: '카메라' },
        { id: '앨범', label: '앨범' },
    ];

    const requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "Cool Photo App Camera Permission",
              message:
                "Cool Photo App needs access to your camera " +
                "so you can take awesome pictures.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the camera");
          } else {
            console.log("Camera permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
      };

    const [img, setImageSource] = useState([]);

    const options = {
        mediaType: 'photo',
        selectionLimit: 10,
        includeBase64: false,
        cameraType: "back",
        saveToPhotos: true
    };

    const options2 = {
        mediaType: 'photo',
        selectionLimit: 10
    };

    var test = [1, 2, 3, 4,];

    // 댓글
    const renderItem = ({ item, index }) => {
        return (
            <ImageBackground style={{ width: 100, height: 100, backgroundColor: "black" }}
                imageStyle={{ borderRadius: 10 }}
                resizeMode="cover"
                source={{ uri: item.uri }}>

                <TouchableOpacity style={{ alignItems: "flex-end" }}
                    onPress={() => {
                        var changedImage = [...img];
                        changedImage.splice(index, 1);
                        setImageSource(changedImage);
                        globalVariables.setImageFiles(changedImage);
                    }}>
                    <Icon
                        name={"close"}
                        size={25}
                        color={"black"} />
                </TouchableOpacity>
            </ImageBackground>
        );
    };


    useEffect(() => {
        Keyboard.dismiss();
        async function getPermission() {
            if(Platform.OS === "android") {
                requestCameraPermission();
            }
        }
        getPermission();
    }, [])

    return (
        <View style={styles.postingView}>
            <View style={{ width: "88%", alignItems: "center", marginBottom: 15, paddingBottom: 10, borderBottomWidth: 1, borderColor: "#848484", }}>
                <TextInput style={styles.postingTitle}
                    placeholder="제목"
                    placeholderTextColor="#9D9D9D"
                    value={globalVariables.header}
                    onChangeText={
                        header => globalVariables.setHeader(header)
                    } />
            </View>

            <ScrollView style={styles.postingScrollContents}
                showsVerticalScrollIndicator={false}>
                <TextInput style={styles.postingContent}
                    placeholder="내용을 입력하세요."
                    placeholderTextColor="#9D9D9D"
                    value={globalVariables.body}
                    multiline={true}
                    textAlignVertical={"top"}
                    autoFocus={false}
                    onChangeText={
                        body => globalVariables.setBody(body)
                    } />
            </ScrollView>

            <KeyboardAvoidingView style={styles.postingKeyBoardView}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 65 : 0}>

                {
                    img.length != 0 ?
                        <FlatList
                            data={img}
                            renderItem={renderItem}
                            keyExtractor={item => item.fileName}
                            disableVirtualization={false}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false} />
                        :
                        <></>
                }

                {
                    Platform.OS === "android" ?
                        <SimplePopupMenu
                            items={items}
                            style={{ padding: 10 }}
                            onSelect={async (item) => {
                                if (item.label == "카메라") {
                                    const result = await launchCamera(options, (image) => {
                                        console.log("test ", image);
                                        if (image.didCancel) { // 앨범에서 사진을 고르지않고 취소한 경우
                                        } else {
                                            setImageSource(image.assets);
                                            globalVariables.setImageFiles(image.assets);
                                        }  
                                    })

                                } else if (item.label == "앨범") {
                                    const result = await launchImageLibrary(options2, (image) => {
                                        console.log("test ", image);
                                        if (image.didCancel) { // 앨범에서 사진을 고르지않고 취소한 경우
                                        } else {
                                            setImageSource(image.assets);
                                            globalVariables.setImageFiles(image.assets);
                                        }  
                                    })
                                }
                            }}>
                            <Icon
                                name={"camera-outline"}
                                size={35}
                                color={Color.loginButtonBackground} />
                        </SimplePopupMenu>
                        :
                        <TouchableOpacity style={{ padding: 10 }}
                            onPress={() => {
                                ActionSheetIOS.showActionSheetWithOptions(
                                    {
                                        title: "게시판 메뉴",
                                        options: ["취소", "촬영", "앨범"],
                                        cancelButtonIndex: 0,
                                        userInterfaceStyle: 'dark'
                                    },
                                    async (buttonIndex) => {
                                        if (buttonIndex === 0) {
                                            // 취소
                                        } else if (buttonIndex === 1) {
                                            // 카메라
                                            const result = await launchCamera(options, (image) => {
                                                console.log("test ", image);
                                                if (image.didCancel) { // 앨범에서 사진을 고르지않고 취소한 경우
                                                } else {
                                                    setImageSource(image.assets);
                                                    globalVariables.setImageFiles(image.assets);
                                                }  
                                            })
                                        } else if (buttonIndex === 2) {
                                            // 앨범
                                            const result = await launchImageLibrary(options2, (image) => {
                                                console.log("test ", image);
                                                if (image.didCancel) { // 앨범에서 사진을 고르지않고 취소한 경우
                                                } else {
                                                    setImageSource(image.assets);
                                                    globalVariables.setImageFiles(image.assets);
                                                    
                                                }  
                                            })
                                        }
                                    }
                                );
                            }}>
                            <Icon
                                name={"camera-outline"}
                                size={35}
                                color={Color.loginButtonBackground} />
                        </TouchableOpacity>
                }

            </KeyboardAvoidingView>

        </View>
    )
};