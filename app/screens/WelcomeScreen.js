import React, {useEffect, useState} from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {exchangeCodeAsync, makeRedirectUri, useAuthRequest} from "expo-auth-session";

import apiClient from '../api/client'
import Button from '../components/Button'
import colors from '../config/colors'
import useAuth from "../hooks/useAuth";
import settings from "../config/settings";
import Storage from "../auth/storage";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();
Date.prototype.getUnixTime = () => { return this.getTime()/1000|0 };

// Endpoint
const discovery = {
    authorizationEndpoint: settings.apiUrl + '/en_GB/oauth2/authorize',
    tokenEndpoint: settings.apiUrl + '/en_GB/oauth2/token',
};;

function WelcomeScreen(props) {
    const navigation = useNavigation();
    const {login, user} = useAuth();
    const [loginFailed, setLoginFailed] = useState(false);
    const [authToken, setAuthToken] = useState(null);

    const redirectUri = makeRedirectUri({
        scheme: settings.scheme,
        path: settings.authCallbackURL
    });

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: settings.clientId,
            response_type: 'code',
            scopes: ['basic'],
            usePKCE: true,
            redirectUri: redirectUri,
        },
        discovery
    );

    const getAccessToken = async code => {
        await exchangeCodeAsync({
            clientId: settings.clientId,
            grant_type: 'authorization_code',
            redirectUri: redirectUri,
            usePKCE: true,
            code: code,
            extraParams: { code_verifier: request.codeVerifier }
        }, discovery)
            .then(newToken => {
                const timeout = (newToken.expiresIn - 30) * 1000;
                setTimeout(() => {
                    apiClient.refreshToken(newToken.refreshToken, user);
                }, timeout);
                login(newToken);
            })
            .catch(error => console.error('urgh', error));
    }

    useEffect(() => {
        if (response?.type === 'success') {
            const { code } = response.params;
            getAccessToken(code);
        }

    }, [response]);

    const beginLogin = () => {
        try {
            promptAsync();
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <ImageBackground blurRadius={10} style={styles.background} source={require('../assets/background.png')} >
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/logo.png')} />
                <Text style={styles.tagline}>BONE FRAMEWORK</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="login" color="primary" onPress={() => beginLogin()}></Button>
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
