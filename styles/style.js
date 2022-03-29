import { StyleSheet, StatusBar } from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';

const StatusBarHeight =
    Platform.OS === 'ios' ? getStatusBarHeight(true) + 10 : 10;

const styles = StyleSheet.create({
    touchableWithoutFeedback: {
        flex: 1
    },
    //
    // page1
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
        marginBottom: "5%"
    },
    homeAllClimb: {
        color: "black",
        fontWeight: "bold",
        fontSize: 30
    },
    homeSearch: {
        backgroundColor: "#94B381",
        width: "15%",
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center"

    },
    homeContentMargin: {
        marginTop: "8%",
        marginBottom: "3%"
    },
    homeContentTitle: {
        color: "black",
        fontWeight: "bold",
        fontSize: 18
    },
    homeRecommend: {
        flexDirection: "row",
        marginBottom: "5%"

    },
    homeBoard: {
        borderColor: "black",
        borderWidth: 1,
        width: "100%",
        height: "30%"
    },
    //
    // page3
    //
    boardPlus: {
        width: "15%",
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center"

    },

    //
    // RCW
    //
    RCWScrollView: {
        backgroundColor: "black",
        width: "100%",
        height: "60%",
        position: "absolute",
        bottom: 0,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    RCWScrollViewView: {
        padding: "5%"
    },
    RCWTitleText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20
    },
});

export default styles;