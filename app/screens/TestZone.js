import React, {useRef, useState} from 'react';
import * as SplashScreen from "expo-splash-screen";
import {StyleSheet, Text, View} from 'react-native';

import CameraScreen from '../screens/CameraScreen';

SplashScreen.hideAsync();

function TestZone(props)
{
    return <CameraScreen onClose={() => alert('closed!')} onPhotoSelected={uri => alert(uri) }/>
}

const styles = StyleSheet.create({

})

export default TestZone;


