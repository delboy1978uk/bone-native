import {create} from 'apisauce';

import cache from '../utility/cache';
import settings from '../config/settings';
import cacheSettings from '../config/cache';
import authStorage from "../auth/storage";

const apiClient = create({
    baseURL: settings.apiUrl
});

const get = apiClient.get;

apiClient.get = async (url, params, axiosConfig) => {
    const response = await get(url, params, axiosConfig);

    if (response.ok) {
        if (cacheSettings.blacklist.includes(url) === false) {
            cache.store(url, response.data);
        }

        return response;
    }

    const data = await cache.get(url);

    return data ? {ok: true, data: data} : response;
}

apiClient.refreshToken = async (token, user) => {
    const formData = new FormData();
    formData.append('client_id', settings.clientId);
    formData.append('grant_type', 'refresh_token');
    formData.append('refresh_token', token);
    formData.append('scope', 'basic');

    const result = await apiClient.post(settings.discovery.tokenEndpoint, formData, {
        headers: {'Content-Type': 'multipart/form-data'}
    });

    const newToken = {
        accessToken: result.data.access_token,
        expiresIn: result.data.expires_in,
        refreshToken: result.data.refresh_token,
        tokenType: result.data.token_type,
    };

    const timeout = (newToken.expiresIn - 30) * 1000;
    authStorage.storeAuthToken(newToken);
    user.authToken = newToken;

    setTimeout(() => {
        apiClient.refreshToken(newToken.refreshToken, user);
    }, timeout);

    return newToken;
}

export default apiClient;
