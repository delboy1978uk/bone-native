import {StyleSheet, View} from "react-native";

import Text from '../components/Text';

function ActivateUserScreen(props) {

    return (
        <View style={styles.container}>
            <Text>User Activation</Text>
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


