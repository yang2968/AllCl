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
    page1Header: {
        backgroundColor: "white",
        width: "100%",
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "5%"
    },
    page1AllClimb: {
        color: "black",
        fontWeight: "bold",
        fontSize: 30
    },
    page1Search: {
        backgroundColor: "#94B381",
        width: "15%",
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center"

    },
    page1ContentMargin: {
        marginTop: "8%",
        marginBottom: "3%"
    },
    page1ContentTitle: {
        color: "black",
        fontWeight: "bold",
        fontSize: 18
    },
    page1Recommend: {
        flexDirection: "row",
        marginBottom: "5%"
       
    },
    page1Board: {
        borderColor: "black",
        borderWidth: 1,
        width: "100%",
        height: "30%"
    },
    //
    // page3
    //
    page3Plus: {
        width: "15%",
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center"

    },
});

export default styles;