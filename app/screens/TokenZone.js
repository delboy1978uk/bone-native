import React, {useEffect, useState} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {StyleSheet, View} from "react-native";
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, exchangeCodeAsync, refreshAsync } from 'expo-auth-session';

import authApi from '../api/auth';
import Button from '../components/Button';
import settings from "../config/settings";
import Storage from '../auth/storage';
import Text from '../components/Text';
import useApi from '../hooks/useApi'
import useAuth from '../hooks/useAuth'
import usersApi from "../api/users";

WebBrowser.maybeCompleteAuthSession();
Date.prototype.getUnixTime = () => { return this.getTime()/1000|0 };

// Storage.removeAuthToken();

// Endpoint
const discovery = {
    authorizationEndpoint: settings.apiUrl + '/en_GB/oauth2/authorize',
    tokenEndpoint: settings.apiUrl + '/en_GB/oauth2/token',
};;

function TokenZone(props) {
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
        console.log('we gotr a code', code)
        exchangeCodeAsync({
            clientId: settings.clientId,
            grant_type: 'authorization_code',
            redirectUri: redirectUri,
            usePKCE: true,
            code: code,
            extraParams: { code_verifier: request.codeVerifier }
        }, discovery)
            .then(async response => {
                // login(response);
                console.log('logged in!');
            })
            .catch(error => console.error('urgh', error));

    }

    useEffect(() => {
        const fetchTokenFromStorage = async () => {
            const token = await Storage.getAuthToken();
            setAuthToken(token);
        }
        fetchTokenFromStorage();

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
        <View style={styles.container}>
            {!user &&
                <View>
                    <Text>Ahoy!</Text>
                    <Button
                        title="Login"
                        onPress={() => {
                            beginLogin();
                        }}
                    />
                </View>
            }
            {user && <>
                <Text>Welcome, { user.firstname }</Text>
                <Button
                    title="Try calling API"
                    onPress={() => getProfile()}
                />
            </>
            }
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

export default TokenZone;
