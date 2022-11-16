import {Image, ImageBackground, StyleSheet, View} from "react-native";
import React, {useState} from "react";
import * as Yup from 'yup'

import Text from '../components/Text';
import ActivityIndicator from "../components/ActivityIndicator";
import Animation from "../components/Animation";
import {ErrorMessage, Form, FormField, SubmitButton} from "../components/forms";
import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";
import userApi from "../api/users";
import settings from "../config/settings";

const validationSchema = Yup.object().shape({
    password: Yup.string().required().min(4).label('Password'),
    confirm: Yup.string().required().oneOf([Yup.ref('password'), null], 'Passwords must match').label('Confirm')
});

function ActivateUserScreen({navigation, route}) {
    const activationApi = useApi(userApi.activateAccount);
    const [accessToken, setAccessToken] = useState(null);
    const [error, setError] = useState();
    const {login} = useAuth();
    const email = route.params.email;
    const token = route.params.token;

    const handleSubmit = async userInfo => {

        const result = await activationApi.request(email, token, settings.clientId, userInfo.password);

        if (!result.ok) {
            if (result.data) {
                setError(result.data.error);
            } else {
                setError('An unexpected error occured');
                console.error(result);
            }

            return;
        }

        login({accessToken: result.data.access_token, refreshToken: result.data.refresh_token});
    };

    return (
    <>
        <ActivityIndicator visible={activationApi.loading} type={'overlay'}/>
        <ImageBackground blurRadius={10} style={styles.container} source={require('../assets/background.png')} >
            { !accessToken &&
                <>
                    <Image style={styles.logo} source={require('../assets/logo.png')} />
                    <Form
                        initialValues={{ password: '', confirm: ''}}
                        onSubmit={handleSubmit}
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
                        <SubmitButton color="primary" title="Change Password" />
                    </Form>
                </>
            }
        </ImageBackground>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        width: 150,
        height: 105,
        alignSelf: "center",
        marginTop: 50,
        marginBottom: 20,
    },
})

export default ActivateUserScreen;


