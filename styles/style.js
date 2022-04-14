import { StyleSheet, StatusBar } from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Color from "./Color";

const StatusBarHeight =
    Platform.OS === 'ios' ? getStatusBarHeight(true) + 10 : 10;

const searchViewMargin = Platform.OS === "ios" ? "10%" : "5%";

const styles = StyleSheet.create({
    touchableWithoutFeedback: {
        flex: 1
    },
    //
    // login
    //
    loginSection1: {
        width: "100%",
        height: "35%",
        alignItems: "center",
        justifyContent: "center",
    },
   
    loginHeaderText: {
        color: "white",
        fontSize: 40,
        fontWeight: "bold"
    },
    loginSection2: {
        width: "100%",
        height: "25%",
        alignItems: "center",
        justifyContent: "center",
    },
    loginSection3: {
        width: "100%",
        height: "40%",
        alignItems: "center",
        marginTop: "5%"
    },
    loginTextInput: {
        width: "85%",
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 20,
        backgroundColor: "white",
        borderRadius: 15,
        fontWeight: "bold",
        color: "black"
    },
    loginLoginButton: {
        backgroundColor: Color.loginButtonBackground,
        width: "85%",
        paddingTop: 7,
        paddingBottom: 7,
        borderRadius: 15
    },
    loginLoginButtonText: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center"
    },
    loginETCButtonView: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: "9%"
    },
    loginETCButton: {
        backgroundColor: Color.loginButtonBackground, width: "35%", paddingTop: 7, paddingBottom: 7, borderRadius: 25
    },
    loginETCButtonText: {
        color: "white", fontSize: 20, fontWeight: "bold", textAlign: "center"
    },
    //
    // home
    //
    page: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: StatusBarHeight,
        paddingBottom: "3%",
        paddingLeft: "5%",
        paddingRight: "5%"

    },
    homeHeader: {
        backgroundColor: "white",
        width: "100%",
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "5%",
    },
    homeAllClimb: {
        color: "black",
        fontWeight: "bold",
        fontSize: 25
    },
    homeSearch: {
        backgroundColor: Color.loginBackground,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"

    },
    homeContentMargin: {
        marginTop: "6%",
        marginBottom: "3%"
    },
    homeContentTitle: {
        color: "black",
        fontWeight: "bold",
        fontSize: 20
    },
    homeRecommend: {
        flexDirection: "row",
        marginBottom: "5%"

    },
    homeBoard: {
        width: "100%",
        height: 200,
        backgroundColor: "#F1F1F1",
        paddingVertical: "5%",
        paddingHorizontal: "5%",
        borderRadius: 25,
    },
    homeBoard2: {
        width: "100%",
        height: 200,
        backgroundColor: "#D2D2D2",
        borderRadius: 25,
       alignItems: "center",
       justifyContent: "center"
    },
    //
    // map
    //
    mapSearchView: {
        position: "absolute",
        width: "90%",
        backgroundColor: "white",
        marginTop: searchViewMargin,
        borderRadius: 10,
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "space-between"
    },
    mapSearchTextInput: {
        flex: 1,
        paddingLeft: 15,
        color: "black",
        fontSize: 20
    },
    mapSearch: {
        backgroundColor: Color.loginBackground,
        width: 40,
        height: 40,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"

    },
    //
    // board
    //
    boardPlus: {
        width: "15%",
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center"

    },
    boardSearch: {
        backgroundColor: Color.loginBackground,
        width: "15%",
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center"
    },
    //
    // posting
    //
    postingView: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center"
    },
    postingTitle: {
        width: "100%",
        // borderBottomWidth: 1,
        // borderColor: "#848484",
        color: "black",
        fontSize: 20,
    },
    postingScrollContents: {
        width: "88%",
        height: "92%",
        backgroundColor: "white"
    },
    postingContent: {
        flex: 1,
        fontSize: 15,
        backgroundColor: "white",
        color: "black"
    },
    postingBottomView: {
        alignSelf: "flex-start",
        width: "100%",
        height: "10%",
        backgroundColor: "white",
        paddingLeft: 15
    },
    //
    // Recommend Climb Wall
    //
    RCWView: {
        backgroundColor: "black",
    },
    RCWTitleText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: "3%"
    },
    RCWTitleText2: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: "3%"
    },
    RCWContentText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: "3%"
    },
    RCWContentText2: {
        color: "white",
        fontSize: 15,
        marginBottom: "5%"
    },
    RCWSearchView: {
       
        width: "100%",
        backgroundColor: "white",
        marginVertical: "7%",
        borderRadius: 10,
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "space-between"
    },
});

export default styles;