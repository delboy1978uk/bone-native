import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';

const userKey = 'user';
const tokenKey = 'authToken';

const getUser = async () => {
    return await fetch(userKey);
};

const storeUser = user => {
    store(userKey, user, 'error storing the user');
};

const storeAuthToken = token => {
    store(tokenKey, token, 'error storing the auth token');
};

const getAuthToken = async () => {
    return await fetch(tokenKey);
};

const removeAuthToken = () => {
    remove(tokenKey);
}

const remove = async key => {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.error('error removing ' + key + ' from storage', error);
    }
}

const store = (key, value, errorMessage = 'error storing value') => {
    try {
        SecureStore.setItemAsync(key, JSON.stringify(value));
    } catch (error) {
        console.error(errorMessage, error);
    }
}

const fetch = async key => {
    try {
        return JSON.parse(await SecureStore.getItemAsync(key));
    } catch (error) {
        console.error('error fetcghing storage key ' + key, error);
    }
}

export default { getAuthToken, getUser, removeAuthToken,  storeAuthToken, storeUser };
