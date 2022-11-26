import {StyleSheet, View} from "react-native";

import Text from '../components/Text';

function ResendActivationScreen(props) {
    return (
        <View style={styles.container}>
            <Text>Ahoy! Resend Activation</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default ResendActivationScreen;


