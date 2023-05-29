import React, {useEffect, useState} from 'react';
import base64 from 'base-64';
import {
    Alert,
    Button,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {Field} from "formik";
import * as FileSystem from 'expo-file-system';
import {useAsyncStorage} from "@react-native-async-storage/async-storage";
import * as Yup from "yup";

import CameraScreen from '../screens/CameraScreen';
import colors from '../config/colors';
import ImageInput from '../components/ImageInput';
import ProtectedImage from '../components/ProtectedImage';
import Screen from '../components/Screen';
import Text from '../components/Text';
import {Form, FormDateTimePicker, FormField, SubmitButton} from "../components/forms";
import ActivityIndicator from "../components/ActivityIndicator";
import UploadScreen from "./UploadScreen";
import useApi from "../hooks/useApi";
import userApi from "../api/users";
import useAuth from "../hooks/useAuth";
import useCamera from "../hooks/useCamera";
import usePhotos from "../hooks/usePhotos";

const validationSchema = Yup.object().shape({
    firstname: Yup.string().required().min(2).max(60).label('First name'),
    middlename: Yup.string().min(1).max(60).label('Middle name'),
    lastname: Yup.string().required().min(1).max(60).label('Last name'),
    aka: Yup.string().min(1).max(50).label('Display name'),
    dob: Yup.date().required().label('Date of birth'),
    birthplace: Yup.string().required().label('Birthplace'),
    country: Yup.string().required().min(2).max(3).label('Country')
});

function EditProfileScreen(props) {
    const [progressVisible, setProgressVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [profileImage, setProfileImage] = useState(null);
    const [profileBackground, setProfileBackground] = useState(null);

    const storage = useAsyncStorage('profileImage');
    const { updateUser, user } = useAuth();
    const updateProfileApi = useApi(userApi.updateProfile);
    const userImageApi = useApi(userApi.userImage);
    const camera = useCamera();
    const photos = usePhotos();
    const person = user.person;

    const fetchProfileImage = async () => {
        const imageInStorage = await storage.getItem();

        if (!imageInStorage) {
            console.log('fetching image from api')
            const result = await userImageApi.request();
            const data =  base64.encode(result);
            storage.setItem(data);

            return data;
        } else {
            console.log('storage image ')
        }

        return imageInStorage;
    };

    const fetchProfileBackground = async () => {
        console.log('@todo background fetch')
    };

    const setImages = async () => {
        if (null === profileImage) {
            const image = await fetchProfileImage();
            console.log('storing image')
            console.log(image);
            setProfileImage(image);
        };
        null === profileBackground ? setProfileBackground(await fetchProfileBackground()) : null;
    }

    useEffect(() => {
        // storage.removeItem();
        setImages()
    },  []);

    const handleSubmit = values => {
        updateProfileApi.request(values)
            .then(data => {
                user.person = data.data;
                updateUser(user);

            })
            .catch(console.error)
    };

    const uploadImage = image => {
        console.log(image);
    };

    const cameraOrPhotos = () => {
        Alert.alert(
            'Please choose',
            null,
            [
                { text: 'Photos', onPress: () => selectImage('photos') },
                { text: 'Camera', onPress: () => selectImage('camera') },
                { text: 'Cancel', style: 'cancel' }
            ]
        );
    }

    const selectImage = async (pickerType) => {
        try {
            if (pickerType === 'camera') {
                const result = await camera.takePhoto({
                    allowsEditing: true,
                    base64: true,
                    quality: 0.5,
                });
                if (!result.canceled) {
                    uploadProfileImage(result.assets[0].uri);
                    setProfileImage('data:image/jpeg;base64,' + result.assets[0].base64);
                }
            } else {
                const result = await photos.selectImage({
                    quality: 0.5
                });
                result.canceled ? null : uploadProfileImage(result.assets[0].uri);
            }

        } catch (error) {
            Alert.alert('Image error', 'Error reading image');
            console.log(error);
        }
    };

    const uploadProfileImage = () => {
        alert('upload!');
    }

    const uploadProfileBackground = () => {
        alert('upload!');
    }

    return (
        <>
            <KeyboardAvoidingView
                behavior="position"
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 140}
                style={styles.container}
            >
                <ActivityIndicator visible={updateProfileApi.loading || userImageApi.loading} type={'overlay'}/>
                <UploadScreen onDone={() => setProgressVisible(false)} progress={progress}
                              visible={progressVisible}/>
                <ScrollView contentContainerStyle={styles.centred}>
                    <View style={styles.wallpaper}></View>

                    <TouchableWithoutFeedback onPress={() => {cameraOrPhotos()}} >
                        <View style={styles.imageContainer}>
                            {profileImage && <ProtectedImage style={styles.image} uri={profileImage} />}
                            {!profileImage &&
                                <Image style={styles.image} source={require('../assets/delboy.jpg')}></Image>}
                        </View>
                    </TouchableWithoutFeedback>
                    <Form
                        initialValues={{
                            firstname: person.firstname,
                            middlename: person.middlename,
                            lastname: person.lastname,
                            aka: person.aka,
                            dob: person.dob ? new Date(person.dob) : new Date(),
                            birthplace: person.birthplace,
                            image: person.image,
                            country: person.country?.iso,
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        <FormField
                            name="firstname"
                            placeholder="First name"
                            maxLength={60}
                        />
                        <FormField
                            name="middlename"
                            placeholder="Middle name"
                            maxLength={60}
                        />
                        <FormField
                            name="lastname"
                            placeholder="Last name"
                            maxLength={60}
                        />
                        <FormField
                            name="aka"
                            placeholder="Display name"
                            maxLength={50}
                        />
                        <FormDateTimePicker name={'dob'}/>
                        <FormField
                            name="birthplace"
                            placeholder="Birthplace"
                            maxLength={50}
                        />
                        <FormField
                            name="country"
                            placeholder="Country"
                            maxLength={3}
                        />
                        <SubmitButton color="primary" title="Update profile"/>
                    </Form>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
    wallpaper: {
        height: 240,
        width: '100%',
        backgroundColor: colors.secondary
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginTop: -75,
        borderColor: colors.white,
        borderWidth: 7,
    },
    fullWidth: {
        width: '100%'
    },
    centred: {
        width: '100%',
    },
    imageContainer: {
        alignItems: "center",
        width: '100%',
    }
})

export default EditProfileScreen;
