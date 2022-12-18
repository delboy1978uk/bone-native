import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, View} from "react-native";

import storage from '../auth/storage';
import * as Notifications from "expo-notifications";
import navigation from "../navigation/rootNavigation";
import useAuth from "../hooks/useAuth";
import AuthContext from "../auth/context";

function ProtectedImage({style, uri}) {
    const {user} = useContext(AuthContext);

    console.log(user);
    console.log(uri);

    return(
        <Image
            source={{ headers: {Authorization: 'Bearer ' + user.authToken.accessToken }, uri: uri}}
            style={style}
        ></Image>
    );
}

const styles = StyleSheet.create({
    container: {}
})

export default ProtectedImage;


