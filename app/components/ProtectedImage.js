import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, View} from "react-native";

import storage from '../auth/storage';
import * as Notifications from "expo-notifications";
import navigation from "../navigation/rootNavigation";
import useAuth from "../hooks/useAuth";
import authStorage from "../auth/storage";

function ProtectedImage({style, uri, onPress, handleError}) {
    const [authToken, setAuthToken] = useState(null);

    const getAuthTokenFromStorage = async () => {
        const token = await authStorage.getAuthToken();
        setAuthToken(token);
    };

    const initToken = async () => {
        if (null === authToken) {
            await getAuthTokenFromStorage();
        }
    }

    useEffect(() => {
        initToken()
    }, []);

    const tryAgain = async error => {
        if (handleError !== null) {
            handleError();
        }
        setTimeout(async () => {
            await getAuthTokenFromStorage()
        }, 1000);
    };

    return(
        null !== authToken &&
        <Image
            source={{ headers: {Authorization: 'Bearer ' + authToken.accessToken }, uri: uri}}
            style={style}
            onError={tryAgain}
        ></Image>
    );
}

const styles = StyleSheet.create({
    container: {}
})

export default ProtectedImage;


