import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

import Button from '../components/Button'
import colors from '../config/colors'

function WelcomeScreen(props) {
    const navigation = useNavigation();

    return (
        <ImageBackground blurRadius={10} style={styles.background} source={require('../assets/background.png')} >
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/logo.png')} />
                <Text style={styles.tagline}>BONE FRAMEWORK</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="login" color="primary" onPress={() => navigation.navigate('Login')}></Button>
                <Button title="register" color="secondary" onPress={() => navigation.navigate('Register')}></Button>
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
    buttonContainer: {
        width: "100%",
        padding: 20
    },
    tagline: {
        fontSize: 50,
        fontWeight: 'bold',
        paddingTop: 10,
        color: colors.white,
        textAlign: 'center'
    },
});

export default WelcomeScreen;
