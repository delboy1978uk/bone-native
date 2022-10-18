import {makeRedirectUri, useAuthRequest} from "expo-auth-session";

import client from './client';
import settings from "../config/settings";

const register = (name, email, password) => client.post('/users', {name, email, password});
const refreshAccessToken = token => {

    const formData = new FormData();
    formData.append('client_id', settings.clientId);
    formData.append('grant_type', 'refresh_token');
    formData.append('refresh_token', token);
    formData.append('scope', 'basic');

    return client.axiosInstance.post(settings.apiUrl + settings.discovery.tokenEndpoint, formData, {
        headers: {'Content-Type': 'multipart/form-data'}
    });
}

export default {
    refreshAccessToken,
    register,
};
