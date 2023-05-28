import React, {useEffect} from 'react';
import {Alert, Image, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from 'expo-camera';

import colors from '../config/colors'
import Icon from './Icon'

function ImageInput({imageUri, onChangeImage = () => {}}) {

    useEffect(() => {
        requestPermission();
    }, []);

    const requestPermission = async () => {
        const { granted: mediaLibraryGranted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const { granted: cameraGranted } = await Camera.requestCameraPermissionsAsync();

        if (!mediaLibraryGranted || !cameraGranted) {
            Alert.alert(
                'Device settings alert',
                'You need to allow media library and camera permissions for this to work'
            );
        }
    }

    const handlePress = () => {
        if (!imageUri) {
            Alert.alert(
                'Please choose',
                null,
                [
                    {
                        text: 'Photos',
                        onPress: () => selectImage('photos')
                    },
                    {
                        text: 'Camera',
                        onPress: () => selectImage('camera')
                    },
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    }
                ]
            );
        } else {
            Alert.alert('Remove', 'are you sure you want to remove this image?', [
                { text: 'Yes', onPress: () => onChangeImage(null)},
                { text: 'No'},
            ]);
        }
    };

    const selectImage = async (pickerType) => {
        try {
            if (pickerType === 'camera') {
                const result = await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    quality: 0.5
                });
                if (!result.canceled) {
                    onChangeImage(result.assets[0].uri);
                }
            } else {
                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    quality: 0.5
                });
                if (!result.canceled) {
                    onChangeImage(result.assets[0].uri);
                }
            }

        } catch (error) {
            Alert.alert('Image error', 'Error reading image');
            console.log(result);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.container}>
                {!imageUri ? (
                    <Icon name="camera" size={75} iconColor={colors.medium} />
                ) : (
                    <Image source={{ uri: imageUri }} style={styles.image} />
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.light,
        borderRadius: 15,
        justifyContent: 'center',
        height: 100,
        width: 100,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
    }
})

export default ImageInput;
