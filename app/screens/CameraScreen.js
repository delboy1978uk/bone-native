import React, {useRef, useState} from 'react';
import { Camera, CameraType,  } from 'expo-camera';
import {Alert, Button, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Icon from '../components/Icon'
import Screen from '../components/Screen'
import RoundIconButton from '../components/RoundIconButton'
import colors from "react-native/Libraries/NewAppScreen/components/Colors";
import * as ImagePicker from "expo-image-picker";

function CameraScreen({ onPhotoSelected = uri => {}, onClose = () => {} }) {

    const cameraRef = useRef();
    const [type, setType] = useState(CameraType.back);
    const [cameraReady, setCameraReady] = useState(false);
    const [preview, setPreview] = useState(false);
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

                return;
            }
        });
    }

    const toggleCameraType = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const takePicture = () => {
        cameraRef.current.takePictureAsync().then( image => {
            setPreview(image);
        });
    }

    const retakePicture = () => {
        setPreview(false);
    }

    const confirmPicture = () => {
        onPhotoSelected(preview.uri);
    }

    const selectPhoto = async () => {
        const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!granted) {
            Alert.alert('Device settings alert', 'You need to allow media library permissions for this to work');

            return;
        }

        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.5
            });

            if (!result.canceled) {
                onPhotoSelected(result.assets[0].uri);
            }
        } catch (error) {
            Alert.alert('Image error', 'Error reading image');
            console.error(error)
        }
    }

    return (
        <Screen style={styles.container}>

            {!preview && <Camera style={styles.camera} type={type} ref={cameraRef} onCameraReady={initCamera}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                        <Icon size={75} name={'close'} />
                    </TouchableOpacity>
                    <View style={styles.topButtons} >
                        <TouchableOpacity onPress={selectPhoto}>
                            <Icon size={75} name={'image'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleCameraType}>
                            <Icon size={75} name={'camera-flip'} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.takePictureButtonContainer} >
                    { cameraReady && <RoundIconButton icon={'camera'} onPress={takePicture} /> }
                </View>
            </Camera> }

            { preview && <ImageBackground blurRadius={10} style={styles.background} source={{uri: preview.uri }} >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                        <Icon size={75} name={'close'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.topButtons} onPress={retakePicture}>
                        <Icon size={75} name={'camera-retake'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.takePictureButtonContainer} >
                    <RoundIconButton icon={'check'} onPress={confirmPicture} style={styles.useImageButton} />
                </View>
            </ImageBackground> }
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
    topButtons: {
        flex: 1,
        height: 50,
        justifyContent: "flex-end",
        flexDirection: 'row'
    },
    text: {
        color: 'white',
        fontSize: 20
    },
    background: {
        height: '100%',
        width: '100%',
        flex: 1,
        justifyContent: 'flex-end'
    },
    useImageButton: {
        backgroundColor: 'green',
    }
})

export default CameraScreen;
