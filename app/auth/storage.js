import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';

const key = 'authToken';
const clientKey = 'clientSettings';

const getUser = async () => {
    const token = await getToken();

    return token ? jwtDecode(token) : null;
};

const storeToken = async authToken => {
    try {
        await SecureStore.setItemAsync(key, authToken);
    } catch (error) {
        console.log('error storing the auth token', error);
    }
};

const getToken = async () => {
    try {
        return await SecureStore.getItemAsync(key);
    } catch (error) {
        console.log('error getting the auth token', error);
    }
};

const removeToken = async () => {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.log('error removing the auth token', error);
    }
}

const getClientCredentials = async () => {
    try {
        return await SecureStore.getItemAsync(clientKey);
    } catch (error) {
        console.log('error getting the client credentials', error);
    }
}

const storeClientCredentials = async authToken => {
    try {
        await SecureStore.setItemAsync(key, clientKey);
    } catch (error) {
        console.log('error storing the client credentials', error);
    }
};

export default { getClientCredentials, getToken, getUser, removeToken, storeClientCredentials, storeToken };
