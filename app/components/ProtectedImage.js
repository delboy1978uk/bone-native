import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, View} from "react-native";

import storage from '../auth/storage';
import * as Notifications from "expo-notifications";
import navigation from "../navigation/rootNavigation";
import useAuth from "../hooks/useAuth";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";

function ProtectedImage({style, uri, onPress}) {
    const {user} = useContext(AuthContext);


    const handleError = error => {
        console.log(error)
    };

    return(
        <Image
            source={{ headers: {Authorization: 'Bearer ' + user.authToken.accessToken }, uri: uri}}
            style={style}
            onError={handleError}
        ></Image>
    );
}

const styles = StyleSheet.create({
    container: {}
})

export default ProtectedImage;


