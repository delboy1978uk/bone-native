import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {StyleSheet, View} from "react-native";

import Text from '../components/Text';

SplashScreen.hideAsync();

function TestZone(props) {
    return (
        <View style={styles.container}>
            <Text>Ayoy!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default TestZone;
