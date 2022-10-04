import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

import Button from '../components/Button'

function PlaceholderScreen(props) {
    return (
        <ImageBackground blurRadius={10} style={styles.background} source={require('../assets/background.png')} >
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/logo.png')} />
                <Text style={styles.tagline}>Under Construction</Text>
            </View>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 105
    },
    logoContainer: {
        position: 'absolute',
        top: 70,
        alignItems: "center"
    },
    tagline: {
        fontSize: 40,
        paddingTop: 10
    },
});

export default PlaceholderScreen;
