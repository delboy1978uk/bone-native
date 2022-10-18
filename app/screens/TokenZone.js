import React, {useEffect, useState} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {StyleSheet, View} from "react-native";
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, exchangeCodeAsync } from 'expo-auth-session';

import Button from '../components/Button';
import Text from '../components/Text';
import settings from "../config/settings";
import Storage from '../auth/storage';
import useApi from '../hooks/useApi'
import usersApi from "../api/users";

function TokenZone(props) {

    const [user, setUser] = useState(null);
    const [authToken, setAuthToken] = useState(null);

    useEffect(() => {
        const fetchTokenFromStorage = async () => {
            const token = await Storage.getAuthToken();
            setAuthToken(token);
        }
        fetchTokenFromStorage();
    }, []);

    const login = () => {
        if (authToken && !isExpired(authToken)) {
            alert('grab user profile, setUser');
        } else if (authToken && isExpired(authToken)) {
            console.log(authToken);
            alert('use refresh token to get access token, if it fails, setUser null and clear storage')
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
                            login();
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
