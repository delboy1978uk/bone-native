import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from 'expo-splash-screen';

import AppNavigator from "../navigation/AppNavigator"
import AuthContext from "../auth/context"
import AuthNavigator from "../navigation/AuthNavigator"
import authStorage from "../auth/storage"
import Button from "../components/Button"
import logger from '../utility/logger';
import navigation from "../navigation/rootNavigation"
import navigationTheme from "../navigation/NavigationTheme"
import OfflineNotice from "../components/OfflineNotice"
import Screen from "../components/Screen";
import Text from "../components/Text"
import WelcomeScreen from "../screens/WelcomeScreen"
import RegistrationClient from '../api/registrationClient';

logger.start();
SplashScreen.preventAutoHideAsync();

export default function AppEntryScreen() {

    const [user, setUser] = useState();
    const [isReady, setIsReady] = useState(false);
    const [token, setToken] = useState(false);

    const restoreUser = async () => {
        const user = await authStorage.getUser();

        if (user) {
            setUser(user);
        }
    };

    const initClient = async () => {
        const credentials = await authStorage.getClientCredentials();

        if (!credentials) {
            const response = await RegistrationClient.getRegistrationClientToken();

            if (response.ok) {
                const token = response.data.access_token;
                const registerResponse = await RegistrationClient.registerDevice(token);

                if (registerResponse.ok) {
                    const client = registerResponse.data;
                    authStorage.storeClientCredentials(client);
                }
            } else {
                logger.log(response.problem);
            }
        } else {
            console.log('we have credentials!', credentials);
        }
    };

    useEffect(() => {
        async function prepare() {
            try {
                await restoreUser();
                await initClient();
            } catch (e) {
                console.warn(e);
            } finally {
                setIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (isReady) {
            await SplashScreen.hideAsync();
        }
    }, [isReady]);

    if (!isReady) {
        return null;
    }

    return (
        <View style={{height: '100%'}} onLayout={onLayoutRootView}>
            <AuthContext.Provider value={{user, setUser}}>
                <OfflineNotice/>
                <NavigationContainer ref={navigation.navigationRef} theme={navigationTheme}>
                    {user ? <AppNavigator/> : <AuthNavigator/>}
                </NavigationContainer>
            </AuthContext.Provider>
        </View>
    )
}
