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

apiClient.addAsyncResponseTransform(async response => {

    if (response.ok) {
        return response.data;
    }

    if (response.problem) {
        const originalConfig = response.config;

        if (originalConfig.url !== settings.discovery.authEndpoint){
            //Access Token was expired
            if (response.status === 401 && !originalConfig._retry) {
                console.log('we got 401\'ed', originalConfig.url);
                originalConfig._retry = true;

                try {
                    const token = await Storage.getAuthToken();
                    if (token) {
                        const rs = await apiClient.post(settings.discovery.tokenEndpoint, {
                            refreshToken: token.refreshToken,
                        });

                        const { accessToken } = rs.data;
                        // authStorage.storeAuthToken(accessToken);
                        console.log('refresh token called', rs.data)
                        return create(originalConfig);
                    }
                    return Promise.reject('user is logged out');
                } catch (_error) {
                    return Promise.reject(_error);
                }
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

const refreshAccessToken = () => {
    console.log('refreshing access token');
    refreshApi.request(authToken.refreshToken)
        .then(token => {
            console.log('new token', token);
            Storage.storeAuthToken(token);
            setAuthToken(token);
        })
        .catch(e => {
            console.error('error refreshing token', e);
        });
}

export default apiClient;
