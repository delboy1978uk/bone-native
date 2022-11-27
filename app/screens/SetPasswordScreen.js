import React, {useState} from 'react';
import {Image, Keyboard, StyleSheet, View} from "react-native";
import * as Yup from "yup";

import {ErrorMessage, Form, FormField, SubmitButton} from "../components/forms";
import settings from "../config/settings";

const validationSchema = Yup.object().shape({
    password: Yup.string().required().min(4).label('Password'),
    confirm: Yup.string().required().oneOf([Yup.ref('password'), null], 'Passwords must match').label('Confirm')
});

function SetPasswordScreen({submitCallback, error}) {

    return(
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
            <Form
                initialValues={{ password: '', confirm: ''}}
                onSubmit={submitCallback}
                validationSchema={validationSchema}
            >
                <ErrorMessage error={error} visible={error} />
                <FormField
                    name="password"
                    autoCaptitalize="none"
                    autoCorrect={false}
                    icon="lock"
                    placeholder="Password"
                    secureTextEntry
                    textContentType="password"
                />
                <FormField
                    name="confirm"
                    autoCaptitalize="none"
                    autoCorrect={false}
                    icon="lock"
                    placeholder="Confirm password"
                    secureTextEntry
                    textContentType="password"
                />
                <SubmitButton color="primary" title="Set Password" />
            </Form>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    logo: {
        width: 150,
        height: 105,
        alignSelf: "center",
        marginTop: 50,
        marginBottom: 20,
    },
})

export default SetPasswordScreen;
