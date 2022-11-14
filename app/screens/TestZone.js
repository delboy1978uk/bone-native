import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Linking from 'expo-linking';

import Text from '../components/Text';

SplashScreen.hideAsync();

function TestZone(props) {

    const url = Linking.useURL();

    useEffect(() => {
        if (url) {
            const parts = Linking.parse(url);

            if (parts.path !== null && parts.path !== '') {
                alert(parts.path);
            }
        }
    }, [url]);


    return (
        <View style={styles.container}>
            <Text>Ahoy! {url}</Text>
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


