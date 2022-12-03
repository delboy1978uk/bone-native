import React from 'react';
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
import RNDateTimePicker from "@react-native-community/datetimepicker";
import * as Yup from "yup";

import colors from '../config/colors';
import Screen from '../components/Screen';
import Text from '../components/Text';
import useAuth from "../hooks/useAuth";
import {Form, FormField, FormImagePicker, FormPicker, SubmitButton} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";

const validationSchema = Yup.object().shape({
    firstname: Yup.string().required().min(2).max(60).label('First name'),
    middlename: Yup.string().min(1).max(60).label('Middle name'),
    lastname: Yup.string().required().min(1).max(60).label('Last name'),
    aka: Yup.string().min(1).max(50).label('Display name'),
    dob: Yup.date().required().label('Date of birth'),
    birthplace: Yup.string().required().label('Birthplace'),
    country: Yup.string().required().min(2).max(3).label('Country'),
    image: Yup.array().required().min(1, 'Please select at least one image')
});

function EditProfileScreen(props) {
    const { user } = useAuth();
    const person = user.person;
    console.log(person);
    const handleSubmit = () => {
        alert('process form!');
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
                        dob: person.dob,
                        birthplace: person.birthplace,
                        image: person.image,
                        country: person.country,
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
                    <FormField
                        name="dob"
                        placeholder="Date of Birth"
                        maxLength={50}
                    />
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
                    <SubmitButton color="primary" title="Save changes"/>
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
