import {StyleSheet, View} from "react-native";

import Text from '../components/Text';
import Animation from "../components/Animation";
import React from "react";
import colors from "../config/colors";

function CheckEmailScreen(props) {
    return (
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
    );
}

const styles = StyleSheet.create({
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
        color: colors.white,
        textAlign: 'center'
    },
    info: {
        color: colors.white,
        textAlign: 'center'
    },
})

export default CheckEmailScreen;
