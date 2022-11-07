import React, {useEffect, useRef, useState} from 'react';
import {Image, ImageBackground, StyleSheet, View} from "react-native";
import * as Yup from 'yup'

import ActivityIndicator from "../components/ActivityIndicator";
import Animation from "../components/Animation";
import authApi from "../api/auth";
import colors from "../config/colors";
import useApi from "../hooks/useApi";
import usersApi from '../api/users';
import useAuth from "../hooks/useAuth";
import {ErrorMessage, FormField, Form, SubmitButton} from '../components/forms'
import Screen from '../components/Screen'
import Text from '../components/Text'
import Progress from "react-native-progress";

const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(3).label('Name'),
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(4).label('Password'),
    confirm: Yup.string().required().oneOf([Yup.ref('password'), null], 'Passwords must match').label('Confirm')
});

function RegisterScreen(props) {
    const registerApi = useApi(usersApi.register);
    const loginApi = useApi(authApi.login);
    const auth = useAuth();
    const [error, setError] = useState();
    const [checkEmail, setCheckEmail] = useState(false);

    const handleSubmit = async userInfo => {
        console.log('posing form', userInfo)
        const result = await registerApi.request(userInfo);

        if (!result.ok) {
            console.log('error!!!')
            if (result.data) {
                setError(result.data.error);
            } else {
                setError('An unexpected error occured');
                console.error(result);
            }

            return;
        }

        setCheckEmail(true);
    };

    return (
        <>
        <ActivityIndicator visible={registerApi.loading || loginApi.loading} type={'overlay'}/>
        <ImageBackground blurRadius={10} style={styles.background} source={require('../assets/background.png')} >
            { checkEmail &&
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
            { !checkEmail &&
                <>
                    <Image style={styles.logo} source={require('../assets/logo.png')} />

                    <Form
                        initialValues={{name: '', email: '', password: '', confirm: ''}}
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
                        <FormField
                            name="confirm"
                            autoCaptitalize="none"
                            autoCorrect={false}
                            icon="lock"
                            placeholder="Confirm password"
                            secureTextEntry
                            textContentType="password"
                        />
                        <SubmitButton color="primary" title="Register" />
                    </Form>
                </>
            }
        </ImageBackground>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
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
    logo: {
        width: 150,
        height: 105,
        alignSelf: "center",
        marginTop: 50,
        marginBottom: 20,
    },
    background: {
        height: '100%'
    },
})

export default RegisterScreen;
