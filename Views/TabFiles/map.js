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
  Image
} from "react-native";
import MapView, { Marker, Callout, CalloutSubview, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import styles from "../../styles/style";

export default ({ navigation }) => {
  // 검색
  const [title, setTitle] = useState("");
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

  }, [])

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
              Alert.alert("알림", item.title + " 이동하시겠습니까?", [
                {
                  text: "취소"
                },
                {
                  text: "확인",
                  onPress: () => { }
                }
              ])
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
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={Keyboard.dismiss}>

      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>


        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          showsMyLocationButton={true}
          style={{ flex: 1, alignItems: "center" }}
          region={region}
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

      </SafeAreaView>

    </TouchableWithoutFeedback>
  )
};