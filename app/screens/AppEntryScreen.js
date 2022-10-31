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
import apiClient from "../api/client"
import logger from '../utility/logger';
import navigation from "../navigation/rootNavigation"
import navigationTheme from "../navigation/NavigationTheme"
import OfflineNotice from "../components/OfflineNotice"
import Screen from "../components/Screen";
import Text from "../components/Text"
import WelcomeScreen from "../screens/WelcomeScreen"
import RegistrationClient from '../api/registrationClient';
import settings from "../config/settings";
import Storage from "../auth/storage";

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

    useEffect(() => {

        // add our authorisation header (and optional xdebug header) to any api client requests
        apiClient.addAsyncRequestTransform(async request => {
            const authToken = await authStorage.getAuthToken();

            if (!authToken) {
                return;
            }

            if (settings.xDebugHeader === true) {
                if (!request.params) {
                    request.params = [];
                }
                request.params['XDEBUG_SESSION'] = 'PHPSTORM';
            }

            request.headers['Authorization']  = 'Bearer ' + authToken.accessToken;
        });

        // call to refresh an access token using our refresh token
        const refreshToken = async token => {
            const formData = new FormData();
            formData.append('client_id', settings.clientId);
            formData.append('grant_type', 'refresh_token');
            formData.append('refresh_token', token);
            formData.append('scope', 'basic');

            return await apiClient.post(settings.discovery.tokenEndpoint, formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            });
        }

        // check for a 401 response (expired access token), use refresh token to fetch new access token, retry request
        apiClient.addAsyncResponseTransform(async response => {

            if (response.ok) {
                return response.data;
            }

            if (response.problem) {
                const originalConfig = response.config;

                //Access Token was expired, grab a fresh one using the refresh token and try again
                if (originalConfig.url !== settings.discovery.authEndpoint && response.status === 401 && !originalConfig.retry) {
                    originalConfig.retry = true;
                    try {
                        const token = await Storage.getAuthToken();
                        if (token) {
                            const rs = await refreshToken(token.refreshToken);
                            const newToken = {
                                accessToken: rs.data.access_token,
                                expiresIn: rs.data.expires_in,
                                refreshToken: rs.data.refresh_token,
                                tokenType: rs.data.token_type,
                            };
                            authStorage.storeAuthToken(newToken);

                            return apiClient.any(originalConfig);
                        }
                    } catch (_error) {
                        // if we get here, the refresh token has also expired, log the user out.
                        logout();
                    }
                }


                return Promise.reject(response.problem);
            }
        });

        async function prepare() {
            try {
                console.log('trying to restore user')
                await restoreUser();
                console.log(user);
            } catch (e) {
                console.error('problam restoring user from storage');
            } finally {
                console.log('hiding splash screen')
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
