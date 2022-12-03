import React, {useState} from 'react';
import {
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

import colors from '../config/colors';
import Screen from '../components/Screen';
import Text from '../components/Text';
import userApi from "../api/users";
import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";
import {Form, FormDateTimePicker, FormField, SubmitButton} from "../components/forms";
import ActivityIndicator from "../components/ActivityIndicator";

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
    const { user } = useAuth();
    const updateProfileApi = useApi(userApi.updateProfile);
    const person = user.person;

    const handleSubmit = values => {
        updateProfileApi.request(values)
            .then(console.log)
            .catch(console.error)
    };

    const handleImagePress = () => {
        alert('handle image press!');
    };

    return (
        <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 140}
            style={styles.container}
        >
            <ActivityIndicator visible={updateProfileApi.loading}  type={'overlay'}/>
            <ScrollView contentContainerStyle={styles.centred}>
                <View style={styles.wallpaper}></View>
                <View style={styles.imageContainer}>
                    {user.image && <Image style={styles.image} source={user.image}></Image>}
                    {!user.image &&
                        <TouchableWithoutFeedback onPress={handleImagePress}>
                            <Image style={styles.image} source={require('../assets/delboy.jpg')}></Image>
                        </TouchableWithoutFeedback>
                    }
                </View>
                <Form
                    initialValues={{
                        firstname: person.firstname,
                        middlename: person.middlename,
                        lastname: person.lastname,
                        aka: person.aka,
                        dob: person.dob ? person.dob : new Date(),
                        birthplace: person.birthplace,
                        image: person.image,
                        country: person.country.iso,
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
                    <FormDateTimePicker name={'dob'} />
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
        width: '100%'
    }
})

export default EditProfileScreen;
