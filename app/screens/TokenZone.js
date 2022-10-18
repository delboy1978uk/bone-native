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
import usersApi from "../api/users";

WebBrowser.maybeCompleteAuthSession();

function TokenZone(props) {
    const {login, user} = useState(null);
    const [loginFailed, setLoginFailed] = useState(false);
    const [authToken, setAuthToken] = useState(null);
    const refreshApi = useApi(authApi.refreshAccessToken);

    const redirectUri = makeRedirectUri({
        scheme: settings.scheme,
        path: settings.authCallbackURL
    });

    const [authRequest, authResponse, promptAsync] = useAuthRequest(
        {
            clientId: settings.clientId,
            response_type: 'code',
            scopes: ['basic'],
            usePKCE: true,
            redirectUri: redirectUri,
        },
        settings.discovery
    );

    const getAccessToken = async code => {
        exchangeCodeAsync({
            clientId: settings.clientId,
            grant_type: 'authorization_code',
            redirectUri: redirectUri,
            usePKCE: true,
            code: code,
            extraParams: { code_verifier: request.codeVerifier }
        }, settings.discovery)
            .then(async response => {
                Storage.storeAuthToken(JSON.stringify(response));
                setHasToken(true);
            })
            .catch(error => console.error(error));

    }

    const refreshAccessToken = () => {
        refreshApi.request(authToken.refreshToken).then(console.log).catch(e => console.error(e));
    }

    useEffect(() => {
        const fetchTokenFromStorage = async () => {
            const token = await Storage.getAuthToken();
            setAuthToken(token);
        }
        fetchTokenFromStorage();

        if (authResponse?.type === 'success') {
            const { code } = authResponse.params;
            getAccessToken(code);
        }

    }, [authResponse]);

    const beginLogin = () => {
        if (authToken && !isExpired(authToken)) {
            alert('grab user profile, setUser');
        } else if (authToken && isExpired(authToken)) {
            // use refresh token to get access token, if it fails, setUser null and clear storage
            refreshAccessToken(authToken);
        } else {
            alert('start the login process!');
        }
    }

    const isExpired = authToken => {
        return true
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
            {user && <Text>You are loggedIn!</Text>}
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
