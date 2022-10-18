import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';

const refreshKey = 'authToken';

const getUser = async () => {
    // const token = await getToken();
    //
    // return token ? jwtDecode(token) : null;
    alert('fetch user from storage');
};

const storeAuthToken = async token => {
    try {
        await SecureStore.setItemAsync(refreshKey, token);
    } catch (error) {
        console.error('error storing the refresh token', error);
    }
};

const getAuthToken = async () => {
    try {
        return JSON.parse(await SecureStore.getItemAsync(refreshKey));
    } catch (error) {
        console.error('error getting the refresh token', error);
    }
};

const removeAuthToken = async () => {
    try {
        await SecureStore.deleteItemAsync(refreshKey);
    } catch (error) {
        console.error('error removing the refresh token', error);
    }
}

export default { getAuthToken, getUser, removeAuthToken,  storeAuthToken };
