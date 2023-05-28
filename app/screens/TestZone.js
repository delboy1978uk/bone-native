import {StyleSheet, View} from "react-native";
import * as SplashScreen from "expo-splash-screen";

import ImageInput from '../components/ImageInput';
import Text from '../components/Text';
import {useState} from "react";

SplashScreen.hideAsync();

function TestZone(props) {
    const [imageUri, setImageUri] = useState(null);
    return (
        <View style={styles.container}>
            <Text>Ahoy!</Text>
            <ImageInput style={styles.picker} imageUri={imageUri} onChangeImage={uri =>{
                console.log(uri)
                setImageUri(uri)
            }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    picker: {

    }
})

export default TestZone;
