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
    console.log('logging response');
    console.log(response);

    if (response.ok) {
        return response.data;
    }

    if (response.problem) {
        console.log('api call failed', err);
        const originalConfig = err.config;

        if (originalConfig.url !== "/auth/signin" && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const rs = await instance.post("/auth/refreshtoken", {
                        refreshToken: TokenService.getLocalRefreshToken(),
                    });

                    const { accessToken } = rs.data;
                    TokenService.updateLocalAccessToken(accessToken);

                    return instance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
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
