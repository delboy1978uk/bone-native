import React, {useRef, useState} from 'react';
import * as SplashScreen from "expo-splash-screen";
import { Camera, CameraType,  } from 'expo-camera';
import {Alert, Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Icon from '../components/Icon'
import Screen from '../components/Screen'
import RoundIconButton from '../components/RoundIconButton'

SplashScreen.hideAsync();

function TestZone(props) {
    const cameraRef = useRef();
    const [type, setType] = useState(CameraType.back);
    const [cameraReady, setCameraReady] = useState(false);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    const askCameraPermission = async () => {
        return await requestPermission();
    }
    const initCamera = () => {
        setCameraReady(true);
    }

    if (!permission) {
        askCameraPermission().then(permission => {
            if (!permission.granted) {
                Alert.alert('Device settings alert', 'You need to allow camera permissions for this to work');
            }
        });
    }

    const toggleCameraType = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const takePicture = () => {
        console.log('taking piucture?');
        cameraRef.current.takePictureAsync().then(console.log);
    }

    return (
        <Screen style={styles.container}>
            <Camera style={styles.camera} type={type} ref={cameraRef} onCameraReady={initCamera}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.cancelButton} onPress={toggleCameraType}>
                        <Icon size={75} name={'close'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flipButton} onPress={toggleCameraType}>
                        <Icon size={75} name={'camera-flip'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.takePictureButtonContainer} >
                    { cameraReady && <RoundIconButton icon={'camera'} onPress={takePicture} /> }
                </View>
            </Camera>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    camera: {
        flex: 1,
        width: '100%'
    },
    buttonContainer: {
        height: 50,
        width: '100%',
        alignItems: 'flex-end',
        flexDirection: 'row',
    },
    takePictureButtonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    cancelButton: {
        flex: 1,
        height: 50,
        alignItems: "flex-start"
    },
    flipButton: {
        flex: 1,
        height: 50,
        alignItems: "flex-end"
    },
    text: {
        color: 'white',
        fontSize: 20
    }
})

export default TestZone;


