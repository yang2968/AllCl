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
import Climb from "../../images/climb.jpeg";

export default ({ navigation }) => {
  // 검색
  const [title, setTitle] = useState("");

  // 장치 목록 모달 표시 여부 변수
  const [modalVisible, setModalVisible] = useState(false);
  // 초기 위도, 경도
  const [region, setRegion] = useState({
    latitude: 36.4971639,
    longitude: 127.5931635,
    latitudeDelta: 4.0,
    longitudeDelta: 4.0,
  });
  // const [latitude, setLatitude] = useState(36.4971639);
  // const [longitude, setLongitude] = useState(127.5931635);
  // 마커
  const [place, setPlace] = useState([
    {
      index: 0,
      latitude: 35.9442388,
      longitude: 128.6260576,
      title: '연경 도약대',
      content: '대구광역시 북구 연경동819',
    },
    {
      index: 1,
      latitude: 37.0977217,
      longitude: 128.0032446,
      title: '천등산',
      content: '전라북도 연주군',
    },
  ]);

  useEffect(() => {
    async function getPermission() {
      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization('always');
      }

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
    getPermission();
  }, []);

  const setMarkers = () => {
    return (
      place.map((item, index) => (
        <Marker
          coordinate={{ latitude: item.latitude, longitude: item.longitude }}
          key={index}
          title={item.title}
          description={item.content}>
          <Callout
            style={{ width: 100 }}
            onPress={() => {
              setModalVisible(true)
            }}>
            <Text style={{ textAlign: 'center', color: "black", fontWeight: 'bold', fontSize: 12 }}>{item.title}</Text>
            <Text style={{ textAlign: 'center', color: "black", fontSize: 12 }}>{item.content}</Text>
          </Callout>
        </Marker>

      ))
    )
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
          style={{ flex: 1, alignItems: "center" }}
          region={region}
          onMapReady={() => setRegion(region)}
          onRegionChangeComplete={(region)=> {
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
              title => setTitle(title)
            } />
          {/* Search Location */}
          <TouchableOpacity style={styles.mapSearch}
            onPress={() => {
              setRegion({
                latitude: 35.8386644,
                longitude: 128.7318221,
                latitudeDelta: 0.00099,
                longitudeDelta: 0.00099,
              })
            }}>
            <Icon
              name={"search"}
              size={20}
              color={"white"} />
          </TouchableOpacity>
        </SafeAreaView>

        <View style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: 100,

          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end"
        }}>

          <TouchableOpacity style={{
            width: 40,
            height: 40,
            backgroundColor: "white",
            marginRight: 20,
            marginBottom: 20,
            borderRadius: 10,
            flexDirection: "row",
            alignSelf: "flex-end",
            alignItems: "center",
            justifyContent: "center"
          }}
            onPress={() => {

              try {
                Geolocation.getCurrentPosition(
                  async (position) => {
                    console.log("업데이트 위치", position);
                    setRegion({
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude,
                      latitudeDelta: 4.0,
                      longitudeDelta: 4.0,
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
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
              <View style={{ width: '100%', height: '70%', backgroundColor: 'black', borderTopLeftRadius: 25, borderTopRightRadius: 25 }}>
                <ImageBackground
                  imageStyle={{ borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
                  style={{ width: "100%", height: "100%", justifyContent: 'flex-end' }}
                  source={Climb}
                  resizeMode="cover">

                  <View style={{ backgroundColor: 'black', height: "45%", padding: "5%", borderTopLeftRadius: 25, borderTopRightRadius: 25 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={styles.RCWTitleText}>연경 도약대</Text>

                      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginRight: 25 }}>
                        <Icon
                          name={"star"}
                          size={20}
                          color={"#F0CF54"} />

                        <Text style={{ color: "#F0CF54", fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>8.4</Text>
                      </View> 
                    </View>
                    <Text style={styles.RCWTitleText2}>대구광역시 북구 연경동819</Text>
                    <Text style={styles.RCWContentText}>Information</Text>
                    <Text style={styles.RCWContentText2}>1990년대 초반 대구지역에 자유등반 붐이 일면서 암장이 정리되고 루트가 개척이 시작되어, 총 50개의 루트가 개척된 암장이다. 암석은 역암으로 되어있으며, 암장의 크기는 안쪽 바위가 높이 약 10m, 폭 약 10m 경사 100도 정도이다. 편리한 접근성과 적당한 난이도로 인기가 많은 자연 암벽장이다. 암장의 크기는 안쪽 바위가 높이 약 10m, 폭 약 10m 경사 100도 정도이다. 편리한 접근성과 적당한 난이도로 인기가 많은 자연 암벽장이다. 대구지역에 자유등반 붐이 일면서 암장이 정리되고 루트가 개척이 시작되어, 총 50개의 루트가 개척된 암장이다. 대구지역에 자유등반 붐이 일면서 암장이 정리되고 루트가 개척이 시작되어, 총 50개의 루트가 개척된 암장이다.</Text>
                  </View>

                </ImageBackground>

                <View style={{ position: "absolute", bottom: 0, width: "100%", paddingVertical: "2.5%", paddingHorizontal: "4%" }}>
                  <TouchableOpacity style={{ backgroundColor: "#314D2C", width: "100%", borderRadius: 10, activeOpacity: 0.1 }}
                    onPress={() => {
                      navigation.navigate("RCW");
                      setModalVisible(false);
                    }}>
                    <Text style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 20,
                      textAlign: "center",
                      marginVertical: "5%"
                    }}>상세보기</Text>
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