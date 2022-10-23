import React, {useState} from 'react';
import {Image, StyleSheet, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import * as Yup from 'yup'

import authApi from '../api/auth';
import authStorage from '../auth/storage';
import {ErrorMessage, FormField, Form, SubmitButton} from '../components/forms'
import Screen from '../components/Screen'

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(4).label('Password'),
});
function LoginScreen(props) {
    const {login, user} = useAuth();
    const [loginFailed, setLoginFailed] = useState(false);

    const handleSubmit = async ({email, password}) => {
        // const clientSettings = await authStorage.getClientCredentials();
        // const result = await authApi.login(email, password, clientSettings);
        // console.log(result);
        // if (!result.ok) {
        //     return setLoginFailed(true);
        // }
        //
        // setLoginFailed(false);
        // login(result.data);
    };

    return (
        <Screen style={styles.container}>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
            <Form
                initialValues={{email: '', password: ''}}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <ErrorMessage error={'Invalid email or password'} visible={loginFailed} />
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
                <SubmitButton color="primary" title="Login" />
            </Form>
        </Screen>
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

export default LoginScreen;
