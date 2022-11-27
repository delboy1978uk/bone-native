import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from 'expo-splash-screen';

// import ApiInterceptor from "../components/ApiInterceptor"
import AppNavigator from "../navigation/AppNavigator"
import AuthContext from "../auth/context"
import AuthNavigator from "../navigation/AuthNavigator"
import authStorage from "../auth/storage"
import Button from "../components/Button"
import apiClient from "../api/client"
import logger from '../utility/logger';
import navigation from "../navigation/rootNavigation"
import navigationTheme from "../navigation/NavigationTheme"
import OfflineNotice from "../components/OfflineNotice"
import Screen from "../components/Screen";
import Text from "../components/Text"
import WelcomeScreen from "../screens/WelcomeScreen";
import settings from "../config/settings";
import Storage from "../auth/storage";

logger.start();
SplashScreen.preventAutoHideAsync();

export default function AppEntryScreen() {

    const [user, setUser] = useState();
    const [isReady, setIsReady] = useState(false);

    const restoreUser = async () => {
        const authToken = await authStorage.getAuthToken();

        if (authToken) {
            const user = await authStorage.getUser();

            if (user) {
                setUser(user);
            }
        }
    };

    useEffect(() => {
        async function prepare() {
            try {
                await restoreUser();
            } catch (e) {
                console.error('problam restoring user from storage');
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
