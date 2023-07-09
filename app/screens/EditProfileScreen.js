import React, {useEffect, useState} from 'react';
import {
    Alert,
    Button,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from "react-native"
import {Field} from "formik";
import * as FileSystem from 'expo-file-system';
import {useAsyncStorage} from "@react-native-async-storage/async-storage";
import * as Yup from "yup";

import CameraScreen from '../screens/CameraScreen';
import colors from '../config/colors';
import ImageInput from '../components/ImageInput';
import Image from '../components/Image';
import Screen from '../components/Screen';
import Text from '../components/Text';
import {Form, FormDateTimePicker, FormField, SubmitButton} from "../components/forms";
import ActivityIndicator from "../components/ActivityIndicator";
import UploadScreen from "./UploadScreen";
import useApi from "../hooks/useApi";
import userApi from "../api/users";
import useAuth from "../hooks/useAuth";
import useCache from "../hooks/useCache";
import useCamera from "../hooks/useCamera";
import usePhotos from "../hooks/usePhotos";
import useStyle from "../hooks/useStyle";

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
    const style = useStyle();

    const { updateUser, user} = useAuth();
    const updateProfileApi = useApi(userApi.updateProfile);
    const userImageUploadApi = useApi(userApi.uploadUserImage);
    const userImageApi = useApi(userApi.userImage);
    const userBackgroundImageUploadApi = useApi(userApi.uploadUserBackgroundImage);
    const userBackgroundImageApi = useApi(userApi.userBackgroundImage);
    const camera = useCamera();
    const photos = usePhotos();
    const person = user.person;

    useEffect(() => {
        if(!profileImage) {
            setProfileImage(user.person.image);
        }
        if(!profileImage) {
            setProfileBackground(user.person.backgroundImage);
        }
    }, [])

    const handleSubmit = values => {
        updateProfileApi.request(values)
            .then(data => {
                user.person = data.data;
                updateUser(user);

            })
            .catch(console.error)
    };

    const cameraOrPhotos = phptoOrBackground => {
        const title = phptoOrBackground ===  'image' ? 'Edit Profile Photo' : 'Edit Profile Background'
        Alert.alert(
            title,
            null,
            [
                { text: 'Photos', onPress: () => selectImage('photos', phptoOrBackground) },
                { text: 'Camera', onPress: () => selectImage('camera', phptoOrBackground) },
                { text: 'Cancel', style: 'cancel' }
            ]
        );
    }

    const selectImage = async (pickerType, phptoOrBackground) => {
        try {
            if (pickerType === 'camera') {
                const result = await camera.takePhoto({
                    allowsEditing: true,
                    base64: true,
                    quality: 0.5
                });
                if (!result.canceled) {
                    handleSelection(result.assets[0].uri, phptoOrBackground);
                }
            } else {
                const result = await photos.selectImage({
                    quality: 0.5,
                    base64: true
                });

                if (!result.canceled) {
                    handleSelection(result.assets[0].uri, phptoOrBackground);
                }
            }

        } catch (error) {
            Alert.alert('Image error', 'Error reading image');
            console.error(error);
        }
    };

    const handleSelection = (uri, phptoOrBackground) => {
        if (phptoOrBackground === 'background-image')  {
            uploadImage(uri, userBackgroundImageUploadApi, 'background');
            setProfileBackground(uri);
            user.person.backgroundImage = uri;
        } else {
            uploadImage(uri, userImageUploadApi, 'avatar');
            setProfileImage(uri);
            user.person.image = uri;
        }
        updateUser(user);
    }

    const uploadImage = async (url, api, fieldName) => {
        let formData = new FormData();
        let filename = url.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        formData.append(fieldName, { uri: url, name: filename, type });
        const response = await api.request(formData).catch(e => {
            console.error('upload error', e);
        });
    }

    const styles = StyleSheet.create({
        container: {
            backgroundColor: style.backgroundColor
        },
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
            backgroundColor: colors.light,
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

    return (
        <>
            <KeyboardAvoidingView
                behavior="position"
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 140}
                style={styles.container}
            >
                <ActivityIndicator visible={updateProfileApi.loading || userImageApi.loading || userImageUploadApi.loading || userBackgroundImageApi.loading || userBackgroundImageUploadApi.loading  } type={'overlay'}/>
                <UploadScreen onDone={() => setProgressVisible(false)} progress={progress} visible={progressVisible}/>
                <ScrollView contentContainerStyle={styles.centred}>
                    <TouchableWithoutFeedback onPress={() => {cameraOrPhotos('background-image')}} >
                        <View style={styles.wallpaper}>
                            <Image style={styles.wallpaper} uri={profileBackground} />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => {cameraOrPhotos('image')}} >
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} uri={profileImage} />
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

export default EditProfileScreen;
