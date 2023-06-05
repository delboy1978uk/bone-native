import {StyleSheet, View} from "react-native";
import {useState} from "react";
import * as SplashScreen from "expo-splash-screen";

import ImageInput from '../components/ImageInput';
import Button from '../components/Button';
import Text from '../components/Text';
import usersApi from '../api/users';
import useApi from '../hooks/useApi';

SplashScreen.hideAsync();

function TestZone(props) {
    const [imageUri, setImageUri] = useState(null);
    const imageApi = useApi(usersApi.uploadUserImage);

    const uploadImage = async () => {
        let formData = new FormData();
        let filename = imageUri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        formData.append('avatar', { uri: imageUri, name: filename, type });
        const response = await  imageApi.request(formData);
        console.log(response);
    }

    return (
        <View style={styles.container}>
            <Text>Ahoy!</Text>
            <ImageInput style={styles.picker} imageUri={imageUri} onChangeImage={uri =>{
                console.log(uri)
                setImageUri(uri)
            }}/>
            <Button onPress={async () => { uploadImage().catch(e => {console.log(e)}); }} title={'Upload'}/>
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
