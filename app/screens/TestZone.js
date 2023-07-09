import {useState} from "react";
import * as SplashScreen from "expo-splash-screen";
import {Platform, StyleSheet, Text, View, Button} from "react-native";
import ToggleSwitch from "toggle-switch-react-native";

SplashScreen.hideAsync();

function TestZone(props) {
    const [state, setState] = useState( {
        isOnDefaultToggleSwitch: true,
        isOnLargeToggleSwitch: false,
        isOnBlueToggleSwitch: false
    });

    const onToggle = (isOn) => {
        console.log("Changed to " + isOn);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Example Toggle Switch</Text>
            <Text style={styles.instructions}>Default Toggle</Text>
            <ToggleSwitch
                label="Hello"
                isOn={state.isOnDefaultToggleSwitch}
                onToggle={isOnDefaultToggleSwitch => {
                    setState({isOnDefaultToggleSwitch});
                    onToggle(isOnDefaultToggleSwitch);
                }}
            />
            <Text style={styles.instructions}>Default Toggle Large</Text>
            <ToggleSwitch
                label="Hello"
                size="large"
                isOn={state.isOnLargeToggleSwitch}
                onToggle={isOnLargeToggleSwitch => {
                    setState({isOnLargeToggleSwitch});
                    onToggle(isOnLargeToggleSwitch);
                }}
            />
            <Text style={styles.instructions}>Change On Color</Text>
            <ToggleSwitch
                label="Hello"
                onColor="#2196F3"
                isOn={state.isOnBlueToggleSwitch}
                onToggle={isOnBlueToggleSwitch => {
                    setState({isOnBlueToggleSwitch});
                    onToggle(isOnBlueToggleSwitch);
                }}
            />
            <Text style={styles.instructions}>Disabled Small Toggle</Text>
            <ToggleSwitch size="small" disabled isOn={true}/>
            <Button
                title="Clear all"
                onPress={() => {
                    setState({
                        isOnDefaultToggleSwitch: false,
                        isOnLargeToggleSwitch: false,
                        isOnBlueToggleSwitch: false
                    });
                }}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5
    }
});

export default TestZone;
