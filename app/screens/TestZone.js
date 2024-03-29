import {useState} from "react";
import * as SplashScreen from "expo-splash-screen";
import {Platform, StyleSheet, Text, View, Button} from "react-native";
import ToggleSwitch from "toggle-switch-react-native";
import MapView from "react-native-maps";

SplashScreen.hideAsync();

function TestZone(props) {

    return (
        <View style={styles.container}>
            <MapView style={styles.map} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export default TestZone;
