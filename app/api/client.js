import {create} from 'apisauce';

import cache from '../utility/cache';
import authStorage from '../auth/storage';
import settings from '../config/settings';
import cacheSettings from '../config/cache';
import Storage from "../auth/storage";

const apiClient = create({
    baseURL: settings.apiUrl
});

apiClient.addAsyncRequestTransform(async request => {
    const authToken = await authStorage.getAuthToken();

    if (!authToken) {
        return;
    }

    if (settings.xDebugHeader === true) {
        if (!request.params) {
            request.params = [];
        }
        request.params['XDEBUG_SESSION'] = 'PHPSTORM';
    }

    request.headers['Authorization']  = 'Bearer ' + authToken.accessToken;
});


const refreshToken = async token => {
    const formData = new FormData();
    formData.append('client_id', settings.clientId);
    formData.append('grant_type', 'refresh_token');
    formData.append('refresh_token', token);
    formData.append('scope', 'basic');

    return await apiClient.post(settings.discovery.tokenEndpoint, formData, {
        headers: {'Content-Type': 'multipart/form-data'}
    }).catch(error => Promise.reject(error));
}

apiClient.addAsyncResponseTransform(async response => {

    if (response.ok) {
        return response.data;
    }

    if (response.problem) {
        const originalConfig = response.config;

        //Access Token was expired
        if (originalConfig.url !== settings.discovery.authEndpoint && response.status === 401 && !originalConfig.retry) {
            originalConfig.retry = true;
            try {
                const token = await Storage.getAuthToken();
                if (token) {
                    const rs = await refreshToken(token.refreshToken);
                    const newToken = {
                        accessToken: rs.data.access_token,
                        expiresIn: rs.data.expires_in,
                        refreshToken: rs.data.refresh_token,
                        tokenType: rs.data.token_type,
                    };
                    authStorage.storeAuthToken(newToken);

                    return apiClient.any(originalConfig);
                }
                return Promise.reject('Log out user, no valid token issued');
            } catch (_error) {
                return Promise.reject(_error);
            }
        }


        return Promise.reject(response.problem);
    }
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

export default apiClient;
