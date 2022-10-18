import {create} from 'apisauce';

import cache from '../utility/cache';
import authStorage from '../auth/storage';
import settings from '../config/settings';
import cacheSettings from '../config/cache';

const apiClient = create({
    baseURL: settings.apiUrl
});


apiClient.addAsyncRequestTransform(async request => {
    const authToken = await authStorage.getAuthToken();
    console.log('Xxxx', authToken.accessToken);
    if (!authToken) {
        return;
    }

    if (settings.xDebugHeader === true) {
        request.params['XDEBUG_SESSION'] = 'PHPSTORM';
    }

    request.headers['Authorization']  = 'Bearer ' + authToken.accessToken;
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
