import {StyleSheet, View} from "react-native";
import * as SplashScreen from "expo-splash-screen";

import Text from '../components/Text';

SplashScreen.hideAsync();

function TestZone(props) {
    return (
        <View style={styles.container}>
            <Text>Ahoy!</Text>
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

export default TestZone;


