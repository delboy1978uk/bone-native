import React, {useState} from 'react';
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
import * as Yup from "yup";

import CameraScreen from '../screens/CameraScreen';
import colors from '../config/colors';
import ImageInput from '../components/ImageInput';
import ProtectedImage from '../components/ProtectedImage';
import Screen from '../components/Screen';
import Text from '../components/Text';
import userApi from "../api/users";
import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";
import {Form, FormDateTimePicker, FormField, SubmitButton} from "../components/forms";
import ActivityIndicator from "../components/ActivityIndicator";
import UploadScreen from "./UploadScreen";

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
    const { updateUser, user } = useAuth();
    const updateProfileApi = useApi(userApi.updateProfile);
    const userImageApi = useApi(userApi.userImage());
    const person = user.person;

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

    const selectImage = () => {
        alert('yes')
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

                    <TouchableWithoutFeedback onPress={() => {selectImage()}} >
                        <View style={styles.imageContainer}>
                            {person.image && <ProtectedImage style={styles.image} uri={user.person.image} />}
                            {!person.image &&
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
