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

import colors from '../config/colors';
import Screen from '../components/Screen';
import Text from '../components/Text';
import useAuth from "../hooks/useAuth";
import {Form, FormField, FormImagePicker, FormPicker, SubmitButton} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label('Title'),
    price: Yup.number().required().min(0.01).max(10000).test(
        "maxDigitsAfterDecimal",
        "2 digits after decimal or less",
        (number) => /^\d+(\.\d{1,2})?$/.test(number)
    ).label('Price'),
    category: Yup.object().required().label('Category'),
    description: Yup.string().required().min(10).label('Description'),
    images: Yup.array().required().min(1, 'Please select at least one image')
});

function EditProfileScreen(props) {
    // const { user } = useAuth();
    const handleSubmit = () => {
        alert('process form!');
    };
    const handleImagePress = () => {
        alert('handle image press!');
    };

    const user = {person: {}, email: 'man@worek.com'}

    console.log(user);

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
                        title: '',
                        price: '',
                        category: '',
                        description: '',
                        images: []
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <FormField
                        name="title"
                        placeholder="Title"
                        maxLength={150}
                    />
                    <FormField
                        name="price"
                        placeholder="Price"
                        keyboardType="decimal-pad"
                        maxLength={8}
                        width={120}
                    />

                    <FormField
                        name="description"
                        maxLength={255}
                        multiline
                        numberOfLines={3}
                        placeholder="Description"
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
