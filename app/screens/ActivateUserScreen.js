import {Image, ImageBackground, Keyboard, StyleSheet, View} from "react-native";
import React, {useState} from "react";
import * as Yup from 'yup'

import Button from '../components/Button';
import colors from '../config/colors';
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
    const resendActivationApi = useApi(userApi.resendactivationEmail);
    const [accessToken, setAccessToken] = useState(null);
    const [error, setError] = useState();
    const [mailSent, setMailSent] = useState(false);
    const [tokenError, setTokenError] = useState();
    const {login} = useAuth();
    const email = route.params.email;
    const token = route.params.token;

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
                            setTokenError(result.data.error)
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
            .then(response => {
                if (response.ok) {
                    setMailSent(true);
                } else {
                    console.error(response.originalError);
                }
            })
            .catch(console.error);
    }

    return (
    <>
        <ActivityIndicator visible={activationApi.loading || resendActivationApi.loading} type={'overlay'}/>
        <ImageBackground blurRadius={10} style={styles.container} source={require('../assets/background.png')} >
            { !accessToken && !tokenError &&
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
                        <SubmitButton color="primary" title="Set Password" />
                    </Form>
                </>
            }
            { tokenError && !mailSent &&
                <>
                    <Image style={styles.logo} source={require('../assets/logo.png')} />
                    <Text style={styles.tokenError}>{tokenError}</Text>
                    <Text style={styles.resendText}>You will need a fresh acivation email in order to continue creating your account.</Text>
                    <Button color={'primary'} title={'Resend email'} onPress={resendActivationEmail}/>
                </>
            }
            { tokenError && mailSent &&
                <View style={styles.animationContainer}>
                    <Animation
                        autoPlay={true}
                        loop={true}
                        source={require('../assets/animations/email.json')}
                        style={styles.animation}
                        speed={1}
                    />
                    <Text style={styles.activate}>Activate your account</Text>
                    <Text style={styles.info}>Check your email and click on the link to open the app and activate your account.</Text>
                </View>
            }
        </ImageBackground>
        </>
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
    resendText: {
        color: colors.white,
        fontSize: 17,
        marginBottom: 20,
        textAlign: 'center'
    },
    tokenError: {
        color: colors.white,
        fontSize: 25,
        marginBottom: 10,
        textAlign: 'center'
    },
    animationContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: 10,
        marginTop: -50
    },
    animation: {
        width: 150,
    },
    activate: {
        marginTop: 20,
        textTransform: 'uppercase',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: colors.white
    },
    info: {
        color: colors.white,
        textAlign: 'center'
    },
})

export default ActivateUserScreen;


