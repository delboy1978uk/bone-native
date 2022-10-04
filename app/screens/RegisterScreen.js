import React, {useState} from 'react';
import {Image, StyleSheet, View} from "react-native";
import * as Yup from 'yup'

import useApi from "../hooks/useApi";
import usersApi from '../api/users';
import authApi from "../api/auth";
import useAuth from "../hooks/useAuth";
import {ErrorMessage, FormField, Form, SubmitButton} from '../components/forms'
import Screen from '../components/Screen'
import ActivityIndicator from "../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(3).label('Name'),
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(4).label('Password'),
});

function RegisterScreen(props) {
    const registerApi = useApi(usersApi.register);
    const loginApi = useApi(authApi.login);
    const auth = useAuth();
    const [error, setError] = useState();

    const handleSubmit = async userInfo => {
        const result = await registerApi.request(userInfo);

        if (!result.ok) {
            if (result.data) {
                setError(result.data.error);
            } else {
                setError('An unexpected error occured');
                console.log(result.data);
            }

            return;
        }

        setError(false);
        const { data: authToken } = await loginApi.request(
            userInfo.email,
            userInfo.password
        );
        auth.login(authToken);
    };

    return (
        <>
        <ActivityIndicator visible={registerApi.loading || loginApi.loading} type={'overlay'}/>
            <Screen style={styles.container}>
            <Image style={styles.logo} source={require('../assets/logo.png')} />

            <Form
                initialValues={{name: '', email: '', password: ''}}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <ErrorMessage error={error} visible={error} />
                <FormField
                    name="name"
                    icon="account"
                    placeholder="Name"
                />
                <FormField
                    name="email"
                    icon="email"
                    placeholder="Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                />
                <FormField
                    name="password"
                    autoCaptitalize="none"
                    autoCorrect={false}
                    icon="lock"
                    placeholder="Password"
                    secureTextEntry
                    textContentType="password"
                />
                <SubmitButton color="primary" title="Register" />
            </Form>
        </Screen>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    logo: {
        width: 150,
        height: 105,
        alignSelf: "center",
        marginTop: 50,
        marginBottom: 20,
    }
})

export default RegisterScreen;
