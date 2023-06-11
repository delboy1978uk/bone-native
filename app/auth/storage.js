import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from 'jwt-decode';

const userKey = 'user';
const tokenKey = 'authToken';

const getUser = async () => {
    return await fetch(userKey);
};

const storeUser = user => {
    store(userKey, user, 'error storing the user');
};

const storeAuthToken = async token => {
    await storeSecure(tokenKey, token, 'error storing the auth token');
};

const getAuthToken = async () => {
    return await fetchSecure(tokenKey);
};

const removeAuthToken = () => {
    removeSecure(tokenKey);
}

const removeUser = () => {
    remove(userKey);
}

const removeSecure = async key => {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.error('error removing ' + key + ' from storage', error);
    }
}

const storeSecure = async (key, value, errorMessage = 'error storing value') => {
    try {
        await SecureStore.setItemAsync(key, JSON.stringify(value));
    } catch (error) {
        console.error(errorMessage, error);
    }
}

const fetchSecure = async key => {
    try {
        return JSON.parse(await SecureStore.getItemAsync(key));
    } catch (error) {
        console.error('error fetcghing storage key ' + key, error);
    }
}

const store = async (key, value, errorMessage = 'error storing value') => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(errorMessage, error);
    }
}

const fetch = async key => {
    try {
        return JSON.parse(await AsyncStorage.getItem(key));
    } catch (error) {
        console.error('error fetcghing storage key ' + key, error);
    }
}

const remove = async key => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error('error removing ' + key + ' from storage', error);
    }
}

export default { getAuthToken, getUser, removeAuthToken, removeUser, storeAuthToken, storeUser };
