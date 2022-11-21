import React, {useEffect, useRef, useState} from 'react';
import {Image, ImageBackground, Keyboard, StyleSheet, View} from "react-native";
import * as Yup from 'yup'

import ActivityIndicator from "../components/ActivityIndicator";
import Animation from "../components/Animation";
import colors from "../config/colors";
import useApi from "../hooks/useApi";
import usersApi from '../api/users';
import useAuth from "../hooks/useAuth";
import {ErrorMessage, FormField, Form, SubmitButton} from '../components/forms'
import Screen from '../components/Screen'
import Text from '../components/Text'
import Progress from "react-native-progress";

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
});

function RegisterScreen(props) {
    const registerApi = useApi(usersApi.register);
    const auth = useAuth();
    const [error, setError] = useState();
    const [checkEmail, setCheckEmail] = useState(false);

    const handleSubmit = async userInfo => {
        Keyboard.dismiss();
        const result = await registerApi.request(userInfo);

        if (!result.ok) {
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
        <ActivityIndicator visible={registerApi.loading} type={'overlay'}/>
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
                <View style={styles.container}>
                    <Image style={styles.logo} source={require('../assets/logo.png')} />

                    <Form
                        initialValues={{ email: ''}}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        <ErrorMessage error={error} visible={error} />
                        <FormField
                            name="email"
                            icon="email"
                            placeholder="Email"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            textContentType="emailAddress"
                        />
                        <SubmitButton color="primary" title="Register" />
                    </Form>
                </View>
            }
        </ImageBackground>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
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
    }
})

export default RegisterScreen;
