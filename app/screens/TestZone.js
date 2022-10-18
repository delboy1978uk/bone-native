import React, {useState} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {StyleSheet, View} from "react-native";
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, exchangeCodeAsync, refreshAsync } from 'expo-auth-session';

import Button from '../components/Button';
import Text from '../components/Text';
import settings from "../config/settings";
import Storage from '../auth/storage';
import useApi from '../hooks/useApi'
import usersApi from "../api/users";

SplashScreen.hideAsync();
WebBrowser.maybeCompleteAuthSession();
// Storage.removeAuthToken();



function TestZone(props) {
    const profileApi = useApi(usersApi.getProfile);
    const [hasToken, setHasToken] = useState(false);

    const getProfile = async () => {
        const profile = await profileApi.request();
        console.log(profile.data);
    }

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

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { code } = response.params;
            getAccessToken(code);
        }
    }, [response]);

    return (
        <View style={styles.container}>
            <Text>Ahoy!</Text>
            {hasToken && <>
                <Text>We have a response</Text>
                <Button
                title="Try calling API"
                onPress={() => getProfile()}
                />
                </>
            }
            {!hasToken &&
                <Button
                disabled={!request}
                title="Login"
                onPress={() => {
                promptAsync();
            }}
                />
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

export default TestZone;
