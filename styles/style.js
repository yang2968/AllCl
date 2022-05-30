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
        marginTop: "9%",
    },
    loginETCButton: {
        backgroundColor: Color.loginButtonBackground, width: "45%", paddingVertical: 8, borderRadius: 25
    },
    loginETCButtonText: {
        color: "white", fontSize: 18, fontWeight: "bold", textAlign: "center"
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
        backgroundColor: "#F1F1F1",
        paddingTop: "5%",
        paddingHorizontal: "5%",
        borderRadius: 25,
    },
    homeBoard2: {
        width: "100%",
        backgroundColor: Color.loginBackground,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: "20%"
    },
    homeBoard3: {
        width: "100%",
        backgroundColor: Color.loginBackground,
        flexDirection: "row",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: "5%"
    },
    //
    // map
    //
    mapMarkerText: {
        textAlign: 'center', color: "black", fontWeight: 'bold', fontSize: 12
    },
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
    mapCurrentLocationView: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    mapCurrentLocationTouchableOpacity: {
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
    },
    mapModalView: {
        flex: 1, alignItems: 'center', justifyContent: 'flex-end'
    },
    mapModalView2: {
        width: '100%', height: '70%', backgroundColor: 'black', borderTopLeftRadius: 25, borderTopRightRadius: 25
    },
    mapModalImageView: {
        width: "100%", height: "100%", justifyContent: 'flex-end'
    },
    mapModalInfo: {
        backgroundColor: 'black', height: "45%", padding: "5%", borderTopLeftRadius: 25, borderTopRightRadius: 25
    },
    mapModalStarView: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginRight: 25
    },
    mapModalStarText: {
        color: "#F0CF54", fontSize: 20, fontWeight: "bold", marginLeft: 10
    },
    mapModalDetailInfoView: {
        position: "absolute", bottom: 0, width: "100%", paddingVertical: "2.5%", paddingHorizontal: "4%"
    },
    mapModalDetailInfoTouchableOpacity: {
        backgroundColor: "#314D2C", width: "100%", borderRadius: 10, activeOpacity: 0.1 
    },
    mapModalDetailInfoText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        marginVertical: "5%"
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
    boardSearchView2: {
        flexDirection: "row",
        flex: 1,
         height: 50,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#BEB8DF",
        borderRadius: 10,
        marginRight: 10,
        alignItems: "center",
        justifyContent: "space-between"
    },
    boardSearchTextInput2: {
        flex: 1,
        paddingLeft: 5,
        color: "black",
        fontSize: 15
    },
    boardSearch2: {
        backgroundColor: "white",
        width: 40,
        height: 40,
       
        borderRadius: 20,
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
    postingKeyBoardView: {
        width: "100%", alignItems: "flex-start", justifyContent: "center", backgroundColor: " white", color: "black"
    },
    //
    // watchPost
    //
    watchPostView: {
        flex: 1, backgroundColor: "white", paddingLeft: "5%", paddingRight: "5%", paddingTop: "3%"
    },
    watchPostHeaderView: {
        width: "100%", flexDirection: "row", marginBottom: "5%", alignItems: "center"
    },
    watchPostHeaderView2: {
        alignItems: "center", justifyContent: "center", width: 35, height: 38, backgroundColor: Color.loginBackground, borderRadius: 5, paddingVertical: 4, paddingHorizontal: 4
    },
    watchPostNicknameText: {
        color: "black", fontSize: 20, fontWeight: "bold"
    },
    watchPostTimeText: {
        color: "#AFAFAF", fontSize: 14
    },
    watchPostHeaderText: {
        color: "black", fontSize: 20, fontWeight: "bold"
    },
    watchPostBodyText: {
        color: "black", fontSize: 15, paddingTop: "5%", paddingBottom: "5%"
    },
    watchPostSettingView: {
        width: "100%", flexDirection: "row", paddingBottom: "1%", borderBottomWidth: 1, borderColor: "#DBD9D9", alignItems: "center"
    },
    watchPostKeyBoardView: {
        width: "100%", alignItems: "center", justifyContent: "center", backgroundColor: " white", color: "black"
    },
    watchPostTextInput: {
        color: "black", fontSize: 16, width: "100%", height: 50, borderWidth: 1, borderColor: "#707070", borderRadius: 17, paddingLeft: 20, marginVertical: 10, backgroundColor: "white"
    },
    


    watchPostItemView: {
        borderColor: "#DBD9D9", borderBottomWidth: 1, paddingTop: "3%", paddingBottom: "3%"
    },
    watchPostItemHeader: {
        flexDirection: "row", paddingBottom: "3%", alignItems: "center"
    },
    watchPostItemHeader2: {
        backgroundColor: Color.loginBackground, paddingVertical: 4, paddingHorizontal: 4, marginRight: 7, borderRadius: 5
    },
    watchPostItemHeaderText: {
        color: 'black', fontSize: 15, fontWeight: "bold", textAlign: 'left'
    },
    watchPostItemBodyText: {
        color: 'black', fontSize: 12, textAlign: 'left', marginVertical: "2%"
    },
    watchPostItemTimeText: {
        color: 'gray', fontSize: 12, textAlign: 'left'
    },
    watchPostItemView2: {
        flexDirection: "row", flex: 1, justifyContent: "flex-end"
    },
    //
    // myPage
    //
    myPageScrollView: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: "5%",
        paddingHorizontal: "5%"
    },
    myPageContainerView: {
        flex: 1, backgroundColor: "white"
    },


    //
    // ClimbingWallInfo
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
    //

    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
      },
      rectangle: {
        width: 200,
        height: 200,
      },
      spacer: {
        height: 16,
      }
});

export default styles;