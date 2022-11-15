import {StyleSheet, View} from "react-native";

import Text from '../components/Text';

function ActivateUserScreen({navigation, route}) {
    const email = route.params.email;
    const token = route.params.token;

    return (
        <View style={styles.container}>
            <Text>User Activation</Text>
            <Text>{email}</Text>
            <Text>{token}</Text>
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

export default ActivateUserScreen;


