import { create } from 'apisauce';

import cache from '../utility/cache'
import apiSettings from '../config/api'
import authStorage from '../auth/storage'

const apiClient = create(apiSettings);

apiClient.addAsyncRequestTransform(async request => {
    const authToken = await authStorage.getToken();

    if (!authToken) {
        return;
    }

    request.headers['x-auth-token'] = authToken;
});

const get = apiClient.get;

apiClient.get = async (url, params, axiosConfig) => {
    const response = await get(url, params, axiosConfig);

    if (response.ok) {
        // you can add a black/white list if you dont want everything cached
        cache.store(url, response.data);

        return response;
    }

    const data = await cache.get(url);

    return data ? {ok: true, data: data} : response;
}

export default apiClient;
