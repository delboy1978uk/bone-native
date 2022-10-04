import React from 'react';
import {StyleSheet, View} from "react-native";
import {useNetInfo} from "@react-native-community/netinfo";

import colors from "../config/colors";
import Text from "./Text";

function OfflineNotice(props) {
    const netInfo = useNetInfo();

    if (netInfo.type !== 'unkown' && netInfo.isInternetReachable === false) {
        return(
            <View style={styles.container}>
                <Text style={styles.text}>No Internet connection</Text>
            </View>
        );
    }

    return null;
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        color: colors.white,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        paddingTop: 20
    },
    text: {
        color: colors.white,
    }
})

export default OfflineNotice;
