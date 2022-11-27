import {Image, ImageBackground, Keyboard, StyleSheet, View} from "react-native";
import * as Linking from 'expo-linking';
import React, {useEffect, useState} from "react";
import * as Yup from 'yup'

import Button from '../components/Button';
import colors from '../config/colors';
import CheckEmailScreen from '../screens/CheckEmailScreen';
import Text from '../components/Text';
import ActivityIndicator from "../components/ActivityIndicator";
import Animation from "../components/Animation";
import {ErrorMessage, Form, FormField, SubmitButton} from "../components/forms";
import ResendActivationScreen from "../screens/ResendActivationlScreen";
import SetPasswordScreen from "../screens/SetPasswordScreen";
import routes from "../navigation/routes";
import settings from "../config/settings";
import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";
import useLinking from "../hooks/useLinking";
import userApi from "../api/users";

function ActivateUserScreen({navigation, route}) {
    const STATUS_VALIDATE = 'validate_email_token';
    const STATUS_RESEND = 'resend_email_token';
    const STATUS_SET_PASSWORD = 'set_password';
    const activationApi = useApi(userApi.activateAccount);
    const resendActivationApi = useApi(userApi.resendactivationEmail);
    const validateEmailTokenApi = useApi(userApi.validateEmailToken);
    const [status, setStatus] = useState(STATUS_VALIDATE);
    const [error, setError] = useState();
    const [tokenError, setTokenError] = useState();
    const {login} = useAuth();
    const url = Linking.useURL();
    const email = route.params.email;
    const token = route.params.token;

    const validateEmailToken = async () => {
        const result = await validateEmailTokenApi.request(email, token);

        if (result.data.ok) {
            setStatus(STATUS_SET_PASSWORD);
        }

        if (result.data.error) {
            setTokenError(result.data.error);

            switch (result.data.error) {
                case 'The email link has expired.':
                    setStatus(STATUS_RESEND);
                    break;
            }
        }
    }

    const handleSubmit = async userInfo => {
        Keyboard.dismiss();
        try {
            const result = await activationApi.request(email, token, settings.clientId, userInfo.password);

            if (!result.ok) {
                if (result.data) {
                    switch (result.data.error) {
                        case 'The email link has expired.':
                        case 'A matching email link was not found':
                        case 'The token did not match.':
                            setTokenError(result.data.error);
                            break;
                    }
                    setError(result.data.error);
                } else {
                    setError('An unexpected error occured');
                    console.error(result);
                }

                return;
            }

            login({accessToken: result.data.access_token, refreshToken: result.data.refresh_token});
        } catch (error) {
            setError(error);
            console.error(error);
        }

    };

    const resendActivationEmail = async () => {
        resendActivationApi
            .request(email)
            .then(setStatus(STATUS_VALIDATE))
            .then(navigation.goBack())
            .then(navigation.navigate(routes.USER_ACTIVATION_CHECK_EMAIL))
            .catch(console.error);
    }

    useEffect(() => {
        console.log(status);
        if (status === STATUS_VALIDATE) {
            validateEmailToken();
        }
    });

    return (
        <>
            <ActivityIndicator visible={activationApi.loading || resendActivationApi.loading || validateEmailTokenApi.loading} type={'overlay'}/>
            <ImageBackground blurRadius={10} style={styles.container} source={require('../assets/background.png')} >
                { (status === STATUS_SET_PASSWORD || status === STATUS_VALIDATE)  && <SetPasswordScreen submitCallback={handleSubmit} error={error}/> }
                { status === STATUS_RESEND && <ResendActivationScreen email={email} tokenError={tokenError} submitCallback={resendActivationEmail}/> }
            </ImageBackground>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    }
})

export default ActivateUserScreen;


