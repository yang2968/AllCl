import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  FlatList,
  Platform,
  Modal,
  PermissionsAndroid
} from "react-native";
import MapView, { Marker, Callout, CalloutSubview, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
import styles from "../../styles/style";
import Color from "../../styles/Color";
import API from "../../API/API";
import Climb from "../../images/climb.jpeg";

export default ({ navigation }) => {
  const mainURL = "http://13.209.75.70:8080";
  // 검색
  const [text, setText] = useState("");

  // 장치 목록 모달 표시 여부 변수
  const [modalVisible, setModalVisible] = useState(false);
  // 초기 위도, 경도
  const [region, setRegion] = useState({
    latitude: 36.4971639,
    longitude: 127.5931635,
    latitudeDelta: 3.0,
    longitudeDelta: 3.0,
  });
  // 마커
  const [locations, setLocations] = useState([
    // {
    //   index: 0,
    //   latitude: 35.9442388,
    //   longitude: 128.6260576,
    //   name: 'test',
    //   description: '대구광역시 북구 연경동819',
    // },
  
  ]);

  const [locationInfo, setLocationInfo] = useState([
    {
      name: "",
      address_province: "",
      address_city: "",
      address_detail: "",
      description: "",
      score: "",
      image_path: "",
    }
  ]);

  const [imageStatus, setImageStatus] = useState(false);

  useEffect(() => {
    async function getPermission() {
      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization('always');
      } else if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          {
            title: "Location Permission",
            message:
              "This App needs access to your Location ",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //console.log("You can use the Location");
        } else {
          //console.log("Location permission denied");
        }
      }
    }
    async function getLocations() {
      const locations2 = await API.getLocations();
      console.log(locations2);
      setLocations(locations2);
    }
    getPermission();
    getLocations();
  }, []);

  useEffect(() => {
    async function getImageStatus() {
      var imageStatus = await API.checkImageURL(mainURL + locationInfo[0].image_path);
      setImageStatus(imageStatus);
    }
    getImageStatus();
  }, [locationInfo])

  const setMarkers = () => {
    if (locations != 0) {
      return (
        locations.map((item, location_index) => (
          (
            item.name != "string" ?
              <Marker
                coordinate={{ latitude: Number(item.latitude), longitude: Number(item.longitude) }}
                key={location_index}
                title={item.name}
                description={item.name}>
                <Callout
                  style={{ width: 100 }}
                  onPress={async () => {
                    console.log(item.location_index);
                    const locationInfo2 = await API.getLocationInfo(item.location_index, 1);
                    setLocationInfo(locationInfo2);
                    setModalVisible(true);
                  }}>
                  <Text style={styles.mapMarkerText}>{item.name}</Text>
                  {/* <Text style={{ textAlign: 'center', color: "black", fontSize: 12 }}>{item.name}</Text> */}
                </Callout>
              </Marker>
              :
              <></>
          )

        ))
      )
    }
  };

  // 지도 페이지에 오면 현재 위치 받아 지도에 표시 검색 창에 현재 위치 출력 
  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      setModalVisible(false);
    }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>

        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          // showsMyLocationButton={true}
          showsUserLocation={true}
          style={{ flex: 1, alignItems: "center", position: "absolute", left:0, right:0, top:0, bottom: 0 }}
          region={region}
          onMapReady={() => setRegion(region)}
          onRegionChangeComplete={(region) => {
            // console.log(region);
            setRegion(region);
          }}
        >
          {setMarkers()}
        </MapView>

        <SafeAreaView style={styles.mapSearchView}>
          <TextInput style={styles.mapSearchTextInput}
            placeholder="현재 위치 송출"
            placeholderTextColor="#9D9D9D"
            onChangeText={
              text => setText(text)
            } />
          {/* Search Location */}
          <TouchableOpacity style={styles.mapSearch}
            onPress={() => {
              // need function

              // setRegion({
              //   latitude: 35.8386644,
              //   longitude: 128.7318221,
              //   latitudeDelta: 0.00099,
              //   longitudeDelta: 0.00099,
              // })
            }}>
            <Icon
              name={"search"}
              size={20}
              color={"white"} />
          </TouchableOpacity>
        </SafeAreaView>

        <View style={styles.mapCurrentLocationView}>

          <TouchableOpacity style={styles.mapCurrentLocationTouchableOpacity}
            onPress={() => {

              try {
                Geolocation.getCurrentPosition(
                  async (position) => {
                    console.log("업데이트 위치", position);
                    setRegion({
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude,
                      latitudeDelta: 1.0,
                      longitudeDelta: 1.0,
                    });
                  },
                  (error) => {
                    console.log(error.code, error.message);
                  },
                  { enableHighAccuracy: true, timeout: 25000, maximumAge: 10000 }
                );
              } catch (error) {
                console.log(error);
              }
            }}>
            <Icon2
              name={"gps-fixed"}
              size={30}
              color={Color.loginBackground} />
          </TouchableOpacity>

        </View>

        {/* 상세보기 페이지 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
          onBackdropPress={() => {
            setModalVisible(false);
          }}>
          <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
            setModalVisible(false);
          }}>
            <View style={styles.mapModalView}>
              <View style={styles.mapModalView2}>
                {
                  imageStatus == true ?
                    <ImageBackground
                      imageStyle={{ borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
                      style={styles.mapModalImageView}
                      source={{ uri: mainURL + locationInfo[0].image_path }}
                      resizeMode="cover">

                      <View style={styles.mapModalInfo}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                          <Text style={styles.RCWTitleText}>{locationInfo[0].name}</Text>

                          <View style={styles.mapModalStarView}>
                            <Icon
                              name={"star"}
                              size={20}
                              color={"#F0CF54"} />

                            <Text style={styles.mapModalStarText}>{locationInfo[0].score}</Text>
                          </View>
                        </View>
                        <Text style={styles.RCWTitleText2}>{locationInfo[0].address_province + " " + locationInfo[0].address_city + " " + locationInfo[0].address_detail}</Text>
                        <Text style={styles.RCWContentText}>Information</Text>
                        <Text style={styles.RCWContentText2}>{locationInfo[0].description}</Text>
                      </View>

                    </ImageBackground>
                    :
                    <View style={styles.mapModalImageView}>
                      <View style={{ width: "100%", height: "55%", alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>이미지를 불러오지 못했습니다.</Text>
                      </View>
                      <View style={styles.mapModalInfo}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                          <Text style={styles.RCWTitleText}>{locationInfo[0].name}</Text>

                          <View style={styles.mapModalStarView}>
                            <Icon
                              name={"star"}
                              size={20}
                              color={"#F0CF54"} />

                            <Text style={styles.mapModalStarText}>{locationInfo[0].score}</Text>
                          </View>
                        </View>
                        <Text style={styles.RCWTitleText2}>{locationInfo[0].address_province + " " + locationInfo[0].address_city + " " + locationInfo[0].address_detail}</Text>
                        <Text style={styles.RCWContentText}>Information</Text>
                        <Text style={styles.RCWContentText2}>{locationInfo[0].description}</Text>
                      </View>
                    </View>
                }

                <View style={styles.mapModalDetailInfoView}>
                  <TouchableOpacity style={styles.mapModalDetailInfoTouchableOpacity}
                    onPress={() => {
                      navigation.navigate("ClimbingWallInfo", { location_index: locationInfo[0].location_index });
                      setModalVisible(false);
                    }}>
                    <Text style={styles.mapModalDetailInfoText}>상세보기</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>


      </SafeAreaView >
    </TouchableWithoutFeedback>

  )
};